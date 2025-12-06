package teamsync.backend.controller.auth;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import teamsync.backend.dto.user.*;
import teamsync.backend.service.auth.AuthService;
import teamsync.backend.service.auth.EmailService;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final EmailService emailService;


    // 회원가입
    @PostMapping("/signup")
    public SignupResponse signup(@RequestBody SignupRequest req) {
        return authService.signup(req);
    }

    // 로그인
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest req) {
        return authService.login(req);
    }

    // 로그아웃
    @PostMapping("/logout")
    public String logout(HttpServletRequest req) { authService.logout(req);
        return "로그아웃 되었습니다.";
    }

    // 토큰 재발급
    @PostMapping("/refresh")
    public TokenRefreshResponse refresh(@RequestBody TokenRefreshRequest req) {
        return authService.refresh(req.getRefreshToken());
    }

//    // 이메일 인증
//    @PostMapping("/email/send")
//    public void sendEmail(@RequestBody EmailRequest req) {
//        authService.(req.getEmail());
//    }

    // 비밀번호 재설정
    @PostMapping("/password/send")
    public String sendPasswordResetCode(@RequestBody EmailRequest req) {
        authService.sendResetPasswordCode(req.getEmail());
        return "비밀번호 재설정 코드가 전송되었습니다.";}

    @PostMapping("/password/verify")
    public boolean verifyPasswordResetcode(@RequestBody PasswordResetVerifyRequest req) {
        return authService.verifyResetCode(req.getEmail(), req.getCode());
    }

    @PostMapping("/password/reset")
    public String resetPassword(@RequestBody PasswordResetRequest req) {
        authService.resetPassword(req.getEmail(), req.getNewPassword());
        return "비밀번호가 성공적으로 변경되었습니다.";
    }
}
