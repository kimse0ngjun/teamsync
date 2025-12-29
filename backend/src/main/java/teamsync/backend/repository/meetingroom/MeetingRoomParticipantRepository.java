package teamsync.backend.repository.meetingroom;

import org.springframework.data.jpa.repository.JpaRepository;
import teamsync.backend.entity.MeetingRoom;
import teamsync.backend.entity.MeetingRoomParticipant;

import java.util.List;
import java.util.Optional;

public interface MeetingRoomParticipantRepository extends JpaRepository<MeetingRoomParticipant, Long> {
    Optional<MeetingRoomParticipant> findByMeetingRoomIdAndUserId(Long roomid, String userid);

    boolean existsByMeetingRoomIdAndUserId(Long roomid, String userid);

    void deleteByMeetingRoomIdAndUserId(Long roomid, String userid);

    void deleteByMeetingRoomId(Long roomId);
}
