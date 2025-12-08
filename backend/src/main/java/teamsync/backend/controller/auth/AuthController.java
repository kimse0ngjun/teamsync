package teamsync.backend.controller.auth;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import teamsync.backend.dto.user.*;
import teamsync.backend.service.auth.AuthService;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Auth", description = "회원가입, 로그인, 이메일 인증 API")
public class AuthController {

    private final AuthService authService;

    // 회원가입
    @Operation(summary = "회원가입", description = "이메일 인증 완료된 사용자만 회원가입 가능")
    @PostMapping("/signup")
    public ResponseEntity<SignupResponse> signup(@Valid @RequestBody SignupRequest req) {
        SignupResponse response = authService.signup(req);
        return ResponseEntity.ok(response);
    }

    // 로그인
    @Operation(summary = "로그인", description = "이메일과 비밀번호로 로그인시 토큰 발급")
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest req) {
        return authService.login(req);
    }

    // 로그아웃
    @Operation(summary = "로그아웃", description = "AccessToken 제거")
    @PostMapping("/logout")
    public String logout(HttpServletRequest req) { authService.logout(req);
        return "로그아웃 되었습니다.";
    }

    // 토큰 재발급
    @Operation(summary = "토큰 재발급", description = "RefreshToken을 제공합니다.")
    @PostMapping("/refresh")
    public TokenRefreshResponse refresh(@RequestBody TokenRefreshRequest req) {
        return authService.refresh(req.getRefreshToken());
    }

    // 이메일 인증
    @Operation(summary = "이메일 인증", description = "입력한 이메일로 인증코드를 보냅니다.")
    @PostMapping("/send-code")
    public void sendEmail(@RequestBody EmailRequest req) {
        authService.sendSignupVerificationCode(req.getEmail());
    }

    // 이메일 인증 코드 확인
    @Operation(summary = "이메일 인증 코드 확인", description = "사용자 이메일로 보낸 인증 번호을 입력합니다.")
    @PostMapping("/verify-code")
    public void verifyEmail(@RequestBody EmailVerifyRequest req) {
        authService.verifyEmailVerificationCode(req.getEmail(), req.getCode());
    }

    // 비밀번호 재설정
    @Operation(summary = "비밀번호 재설정", description = "사용자 비밀번호를 재설정합니다.")
    @PostMapping("/password/send")
    public String sendPasswordResetCode(@RequestBody EmailRequest req) {
        authService.sendResetPasswordCode(req.getEmail());
        return "비밀번호 재설정 코드가 전송되었습니다.";
    }

    @Operation(summary = "비밀번호 재확인", description = "비밀번호 한번 더 확인합니다.")
    @PostMapping("/password/verify")
    public boolean verifyPasswordResetcode(@RequestBody PasswordResetVerifyRequest req) {
        return authService.verifyResetCode(req.getEmail(), req.getCode());
    }

    @Operation(summary = "비밀번호 초기화", description = "사용자 비밀번호를 초기화 시킵니다.")
    @PostMapping("/password/reset")
    public String resetPassword(@RequestBody PasswordResetRequest req) {
        authService.resetPassword(req.getEmail(), req.getNewPassword());
        return "비밀번호가 성공적으로 변경되었습니다.";
    }
}
