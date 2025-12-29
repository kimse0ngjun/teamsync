package teamsync.backend.dto.organizationmember;

import lombok.Builder;
import lombok.Getter;
import teamsync.backend.dto.team.TeamMemberAddRequest;
import teamsync.backend.entity.User;

@Getter
@Builder
public class OrganizationMemberResponse {
    private String userId;
    private String name;
    private String email;

    public static OrganizationMemberResponse from(User user) {
        return OrganizationMemberResponse.builder()
                .userId(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .build();
    }
}
