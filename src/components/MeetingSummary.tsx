import { useState } from "react";

import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  Sparkles,
  FileText,
  Download,
  Share2,
  Search,
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  ChevronRight,
  MoreHorizontal,
  Filter,
} from "lucide-react";
import "./MeetingSummary.css";

interface MeetingSummaryProps {
  onBack: () => void;
}

export default function MeetingSummary({ onBack }: MeetingSummaryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSummary, setSelectedSummary] = useState(1);

  const summaries = [
    {
      id: 1,
      title: "디자인 리뷰 회의",
      date: "2024년 11월 28일",
      time: "오전 10:00 - 11:00",
      team: "디자인팀",
      attendees: 4,
      color: "blue",
    },
    {
      id: 2,
      title: "주간 스프린트 회의",
      date: "2024년 11월 27일",
      time: "오후 2:00 - 3:00",
      team: "개발팀",
      attendees: 6,
      color: "indigo",
    },
    {
      id: 3,
      title: "마케팅 전략 회의",
      date: "2024년 11월 26일",
      time: "오후 3:00 - 4:30",
      team: "마케팅팀",
      attendees: 5,
      color: "pink",
    },
    {
      id: 4,
      title: "월간 전체 회의",
      date: "2024년 11월 25일",
      time: "오전 9:00 - 11:00",
      team: "전체",
      attendees: 24,
      color: "purple",
    },
  ];

  const selectedSummaryData = {
    id: 1,
    title: "디자인 리뷰 회의",
    date: "2024년 11월 28일",
    time: "오전 10:00 - 11:00",
    team: "디자인팀",
    duration: "1시간",
    location: "3층 회의실",
    attendees: [
      { name: "김민수", role: "Leader", avatar: "KM", attended: true },
      { name: "이지은", role: "Designer", avatar: "LJ", attended: true },
      { name: "박서준", role: "Developer", avatar: "PS", attended: true },
      { name: "최유진", role: "Designer", avatar: "CY", attended: false },
    ],
    overview:
      "이번 회의에서는 신규 랜딩 페이지 디자인 최종안에 대한 리뷰를 진행했습니다. 전반적인 디자인 방향성이 좋다는 평가를 받았으며, 몇 가지 개선 사항이 논의되었습니다.",
    keyPoints: [
      "신규 랜딩 페이지 디자인 최종안 검토 완료",
      "메인 컬러 스킴을 인디고 계열로 변경 결정",
      "모바일 반응형 디자인 추가 작업 필요",
      "A/B 테스트 계획 수립 및 일정 논의",
      "다음 주 월요일까지 수정안 제출 예정",
    ],
    decisions: [
      {
        decision: "랜딩 페이지 메인 컬러를 인디고로 변경",
        rationale:
          "사용자 설문조사 결과 인디고 계열이 브랜드 이미지와 가장 잘 맞음",
      },
      {
        decision: "모바일 우선 디자인 접근 방식 채택",
        rationale: "모바일 트래픽이 전체의 70%를 차지하고 있음",
      },
      {
        decision: "A/B 테스트 12월 첫째 주 시작",
        rationale: "충분한 데이터 수집을 위해 최소 2주간 진행",
      },
    ],
    tasks: [
      {
        id: 1,
        task: "모바일 디자인 수정 및 완료",
        assignee: "이지은",
        dueDate: "12월 2일",
        priority: "high",
        status: "in_progress",
      },
      {
        id: 2,
        task: "A/B 테스트 계획서 작성",
        assignee: "김민수",
        dueDate: "12월 1일",
        priority: "high",
        status: "todo",
      },
      {
        id: 3,
        task: "개발 일정 업데이트 및 공유",
        assignee: "박서준",
        dueDate: "11월 30일",
        priority: "medium",
        status: "in_progress",
      },
      {
        id: 4,
        task: "디자인 시스템 문서 업데이트",
        assignee: "이지은",
        dueDate: "12월 5일",
        priority: "low",
        status: "todo",
      },
    ],
    nextMeeting: {
      date: "12월 5일 목요일",
      time: "오후 2:00",
      agenda: "수정된 디자인 최종 검토 및 개발 진행 상황 점검",
    },
  };

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case "high":
        return "badge-high";
      case "medium":
        return "badge-medium";
      case "low":
        return "badge-low";
      default:
        return "badge-default";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "todo":
        return "대기";
      case "in_progress":
        return "진행 중";
      case "done":
        return "완료";
      default:
        return status;
    }
  };

  return (
    <div className="meeting-summary-container">
      <div className="meeting-summary-layout">
        {/* Left Sidebar - Summary List */}
        <aside className="summary-sidebar glass-sidebar">
          <div className="summary-sidebar-header">
            <button onClick={onBack} className="back-button">
              ← 대시보드로 돌아가기
            </button>
            <div className="summary-title-row">
              <h2 className="summary-title">회의 요약</h2>
              <button className="filter-button">
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="search-container">
            <Search className="search-icon" />
            <input
              placeholder="회의 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="summary-list-section">
            <p className="summary-list-label">전체 요약 ({summaries.length})</p>
            <div className="summary-list">
              {summaries.map((summary) => (
                <button
                  key={summary.id}
                  onClick={() => setSelectedSummary(summary.id)}
                  className={`summary-list-item ${
                    selectedSummary === summary.id ? "active" : ""
                  }`}
                >
                  <div className="summary-item-content">
                    <div
                      className={`summary-icon-wrapper bg-${summary.color}-100`}
                    >
                      <Sparkles
                        className={`w-5 h-5 text-${summary.color}-600`}
                      />
                    </div>
                    <div className="summary-info">
                      <h3 className="summary-item-title">{summary.title}</h3>
                      <div className="summary-date">
                        <Calendar className="w-3 h-3" />
                        <span>{summary.date}</span>
                      </div>
                      <div className="summary-meta">
                        <Badge
                          variant="outline"
                          className={`bg-${summary.color}-50 text-${summary.color}-700 border-${summary.color}-200 text-xs`}
                        >
                          {summary.team}
                        </Badge>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {summary.attendees}명
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content - Summary Detail */}
        <main className="summary-main-content">
          <div className="summary-content-wrapper">
            {/* Header */}
            <div className="glass-card summary-header-card">
              <div className="summary-header-top">
                <div className="summary-header-info">
                  <div className="summary-logo-large">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="summary-title-large">
                      {selectedSummaryData.title}
                    </h1>
                    <div className="summary-header-meta">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {selectedSummaryData.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {selectedSummaryData.time}
                      </span>
                      <span>•</span>
                      <span>{selectedSummaryData.duration}</span>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700 border-blue-200"
                    >
                      {selectedSummaryData.team}
                    </Badge>
                  </div>
                </div>
                <div className="summary-actions">
                  <button className="action-button">
                    <Share2 className="w-4 h-4" />
                    공유
                  </button>
                  <button className="export-button">
                    <Download className="w-4 h-4" />
                    내보내기
                  </button>
                </div>
              </div>
            </div>

            {/* Overview */}
            <div className="glass-card content-section">
              <div className="section-header">
                <FileText className="w-5 h-5 text-indigo-600" />
                <h2 className="section-title">회의 개요</h2>
              </div>
              <p className="overview-text">{selectedSummaryData.overview}</p>
            </div>

            {/* Attendees */}
            <div className="glass-card content-section">
              <div className="section-header">
                <Users className="w-5 h-5 text-blue-600" />
                <h2 className="section-title">참석자</h2>
              </div>
              <div className="attendees-grid">
                {selectedSummaryData.attendees.map((attendee, index) => (
                  <div key={index} className="attendee-card">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-blue-500 text-white">
                        {attendee.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="attendee-info">
                      <p className="attendee-name">{attendee.name}</p>
                      <p className="attendee-role">{attendee.role}</p>
                    </div>
                    {attendee.attended ? (
                      <CheckCircle2 className="w-5 h-5 status-check" />
                    ) : (
                      <div className="status-absent"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Key Points */}
            <div className="glass-card content-section">
              <div className="section-header">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <h2 className="section-title">주요 내용</h2>
              </div>
              <div className="key-points-list">
                {selectedSummaryData.keyPoints.map((point, index) => (
                  <div key={index} className="key-point-item">
                    <ChevronRight className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <p className="text-slate-900">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Decisions */}
            <div className="glass-card content-section">
              <div className="section-header">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <h2 className="section-title">결정 사항</h2>
              </div>
              <div className="decisions-list">
                {selectedSummaryData.decisions.map((item, index) => (
                  <div key={index} className="decision-item">
                    <div className="decision-header">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <h3 className="decision-title">{item.decision}</h3>
                    </div>
                    <p className="decision-rationale">{item.rationale}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tasks */}
            <div className="glass-card content-section">
              <div className="tasks-header">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                  <h2 className="section-title">할 일 목록</h2>
                </div>
                <Badge className="bg-indigo-100 text-indigo-700">
                  {selectedSummaryData.tasks.length}개
                </Badge>
              </div>
              <div className="tasks-list">
                {selectedSummaryData.tasks.map((task) => (
                  <div key={task.id} className="task-item">
                    <input
                      type="checkbox"
                      checked={task.status === "done"}
                      className="task-checkbox"
                      readOnly
                    />
                    <div className="task-content">
                      <h3 className="task-title">{task.task}</h3>
                      <div className="task-meta">
                        <span>담당자: {task.assignee}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {task.dueDate}
                        </span>
                      </div>
                    </div>
                    <div className="task-actions">
                      <Badge
                        variant="outline"
                        className={getPriorityBadgeClass(task.priority)}
                      >
                        {task.priority === "high"
                          ? "높음"
                          : task.priority === "medium"
                          ? "보통"
                          : "낮음"}
                      </Badge>
                      <Badge variant="outline" className="badge-default">
                        {getStatusLabel(task.status)}
                      </Badge>
                      <button className="filter-button">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Meeting */}
            <div className="glass-card content-section next-meeting-card">
              <div className="next-meeting-content">
                <div className="next-meeting-icon">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div className="next-meeting-info">
                  <h3 className="next-meeting-title">다음 회의 일정</h3>
                  <div className="next-meeting-time">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {selectedSummaryData.nextMeeting.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {selectedSummaryData.nextMeeting.time}
                    </span>
                  </div>
                  <p className="next-meeting-agenda">
                    안건: {selectedSummaryData.nextMeeting.agenda}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
