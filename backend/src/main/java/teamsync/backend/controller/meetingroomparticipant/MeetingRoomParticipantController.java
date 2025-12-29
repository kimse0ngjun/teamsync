package teamsync.backend.controller.meetingroomparticipant;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import teamsync.backend.dto.meetingroom.MeetingRoomUpdateRequest;
import teamsync.backend.dto.meetingroomparticipant.MeetingRoomParticipantInviteRequest;
import teamsync.backend.entity.User;
import teamsync.backend.service.meetingroom.MeetingRoomParticipantService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/meeting-rooms-participant")
@Tag(name = "MeetingRoomParticipant", description = "회의방 참여, 회의방 나가기 API")
public class MeetingRoomParticipantController {

    public final MeetingRoomParticipantService meetingRoomParticipantService;

    // 회의방 참여
    @Operation(summary = "회의방 참여", description = "유저가 회의방에 참여합니다.", security = {@SecurityRequirement(name = "securityBearer")})
    @PostMapping("/{roomId}/join")
    public void join(
            @PathVariable Long roomId,
            @AuthenticationPrincipal User user
    ) {
        meetingRoomParticipantService.joinRoom(roomId, user.getId());
    }

    // 회의방 나가기
    @Operation(summary = "회의방 나가기", description = "유저가 회의방에서 나갑니다.", security = {@SecurityRequirement(name = "securityBearer")})
    @DeleteMapping("/{roomId}")
    public void leave(@PathVariable Long roomId, @AuthenticationPrincipal User user) {
        meetingRoomParticipantService.leaveRoom(roomId, user.getId());
    }

    // 팀 초대
    @Operation(summary = "팀 초대", description = "방장이 팀 단위로 초대합니다.", security = {@SecurityRequirement(name = "securityBearer")})
    @PostMapping("/{roomId}/{teamId}/inviteteam")
    public void inviteTeam(@PathVariable Long roomId,
                           @PathVariable String teamId) {
        meetingRoomParticipantService.inviteTeam(roomId, teamId);
    }

    // 유저 초대
    @Operation(summary = "유저 초대", description = "방장이 유저 초대합니다.", security = {@SecurityRequirement(name = "securityBearer")})
    @PostMapping("/{roomId}/inviteuser")
    public void inviteUsers(@PathVariable Long roomId, @RequestBody MeetingRoomParticipantInviteRequest req) {
        meetingRoomParticipantService.inviteUsers(roomId, req);
    }
}
