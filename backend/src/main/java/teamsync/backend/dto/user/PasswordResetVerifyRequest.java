package teamsync.backend.dto.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PasswordResetVerifyRequest {

    private String email;
    private String code;
}
