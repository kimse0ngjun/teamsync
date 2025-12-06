package teamsync.backend.dto.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PasswordResetRequest {
    private String email;
    private String newPassword;
    private String confirmPassword;
}
