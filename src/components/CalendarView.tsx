import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  Calendar,
  Clock,
  MapPin,
  Users,
  MoreHorizontal,
} from "lucide-react";
import "./CalendarView.css";

interface CalendarViewProps {
  onBack: () => void;
}

export default function CalendarView({ onBack }: CalendarViewProps) {
  const [viewMode, setViewMode] = useState<"month" | "week">("month");
  const [currentDate, setCurrentDate] = useState(new Date(2024, 10, 28));

  const events = [
    {
      id: 1,
      title: "주간 스프린트 회의",
      date: 28,
      time: "14:00",
      duration: "1h",
      team: "개발팀",
      color: "indigo",
      attendees: 5,
      location: "2층 회의실",
    },
    {
      id: 2,
      title: "디자인 리뷰",
      date: 28,
      time: "16:00",
      duration: "45m",
      team: "디자인팀",
      color: "blue",
      attendees: 4,
      location: "3층 회의실",
    },
    {
      id: 3,
      title: "프로젝트 킥오프",
      date: 29,
      time: "10:00",
      duration: "2h",
      team: "전체",
      color: "purple",
      attendees: 12,
      location: "대회의실",
    },
    {
      id: 4,
      title: "마케팅 전략 회의",
      date: 29,
      time: "15:00",
      duration: "1.5h",
      team: "마케팅팀",
      color: "pink",
      attendees: 6,
      location: "4층 회의실",
    },
    {
      id: 5,
      title: "1:1 미팅",
      date: 30,
      time: "11:00",
      duration: "30m",
      team: "개인",
      color: "green",
      attendees: 2,
      location: "소회의실",
    },
    {
      id: 6,
      title: "월간 리뷰",
      date: 1,
      time: "16:00",
      duration: "2h",
      team: "전체",
      color: "orange",
      attendees: 24,
      location: "대회의실",
    },
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const getWeekDays = (date: Date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(date.setDate(diff));
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(monday);
      currentDay.setDate(monday.getDate() + i);
      weekDays.push(currentDay);
    }
    return weekDays;
  };

  const monthNames = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

  const days = getDaysInMonth(currentDate);
  const weekDaysList = getWeekDays(new Date(currentDate));

  const getEventsForDay = (day: number | Date) => {
    const dayNumber = typeof day === "number" ? day : day.getDate();
    return events.filter((event) => event.date === dayNumber);
  };

  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const previousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const nextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const isToday = (day: number | Date) => {
    const today = new Date();
    const dayNumber = typeof day === "number" ? day : day.getDate();
    return (
      dayNumber === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="calendar-view-container">
      <div className="calendar-content">
        {/* Header */}
        <div className="calendar-header">
          <div>
            <button onClick={onBack} className="back-button">
              ← 대시보드로 돌아가기
            </button>
            <h1 className="page-title">캘린더</h1>
          </div>
          <div className="header-actions">
            <Button variant="outline" className="filter-button">
              <Filter className="w-4 h-4" />
              필터
            </Button>
            <Button className="new-event-button">
              <Plus className="w-4 h-4" />새 일정 만들기
            </Button>
          </div>
        </div>

        {/* Calendar Controls */}
        <div className="calendar-card">
          <div className="controls-header">
            <div className="date-navigation">
              <div className="nav-buttons">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={viewMode === "month" ? previousMonth : previousWeek}
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <h2 className="current-date-display">
                  {currentDate.getFullYear()}년{" "}
                  {monthNames[currentDate.getMonth()]}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={viewMode === "month" ? nextMonth : nextWeek}
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentDate(new Date())}
              >
                오늘
              </Button>
            </div>

            <div className="view-mode-toggle">
              <Button
                variant={viewMode === "month" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("month")}
                className={viewMode === "month" ? "view-mode-btn-active" : ""}
              >
                월간
              </Button>
              <Button
                variant={viewMode === "week" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("week")}
                className={viewMode === "week" ? "view-mode-btn-active" : ""}
              >
                주간
              </Button>
            </div>
          </div>

          {/* Month View */}
          {viewMode === "month" && (
            <div>
              <div className="weekdays-grid">
                {weekDays.map((day, index) => (
                  <div key={index} className="weekday-label">
                    {day}
                  </div>
                ))}
              </div>

              <div className="days-grid">
                {days.map((day, index) => (
                  <div
                    key={index}
                    className={`day-cell ${
                      day === null ? "empty" : isToday(day) ? "today" : "normal"
                    }`}
                  >
                    {day !== null && (
                      <>
                        <div className="day-header">
                          <span
                            className={`day-number ${
                              isToday(day) ? "today" : "normal"
                            }`}
                          >
                            {day}
                          </span>
                        </div>
                        <div className="events-stack">
                          {getEventsForDay(day)
                            .slice(0, 2)
                            .map((event) => (
                              <div
                                key={event.id}
                                className={`event-item bg-${event.color}-50 border-${event.color}-200 group`}
                              >
                                <div className="event-title-row">
                                  <p
                                    className={`event-title text-${event.color}-900`}
                                  >
                                    {event.title}
                                  </p>
                                </div>
                                <p
                                  className={`event-time text-${event.color}-700`}
                                >
                                  {event.time}
                                </p>
                              </div>
                            ))}
                          {getEventsForDay(day).length > 2 && (
                            <button className="more-events-btn">
                              +{getEventsForDay(day).length - 2}개 더보기
                            </button>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Week View */}
          {viewMode === "week" && (
            <div>
              <div className="week-header-grid">
                <div className="time-column-header"></div>
                {weekDaysList.map((day, index) => (
                  <div
                    key={index}
                    className={`week-day-header ${
                      isToday(day) ? "today" : "normal"
                    }`}
                  >
                    <div className="week-day-name">
                      {weekDays[day.getDay()]}
                    </div>
                    <div
                      className={`week-day-date ${
                        isToday(day) ? "text-white" : "normal"
                      }`}
                    >
                      {day.getDate()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="week-grid">
                <div className="time-labels">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="time-label">
                      {i + 8}:00
                    </div>
                  ))}
                </div>

                {weekDaysList.map((day, dayIndex) => (
                  <div key={dayIndex} className="day-column">
                    <div className="day-events-container">
                      {getEventsForDay(day).map((event, eventIndex) => {
                        const hour = parseInt(event.time.split(":")[0]);
                        const topPosition = (hour - 8) * 4;
                        return (
                          <div
                            key={event.id}
                            className={`week-event-card bg-${event.color}-50 border-${event.color}-500`}
                            style={{
                              top: `${topPosition}rem`,
                            }}
                          >
                            <h4
                              className={`week-event-title text-${event.color}-900`}
                            >
                              {event.title}
                            </h4>
                            <div
                              className={`week-event-details text-${event.color}-700`}
                            >
                              <span className="week-event-time">
                                <Clock className="w-3 h-3" />
                                {event.time}
                              </span>
                              <span>•</span>
                              <span>{event.duration}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="time-grid-lines">
                      {[...Array(12)].map((_, i) => (
                        <div key={i} className="grid-line"></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Upcoming Events List */}
        <div className="calendar-card upcoming-section">
          <h2 className="section-title">다가오는 일정</h2>
          <div className="upcoming-list">
            {events.slice(0, 4).map((event) => (
              <div key={event.id} className="upcoming-event-card">
                <div className={`event-icon-box bg-${event.color}-100`}>
                  <Calendar className={`w-6 h-6 text-${event.color}-600`} />
                </div>
                <div className="event-info">
                  <h3 className="upcoming-event-title">{event.title}</h3>
                  <div className="upcoming-event-meta">
                    <span className="meta-item">
                      <Clock className="w-4 h-4" />
                      {event.time} ({event.duration})
                    </span>
                    <span>•</span>
                    <span className="meta-item">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </span>
                  </div>
                </div>
                <div className="event-actions">
                  <Badge
                    variant="outline"
                    className={`team-badge bg-${event.color}-50 text-${event.color}-700 border-${event.color}-200`}
                  >
                    {event.team}
                  </Badge>
                  <div className="attendees-count">
                    <Users className="w-4 h-4" />
                    {event.attendees}
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="calendar-card legend-section">
          <h3 className="section-title">팀별 색상</h3>
          <div className="legend-grid">
            {[
              { name: "개발팀", color: "indigo" },
              { name: "디자인팀", color: "blue" },
              { name: "마케팅팀", color: "pink" },
              { name: "운영팀", color: "purple" },
              { name: "전체", color: "orange" },
              { name: "개인", color: "green" },
            ].map((team) => (
              <div key={team.name} className="legend-item">
                <div className={`legend-color bg-${team.color}-500`}></div>
                <span className="legend-label">{team.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
