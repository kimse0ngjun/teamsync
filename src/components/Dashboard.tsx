// Dashboard.tsx
import { useState } from "react";
import "./Dashboard.css";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import {
  Home,
  Users,
  MessageSquare,
  Calendar,
  Settings,
  Plus,
  UserPlus,
  Clock,
  Sparkles,
  ChevronDown,
  MoreHorizontal,
  TrendingUp,
} from "lucide-react";
import type { View } from "../App"; // App 경로에 맞게 수정

interface DashboardProps {
  onNavigate: (view: View) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const [activeTeam, setActiveTeam] = useState("전체");

  const upcomingEvents = [
    {
      id: 1,
      title: "주간 스프린트 회의",
      time: "오늘 오후 2:00",
      team: "개발팀",
      attendees: 5,
      color: "indigo",
    },
    {
      id: 2,
      title: "프로젝트 킥오프",
      time: "내일 오전 10:00",
      team: "디자인팀",
      attendees: 8,
      color: "blue",
    },
    {
      id: 3,
      title: "월간 리뷰",
      time: "금요일 오후 4:00",
      team: "마케팅팀",
      attendees: 12,
      color: "purple",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      user: "김민수",
      action: "회의 요약을 생성했습니다",
      target: "주간 스프린트 회의",
      time: "5분 전",
    },
    {
      id: 2,
      user: "이지은",
      action: "일정을 생성했습니다",
      target: "프로젝트 킥오프",
      time: "15분 전",
    },
    {
      id: 3,
      user: "박서준",
      action: "새 팀원을 초대했습니다",
      target: "개발팀",
      time: "1시간 전",
    },
    {
      id: 4,
      user: "최유진",
      action: "메시지를 남겼습니다",
      target: "디자인 리뷰",
      time: "2시간 전",
    },
  ];

  const activeRooms = [
    { id: 1, name: "디자인 리뷰", members: 4, unread: 3, team: "디자인팀" },
    { id: 2, name: "스프린트 플래닝", members: 6, unread: 0, team: "개발팀" },
    { id: 3, name: "마케팅 캠페인", members: 5, unread: 7, team: "마케팅팀" },
  ];

  const teamMembers = [
    { id: 1, name: "김민수", role: "Owner", status: "online", avatar: "KM" },
    { id: 2, name: "이지은", role: "Admin", status: "online", avatar: "LJ" },
    { id: 3, name: "박서준", role: "Member", status: "away", avatar: "PS" },
    { id: 4, name: "최유진", role: "Member", status: "offline", avatar: "CY" },
    { id: 5, name: "정수아", role: "Member", status: "online", avatar: "JS" },
  ];

  const teams = [
    { name: "개발팀", members: 8, color: "indigo" },
    { name: "디자인팀", members: 5, color: "blue" },
    { name: "마케팅팀", members: 6, color: "purple" },
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        {/* Organization Header */}
        <div className="sidebar-header">
          <div className="brand-container">
            <div className="brand-logo">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="brand-text">
              <h2>TeamSync</h2>
              <p>Premium Plan</p>
            </div>
            <button className="p-1.5 hover:bg-white/50 rounded-lg transition-colors ml-auto">
              <ChevronDown className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="nav-menu">
          <button
            onClick={() => onNavigate("dashboard")}
            className="nav-item active"
          >
            <Home className="w-5 h-5" />
            <span>대시보드</span>
          </button>
          <button onClick={() => onNavigate("teams")} className="nav-item">
            <Users className="w-5 h-5" />
            <span>팀 관리</span>
          </button>
          <button onClick={() => onNavigate("chat")} className="nav-item">
            <MessageSquare className="w-5 h-5" />
            <span>회의방</span>
            <Badge className="ml-auto bg-indigo-600 text-white">3</Badge>
          </button>
          <button onClick={() => onNavigate("calendar")} className="nav-item">
            <Calendar className="w-5 h-5" />
            <span>캘린더</span>
          </button>
          <button onClick={() => onNavigate("summary")} className="nav-item">
            <Sparkles className="w-5 h-5" />
            <span>회의 요약</span>
          </button>
        </nav>

        {/* Teams Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-3">
            <span className="text-sm text-slate-600">팀</span>
            <button className="p-1 hover:bg-white/50 rounded transition-colors">
              <Plus className="w-4 h-4 text-slate-600" />
            </button>
          </div>
          <div className="space-y-1">
            {teams.map((team) => (
              <button
                key={team.name}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/50 text-slate-700 transition-colors group"
              >
                <div
                  className={`w-2 h-2 rounded-full bg-${team.color}-500`}
                ></div>
                <span className="flex-1 text-left text-sm">{team.name}</span>
                <span className="text-xs text-slate-500">{team.members}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="!mt-auto pt-4 border-t border-slate-200/50">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/50 text-slate-700 transition-colors">
            <Settings className="w-5 h-5" />
            <span>설정</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Header */}
        <div className="dashboard-header">
          <div className="header-title">
            <h1>대시보드</h1>
            <p>안녕하세요, 오늘도 좋은 하루 되세요! 👋</p>
          </div>
          <div className="header-actions">
            <Button
              onClick={() => onNavigate("teams")}
              variant="outline"
              className="gap-2 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50"
            >
              <Plus className="w-4 h-4" />팀 생성
            </Button>
            <Button className="gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-lg shadow-indigo-500/30">
              <UserPlus className="w-4 h-4" />
              멤버 초대
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon bg-indigo-100">
                <Calendar className="w-5 h-5 text-indigo-600" />
              </div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <h3 className="stat-value">12</h3>
            <p className="stat-label">예정된 회의</p>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon bg-blue-100">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <h3 className="stat-value">24</h3>
            <p className="stat-label">팀 멤버</p>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon bg-purple-100">
                <MessageSquare className="w-5 h-5 text-purple-600" />
              </div>
              <Badge className="bg-purple-600 text-white text-xs">+5</Badge>
            </div>
            <h3 className="stat-value">8</h3>
            <p className="stat-label">활성 회의방</p>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon bg-pink-100">
                <Sparkles className="w-5 h-5 text-pink-600" />
              </div>
              <span className="text-xs text-slate-600">이번 주</span>
            </div>
            <h3 className="stat-value">18</h3>
            <p className="stat-label">AI 요약 생성</p>
          </div>
        </div>

        {/* Upcoming Events, Team Members, Active Rooms, Recent Activity */}
        {/* 기존 코드 그대로 유지, onNavigate 타입 적용 */}
      </main>
    </div>
  );
}
