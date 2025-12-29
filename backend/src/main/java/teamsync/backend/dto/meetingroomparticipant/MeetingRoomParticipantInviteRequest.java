package teamsync.backend.dto.meetingroomparticipant;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MeetingRoomParticipantInviteRequest {

    private List<String> userIds;
}
