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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <button
              onClick={onBack}
              className="text-sm text-slate-600 hover:text-indigo-600 transition-colors mb-3"
            >
              ← 대시보드로 돌아가기
            </button>
            <h1 className="text-3xl text-slate-900">캘린더</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              필터
            </Button>
            <Button className="gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-lg shadow-indigo-500/30">
              <Plus className="w-4 h-4" />새 일정 만들기
            </Button>
          </div>
        </div>

        {/* Calendar Controls */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={viewMode === "month" ? previousMonth : previousWeek}
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <h2 className="text-xl text-slate-900 min-w-[180px] text-center">
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

            <div className="flex gap-2">
              <Button
                variant={viewMode === "month" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("month")}
                className={
                  viewMode === "month"
                    ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white"
                    : ""
                }
              >
                월간
              </Button>
              <Button
                variant={viewMode === "week" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("week")}
                className={
                  viewMode === "week"
                    ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white"
                    : ""
                }
              >
                주간
              </Button>
            </div>
          </div>

          {/* Month View */}
          {viewMode === "month" && (
            <div>
              <div className="grid grid-cols-7 gap-2 mb-2">
                {weekDays.map((day, index) => (
                  <div
                    key={index}
                    className="text-center p-3 text-sm text-slate-600"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {days.map((day, index) => (
                  <div
                    key={index}
                    className={`min-h-[120px] p-3 rounded-xl transition-all ${
                      day === null
                        ? "bg-transparent"
                        : isToday(day)
                        ? "bg-gradient-to-br from-indigo-100 to-blue-100 border-2 border-indigo-300"
                        : "bg-white hover:shadow-md hover:border-indigo-200 border border-slate-100"
                    }`}
                  >
                    {day !== null && (
                      <>
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`text-sm ${
                              isToday(day)
                                ? "w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center"
                                : "text-slate-900"
                            }`}
                          >
                            {day}
                          </span>
                        </div>
                        <div className="space-y-1">
                          {getEventsForDay(day)
                            .slice(0, 2)
                            .map((event) => (
                              <div
                                key={event.id}
                                className={`p-2 rounded-lg bg-${event.color}-50 border border-${event.color}-200 cursor-pointer hover:shadow-sm transition-all group`}
                              >
                                <div className="flex items-start justify-between gap-1">
                                  <p
                                    className={`text-xs text-${event.color}-900 line-clamp-1`}
                                  >
                                    {event.title}
                                  </p>
                                </div>
                                <p
                                  className={`text-xs text-${event.color}-700 mt-0.5`}
                                >
                                  {event.time}
                                </p>
                              </div>
                            ))}
                          {getEventsForDay(day).length > 2 && (
                            <button className="text-xs text-indigo-600 hover:text-indigo-700 w-full text-left pl-2">
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
              <div className="grid grid-cols-8 gap-2 mb-2">
                <div className="text-center p-3 text-sm text-slate-600"></div>
                {weekDaysList.map((day, index) => (
                  <div
                    key={index}
                    className={`text-center p-3 rounded-xl ${
                      isToday(day)
                        ? "bg-gradient-to-br from-indigo-600 to-blue-600 text-white"
                        : "text-slate-600"
                    }`}
                  >
                    <div className="text-xs mb-1">{weekDays[day.getDay()]}</div>
                    <div
                      className={`text-lg ${
                        isToday(day) ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {day.getDate()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-8 gap-2">
                <div className="space-y-16 pt-2">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="text-xs text-slate-500 text-right pr-2"
                    >
                      {i + 8}:00
                    </div>
                  ))}
                </div>

                {weekDaysList.map((day, dayIndex) => (
                  <div key={dayIndex} className="relative">
                    <div className="space-y-1">
                      {getEventsForDay(day).map((event, eventIndex) => {
                        const hour = parseInt(event.time.split(":")[0]);
                        const topPosition = (hour - 8) * 4;
                        return (
                          <div
                            key={event.id}
                            className={`absolute left-0 right-0 p-3 rounded-xl bg-${event.color}-50 border-l-4 border-${event.color}-500 cursor-pointer hover:shadow-lg transition-all z-10`}
                            style={{
                              top: `${topPosition}rem`,
                            }}
                          >
                            <h4
                              className={`text-sm text-${event.color}-900 mb-1 line-clamp-1`}
                            >
                              {event.title}
                            </h4>
                            <div
                              className={`flex items-center gap-2 text-xs text-${event.color}-700`}
                            >
                              <span className="flex items-center gap-1">
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
                    <div className="space-y-16 opacity-20">
                      {[...Array(12)].map((_, i) => (
                        <div
                          key={i}
                          className="border-t border-slate-200 h-16"
                        ></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Upcoming Events List */}
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl text-slate-900 mb-4">다가오는 일정</h2>
          <div className="space-y-3">
            {events.slice(0, 4).map((event) => (
              <div
                key={event.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all cursor-pointer"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-${event.color}-100 flex items-center justify-center flex-shrink-0`}
                >
                  <Calendar className={`w-6 h-6 text-${event.color}-600`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-slate-900 mb-1">{event.title}</h3>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {event.time} ({event.duration})
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className={`bg-${event.color}-50 text-${event.color}-700 border-${event.color}-200`}
                  >
                    {event.team}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-slate-600">
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
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-slate-900 mb-4">팀별 색상</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { name: "개발팀", color: "indigo" },
              { name: "디자인팀", color: "blue" },
              { name: "마케팅팀", color: "pink" },
              { name: "운영팀", color: "purple" },
              { name: "전체", color: "orange" },
              { name: "개인", color: "green" },
            ].map((team) => (
              <div
                key={team.name}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-slate-100"
              >
                <div
                  className={`w-3 h-3 rounded-full bg-${team.color}-500`}
                ></div>
                <span className="text-sm text-slate-900">{team.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
