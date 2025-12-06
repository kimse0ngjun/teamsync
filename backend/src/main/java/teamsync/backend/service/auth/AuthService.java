package teamsync.backend.service.auth;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import teamsync.backend.config.JwtTokenProvider;
import teamsync.backend.dto.user.*;
import teamsync.backend.entity.User;
import teamsync.backend.repository.user.UserRepository;

import java.time.LocalDateTime;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final RedisTemplate<String, Object> redisTemplate;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final EmailService emailService;

    // 회원가입
    public SignupResponse signup(SignupRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new RuntimeException("이미 존재하는 이메일입니다.");
        }

        User user = User.builder()
                .email(req.getEmail())
                .password(passwordEncoder.encode(req.getPassword()))
                .name(req.getName())
                .createAt(LocalDateTime.now())
                .build();

        User savedUser = userRepository.save(user);

        return new SignupResponse(
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail()
        );
    }

    // 로그인
    public LoginResponse login(LoginRequest req) {
        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 이메일입니다."));

        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }

        String accessToken = jwtTokenProvider.createAccessToken(user.getId(), user.getEmail(), user.getRole());
        String refreshToken = jwtTokenProvider.createRefreshToken(user.getId());
        long expiration = jwtTokenProvider.getRefreshTokenExpiration();

        // Redis에 Refresh Token 저장
        redisTemplate.opsForValue().set(
                "refresh:" + user.getId(),
                refreshToken,
                expiration,
                TimeUnit.MILLISECONDS
        );

        return new LoginResponse(
                accessToken,
                refreshToken,
                user.getEmail(),
                user.getName()
        );
    }

    // 로그아웃
    public void logout(HttpServletRequest req) {
        String token = resolveToken(req);

        if (token != null && jwtTokenProvider.validateToken(token)) {

            String userId = jwtTokenProvider.getUserId(token);

            // RefreshToken 제거
            redisTemplate.delete("refresh:" + userId);

            // AccessToken 블랙리스트 등록
            long expiration = jwtTokenProvider.parseClaims(token)
                    .getExpiration().getTime() - System.currentTimeMillis();

            redisTemplate.opsForValue()
                    .set("blacklist:" + token, "true", expiration, TimeUnit.MILLISECONDS);
        }
    }

    private String resolveToken(HttpServletRequest req) {
        String bearer = req.getHeader("Authorization");
        if (bearer != null && bearer.startsWith("Bearer ")) {
            return bearer.substring(7);
        }
        return null;
    }

    // 토큰 재발급
    public TokenRefreshResponse refresh(String refreshToken) {
        if (!jwtTokenProvider.validateToken(refreshToken)) {
            throw new RuntimeException("유효하지 않은 RefreshToken입니다.");
        }

        String userId = jwtTokenProvider.getUserId(refreshToken);

        String savedToken = (String) redisTemplate.opsForValue().get("refresh:" + userId);

        if (savedToken == null || !savedToken.equals(refreshToken)) {
            throw new RuntimeException("RefreshToken이 만료되었습니다.");
        }


        // 새로운 AccessToken 발급
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("해당 이메일의 사용자를 찾을 수 없습니다."));

        String newAccessToken = jwtTokenProvider.createAccessToken(
                user.getId(), user.getEmail(), user.getRole());
        return new TokenRefreshResponse(newAccessToken);
    }

    // 비밀번호 재설정 요청
    public void sendResetPasswordCode(String email) {
        String code = String.valueOf((int)(Math.random() * 900000) + 100000);

        redisTemplate.opsForValue().set(
                "password:reset:" + email,
                code,
                5,
                TimeUnit.MINUTES
        );

        System.out.println("비밀번호 재설정 코드: " + code);
    }

    // 코드 검증
    public boolean verifyResetCode(String email, String code) {
        String stored = (String) redisTemplate.opsForValue().get("password:reset:" + email);

        return stored != null && stored.equals(code);
    }

    // 비밀번호 변경
    public void resetPassword(String email, String password) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수가 없습니다."));

                user.setPassword(passwordEncoder.encode(password));
                userRepository.save(user);

                // 코드 삭제
                redisTemplate.delete("password:reset:" + email);
    }
}