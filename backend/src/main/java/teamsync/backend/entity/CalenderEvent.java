package teamsync.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import teamsync.backend.entity.enums.EventColor;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "calender_events")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class CalenderEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", nullable = false)
    private MeetingRoom meetingRoom;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_participant_id")
    private MeetingRoomParticipant participant;

    private String title;

    private String description;

    private LocalDateTime date;

    @Column(name = "start_time")
    private Timestamp startTime;

    @Column(name = "end_time")
    private Timestamp endTime;

    private String location;

    @Enumerated(EnumType.STRING)
    private EventColor color;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
