package teamsync.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "meeting_summaries")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class MeetingSummary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", nullable = false)
    private MeetingRoom meetingRoom;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "generated_by", nullable = false)
    private User generatedBy;

    private String title;

    private LocalDateTime date;

    @Column(name = "time_range", nullable = false)
    private String timerange;

    private String overview; // 회의 개요

    @Column(columnDefinition = "jsonb")
    private String participants; // 참석자 정보

    @Column(columnDefinition = "jsonb")
    private String highlights; // 주요 내용

    @Column(columnDefinition = "jsonb")
    private String decisions; // 결정 사항

    @Column(columnDefinition = "jsonb")
    private String tasts; // 할 일

    @Column(columnDefinition = "jsonb")
    private String next_meeting; // 다음 회의

    private LocalDateTime createdAt;
}



