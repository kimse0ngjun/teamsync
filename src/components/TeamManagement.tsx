import { useState } from "react";
import {
  Plus,
  Search,
  UserPlus,
  MoreVertical,
  Mail,
  Crown,
  Shield,
  User,
  Trash2,
  Edit,
} from "lucide-react";
import "./TeamManagement.css";

interface TeamManagementProps {
  onBack: () => void;
}

export default function TeamManagement({ onBack }: TeamManagementProps) {
  const [selectedTeam, setSelectedTeam] = useState("개발팀");
  const [searchQuery, setSearchQuery] = useState("");

  const teams = [
    {
      id: 1,
      name: "개발팀",
      description: "프론트엔드 & 백엔드 개발",
      members: 8,
      color: "indigo",
      createdAt: "2024.01.15",
    },
    {
      id: 2,
      name: "디자인팀",
      description: "UI/UX 디자인 및 브랜딩",
      members: 5,
      color: "blue",
      createdAt: "2024.01.20",
    },
    {
      id: 3,
      name: "마케팅팀",
      description: "마케팅 & 콘텐츠 제작",
      members: 6,
      color: "purple",
      createdAt: "2024.02.01",
    },
    {
      id: 4,
      name: "운영팀",
      description: "고객 지원 및 운영",
      members: 4,
      color: "pink",
      createdAt: "2024.02.10",
    },
  ];

  const teamMembers = [
    {
      id: 1,
      name: "김민수",
      email: "minsu.kim@company.com",
      role: "Owner",
      avatar: "KM",
      status: "online",
      joinedAt: "2024.01.15",
    },
    {
      id: 2,
      name: "이지은",
      email: "jieun.lee@company.com",
      role: "Admin",
      avatar: "LJ",
      status: "online",
      joinedAt: "2024.01.15",
    },
    {
      id: 3,
      name: "박서준",
      email: "seojun.park@company.com",
      role: "Member",
      avatar: "PS",
      status: "away",
      joinedAt: "2024.01.20",
    },
    {
      id: 4,
      name: "최유진",
      email: "yujin.choi@company.com",
      role: "Member",
      avatar: "CY",
      status: "offline",
      joinedAt: "2024.01.25",
    },
    {
      id: 5,
      name: "정수아",
      email: "sua.jung@company.com",
      role: "Member",
      avatar: "JS",
      status: "online",
      joinedAt: "2024.02.01",
    },
    {
      id: 6,
      name: "강동원",
      email: "dongwon.kang@company.com",
      role: "Member",
      avatar: "KD",
      status: "online",
      joinedAt: "2024.02.05",
    },
    {
      id: 7,
      name: "송혜교",
      email: "hyekyo.song@company.com",
      role: "Member",
      avatar: "SH",
      status: "away",
      joinedAt: "2024.02.10",
    },
    {
      id: 8,
      name: "윤아라",
      email: "ara.yoon@company.com",
      role: "Member",
      avatar: "YA",
      status: "online",
      joinedAt: "2024.02.15",
    },
  ];

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Owner":
        return <Crown className="w-4 h-4 text-yellow-600" />;
      case "Admin":
        return <Shield className="w-4 h-4 text-blue-600" />;
      default:
        return <User className="w-4 h-4 text-slate-600" />;
    }
  };

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case "Owner":
        return "role-owner";
      case "Admin":
        return "role-admin";
      default:
        return "role-member";
    }
  };

  const selectedTeamData = teams.find((team) => team.name === selectedTeam);

  return (
    <div className="team-management-container">
      <div className="team-management-layout">
        {/* Left Sidebar - Team List */}
        <aside className="team-sidebar glass-sidebar">
          <div className="sidebar-header-section">
            <button onClick={onBack} className="back-button">
              ← 대시보드로 돌아가기
            </button>
            <div className="sidebar-title-row">
              <h2 className="sidebar-title">팀 관리</h2>
              <button className="add-team-button">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="search-container">
            <Search className="search-icon" />
            <input placeholder="팀 검색..." className="search-input" />
          </div>

          <div className="team-list-section">
            <p className="team-list-label">전체 팀 ({teams.length})</p>
            <div className="team-list">
              {teams.map((team) => (
                <button
                  key={team.id}
                  onClick={() => setSelectedTeam(team.name)}
                  className={`team-list-item ${
                    selectedTeam === team.name ? "active" : ""
                  }`}
                >
                  <div className="team-item-content">
                    <div className={`team-icon-wrapper bg-${team.color}-100`}>
                      <div className={`team-dot bg-${team.color}-500`}></div>
                    </div>
                    <div className="team-info">
                      <h3 className="team-name">{team.name}</h3>
                      <p className="team-desc">{team.description}</p>
                      <div className="team-meta">
                        <span>{team.members}명</span>
                        <span>•</span>
                        <span>{team.createdAt}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content - Team Details */}
        <main className="team-main-content">
          <div className="team-content-wrapper">
            {/* Team Header */}
            <div className="glass-card team-header-card">
              <div className="team-header-top">
                <div className="team-header-info">
                  <div
                    className={`team-logo-large bg-${selectedTeamData?.color}-100`}
                  >
                    <div
                      className={`team-dot-large bg-${selectedTeamData?.color}-500`}
                    ></div>
                  </div>
                  <div>
                    <h1 className="team-title-large">
                      {selectedTeamData?.name}
                    </h1>
                    <p className="team-desc-large">
                      {selectedTeamData?.description}
                    </p>
                    <div className="team-stats">
                      <span className="stat-item">
                        <User className="w-4 h-4" />
                        {selectedTeamData?.members}명
                      </span>
                      <span>•</span>
                      <span>생성일: {selectedTeamData?.createdAt}</span>
                    </div>
                  </div>
                </div>
                <div className="team-actions">
                  <button className="action-button">
                    <Edit className="w-4 h-4" />
                    편집
                  </button>
                  <button className="action-button danger">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Members Section */}
            <div className="glass-card members-section">
              <div className="members-header">
                <div className="members-title">
                  <h2>팀 멤버</h2>
                  <p>{teamMembers.length}명의 멤버가 있습니다</p>
                </div>
                <div className="members-actions">
                  <div className="search-container">
                    <Search className="search-icon" />
                    <input
                      placeholder="멤버 검색..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="member-search-input"
                    />
                  </div>
                  <button className="add-member-button">
                    <UserPlus className="w-4 h-4" />
                    멤버 추가
                  </button>
                </div>
              </div>

              <div className="members-list">
                {teamMembers.map((member) => (
                  <div key={member.id} className="member-card">
                    <div className="member-avatar-wrapper">
                      <div className="member-avatar">{member.avatar}</div>
                      <div
                        className={`status-indicator status-${member.status}`}
                      ></div>
                    </div>

                    <div className="member-info">
                      <div className="member-name-row">
                        <h3 className="member-name">{member.name}</h3>
                        <span
                          className={`role-badge ${getRoleBadgeClass(
                            member.role
                          )}`}
                        >
                          {getRoleIcon(member.role)}
                          {member.role}
                        </span>
                      </div>
                      <div className="member-meta">
                        <span className="stat-item">
                          <Mail className="w-3.5 h-3.5" />
                          {member.email}
                        </span>
                        <span>•</span>
                        <span>가입일: {member.joinedAt}</span>
                      </div>
                    </div>

                    <div className="member-actions">
                      {member.role === "Member" && (
                        <>
                          <button className="icon-button info">
                            <Shield className="w-4 h-4" />
                          </button>
                          <button className="icon-button danger">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      <button className="icon-button">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Role Description */}
            <div className="glass-card roles-section">
              <h2 className="roles-title">역할 안내</h2>
              <div className="roles-grid">
                <div className="role-card role-owner">
                  <div className="role-card-header">
                    <Crown className="w-5 h-5 text-yellow-600" />
                    <h3 className="role-card-title text-yellow-900">Owner</h3>
                  </div>
                  <p className="role-card-desc text-yellow-700">
                    팀의 모든 권한을 가지며, 팀 삭제 및 소유권 이전이
                    가능합니다.
                  </p>
                </div>

                <div className="role-card role-admin">
                  <div className="role-card-header">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <h3 className="role-card-title text-blue-900">Admin</h3>
                  </div>
                  <p className="role-card-desc text-blue-700">
                    멤버 추가/제거, 역할 변경 등 팀 관리 권한을 가집니다.
                  </p>
                </div>

                <div className="role-card role-member">
                  <div className="role-card-header">
                    <User className="w-5 h-5 text-slate-600" />
                    <h3 className="role-card-title text-slate-900">Member</h3>
                  </div>
                  <p className="role-card-desc text-slate-700">
                    팀의 일반 멤버로, 회의 참여 및 일정 생성이 가능합니다.
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
