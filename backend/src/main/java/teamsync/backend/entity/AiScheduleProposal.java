package teamsync.backend.entity;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import teamsync.backend.entity.enums.AIMessageStatus;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "ai_schedule_proposals") // AI 일정 제안
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AiScheduleProposal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id",  nullable = false)
    private MeetingRoom meetingRoom;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chatmessage")
    private ChatMessage chatMessage;

    private String title;

    private LocalDateTime date;

    private LocalTime time;

    private String location;

    @Column (name = "tasks", columnDefinition = "jsonb")
    private String task; // 할 일 목록 배열

    @Enumerated(EnumType.STRING)
    @ColumnDefault("PENDING")
    private AIMessageStatus status;
}
