package teamsync.backend.service.meetingroom;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import teamsync.backend.dto.meetingroomparticipant.MeetingRoomParticipantInviteRequest;
import teamsync.backend.entity.*;
import teamsync.backend.repository.meetingroom.MeetingRoomParticipantRepository;
import teamsync.backend.repository.meetingroom.MeetingRoomRepository;
import teamsync.backend.repository.organization.OrganizationMemberRepository;
import teamsync.backend.repository.team.TeamRepository;
import teamsync.backend.repository.user.UserRepository;
import teamsync.backend.service.team.TeamService;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MeetingRoomParticipantService {

    private final MeetingRoomRepository meetingRoomRepository;
    private final MeetingRoomParticipantRepository meetingParticipantRepository;
    private final TeamRepository teamRepository;
    private final UserRepository userRepository;
    private final TeamService teamService;
    private final OrganizationMemberRepository organizationMemberRepository;

    // 회의방 참여
    @Transactional
    public void joinRoom(Long roomId, String userId) {
        if (meetingParticipantRepository.existsByMeetingRoomIdAndUserId(roomId, userId)){
            return;
        }

        MeetingRoom room = meetingRoomRepository.findByIdAndIsActiveTrue(roomId)
                .orElseThrow(() -> new RuntimeException("회의방이 없습니다."));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("유저가 존재하지 않습니다."));

        MeetingRoomParticipant participant = MeetingRoomParticipant.builder()
                .meetingRoom(room)
                .user(user)
                .updatedAt(LocalDateTime.now())
                .build();

        meetingParticipantRepository.save(participant);
    }


    // 유저 초대
    @Transactional
    public void inviteUsers(Long roomId, MeetingRoomParticipantInviteRequest req) {
        if (req.getUserIds() == null || req.getUserIds().isEmpty()) return;

        MeetingRoom room = meetingRoomRepository.findByIdAndIsActiveTrue(roomId)
                .orElseThrow(() -> new RuntimeException("회의방이 없습니다."));

        List<User> usersToInvite = userRepository.findAllById(req.getUserIds());

        if (usersToInvite.isEmpty()){
            throw new RuntimeException("초대할 유효한 유저가 존재하지 않습니다.");
        }

        List<MeetingRoomParticipant> newParticipants = new ArrayList<>();
        LocalDateTime now = LocalDateTime.now();

        for (User user : usersToInvite) {
            if (!meetingParticipantRepository.existsByMeetingRoomIdAndUserId(roomId, user.getId())) {
                MeetingRoomParticipant participant = MeetingRoomParticipant.builder()
                        .meetingRoom(room)
                        .user(user)
                        .updatedAt(now)
                        .build();
                newParticipants.add(participant);
            }
        }

        if (!newParticipants.isEmpty()){
            meetingParticipantRepository.saveAll(newParticipants);
        }
    }

    // 팀 초대
    @Transactional
    public void inviteTeam(Long roomId, String teamId){
        MeetingRoom room = meetingRoomRepository.findByIdAndIsActiveTrue(roomId)
                .orElseThrow(() -> new RuntimeException("회의방이 없습니다."));

        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("팀 ID " + teamId + " 를 찾을 수가 없습니다."));

        List<OrganizationMember> organizationMembers = organizationMemberRepository.findByTeam(teamId)  ;

        if (organizationMembers.isEmpty()){
            throw new RuntimeException("팀에 속한 멤버가 없습니다.");
        }

        List<String> memberIds = organizationMembers.stream()
                .map(OrganizationMember::getUser)
                .map(User::getId)
                .collect(Collectors.toList());

        inviteUsers(roomId, (MeetingRoomParticipantInviteRequest) memberIds);
    }

    // 회의방 나가기
    @Transactional
    public void leaveRoom(Long roomId, String userId) {
        meetingParticipantRepository.deleteByMeetingRoomIdAndUserId(roomId, userId);
    }
}
