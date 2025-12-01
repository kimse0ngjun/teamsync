import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import {
  MessageSquare,
  Send,
  Paperclip,
  Smile,
  Settings,
  Users,
  Hash,
  Sparkles,
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  X,
  Edit,
  FileText,
  ChevronRight,
} from "lucide-react";

interface ChatRoomProps {
  onBack: () => void;
  onOpenScheduleModal: () => void;
}

export default function ChatRoom({
  onBack,
  onOpenScheduleModal,
}: ChatRoomProps) {
  const [message, setMessage] = useState("");
  const [showAISuggestion, setShowAISuggestion] = useState(true);
  const [showAISummary, setShowAISummary] = useState(false);

  const rooms = [
    { id: 1, name: "디자인 리뷰", team: "디자인팀", unread: 0 },
    { id: 2, name: "스프린트 플래닝", team: "개발팀", unread: 3 },
    { id: 3, name: "마케팅 캠페인", team: "마케팅팀", unread: 7 },
    { id: 4, name: "주간 미팅", team: "전체", unread: 0 },
  ];

  const messages = [
    {
      id: 1,
      user: "김민수",
      avatar: "KM",
      message: "안녕하세요! 이번 주 프로젝트 진행 상황 공유드립니다.",
      time: "오전 10:30",
      isMe: false,
    },
    {
      id: 2,
      user: "이지은",
      avatar: "LJ",
      message: "네, 좋습니다. 디자인 작업은 거의 완료되었어요.",
      time: "오전 10:32",
      isMe: false,
    },
    {
      id: 3,
      user: "나",
      avatar: "ME",
      message:
        "그럼 내일 오후 2시에 회의실에서 만나서 최종 리뷰 진행하면 어떨까요?",
      time: "오전 10:35",
      isMe: true,
    },
    {
      id: 4,
      user: "박서준",
      avatar: "PS",
      message: "좋아요! 참석자는 김민수님, 이지은님, 저 이렇게 3명이면 될까요?",
      time: "오전 10:36",
      isMe: false,
    },
    {
      id: 5,
      user: "최유진",
      avatar: "CY",
      message: "저도 참여하고 싶어요. 4명으로 진행해요.",
      time: "오전 10:37",
      isMe: false,
    },
    {
      id: 6,
      user: "김민수",
      avatar: "KM",
      message: "확인했습니다. 그럼 내일 오후 2시에 3층 회의실에서 봬요!",
      time: "오전 10:38",
      isMe: false,
    },
  ];

  const aiSuggestion = {
    title: "최종 프로젝트 리뷰 회의",
    date: "2024년 11월 29일",
    time: "오후 2:00",
    location: "3층 회의실",
    attendees: ["김민수", "이지은", "박서준", "최유진"],
    tasks: [
      "디자인 최종 검토",
      "개발 진행 상황 공유",
      "다음 스프린트 계획 수립",
    ],
  };

  const aiSummary = {
    title: "디자인 리뷰 회의 요약",
    date: "2024년 11월 28일 오전 10:00 - 11:00",
    attendees: 4,
    keyPoints: [
      "신규 랜딩 페이지 디자인 최종 승인",
      "모바일 반응형 디자인 수정 필요",
      "A/B 테스트 계획 수립",
    ],
    decisions: [
      "랜딩 페이지 메인 컬러를 인디고로 변경",
      "다음 주 월요일까지 모바일 디자인 완료",
    ],
    tasks: [
      { assignee: "이지은", task: "모바일 디자인 수정", dueDate: "12월 2일" },
      {
        assignee: "김민수",
        task: "A/B 테스트 계획서 작성",
        dueDate: "12월 1일",
      },
      {
        assignee: "박서준",
        task: "개발 일정 업데이트",
        dueDate: "11월 30일",
      },
    ],
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle send message
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <div className="flex h-screen">
        {/* Left Sidebar - Room List */}
        <aside className="w-72 glass-sidebar p-4 space-y-4 overflow-y-auto">
          <div className="space-y-3">
            <button
              onClick={onBack}
              className="text-sm text-slate-600 hover:text-indigo-600 transition-colors"
            >
              ← 대시보드로 돌아가기
            </button>
            <div className="flex items-center justify-between">
              <h2 className="text-xl text-slate-900">회의방</h2>
              <Button
                size="sm"
                className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white"
              >
                <MessageSquare className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-1">
            {rooms.map((room) => (
              <button
                key={room.id}
                className={`w-full text-left p-3 rounded-xl transition-all ${
                  room.id === 1
                    ? "bg-white shadow-md border border-indigo-200"
                    : "bg-white/50 hover:bg-white hover:shadow-md"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                    <Hash className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm text-slate-900 mb-0.5 truncate">
                      {room.name}
                    </h3>
                    <p className="text-xs text-slate-600 truncate">
                      {room.team}
                    </p>
                  </div>
                  {room.unread > 0 && (
                    <Badge className="bg-indigo-600 text-white text-xs">
                      {room.unread}
                    </Badge>
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-200/50">
            <button
              onClick={() => setShowAISummary(!showAISummary)}
              className="w-full text-left p-3 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span className="text-sm text-purple-900">AI 회의 요약</span>
              </div>
              <p className="text-xs text-purple-700">
                최근 회의 요약을 확인하세요
              </p>
            </button>
          </div>
        </aside>

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col">
          {/* Chat Header */}
          <header className="glass-card border-b border-slate-200/50 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center">
                  <Hash className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl text-slate-900">디자인 리뷰</h1>
                  <p className="text-sm text-slate-600">
                    디자인팀 • 4명 참여 중
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Users className="w-4 h-4" />
                  참여자
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </header>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.isMe ? "flex-row-reverse" : ""}`}
              >
                {!msg.isMe && (
                  <Avatar className="w-10 h-10 flex-shrink-0">
                    <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-blue-500 text-white">
                      {msg.avatar}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`flex-1 max-w-2xl ${
                    msg.isMe ? "flex flex-col items-end" : ""
                  }`}
                >
                  {!msg.isMe && (
                    <p className="text-sm text-slate-900 mb-1">{msg.user}</p>
                  )}
                  <div
                    className={`inline-block p-4 rounded-2xl ${
                      msg.isMe
                        ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white"
                        : "glass-card"
                    }`}
                  >
                    <p
                      className={`${
                        msg.isMe ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {msg.message}
                    </p>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="glass-card border-t border-slate-200/50 p-4">
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <div className="glass-card rounded-2xl p-4 space-y-3">
                  <Input
                    placeholder="메시지를 입력하세요..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="border-0 bg-transparent p-0 focus-visible:ring-0"
                  />
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Paperclip className="w-4 h-4" />
                      파일
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Smile className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <Button
                onClick={handleSendMessage}
                className="h-14 px-6 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-lg shadow-indigo-500/30"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </main>

        {/* Right Panel - AI Suggestions */}
        <aside className="w-96 glass-sidebar p-6 space-y-6 overflow-y-auto">
          {/* AI Schedule Suggestion */}
          {showAISuggestion && (
            <div className="glass-card rounded-2xl p-6 space-y-4 border-2 border-indigo-200 animate-in fade-in slide-in-from-right">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-slate-900">AI 일정 제안</h3>
                    <p className="text-xs text-slate-600">
                      채팅에서 일정을 감지했습니다
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAISuggestion(false)}
                  className="p-1 hover:bg-white/50 rounded transition-colors"
                >
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-white border border-slate-100">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-indigo-600" />
                    <span className="text-sm text-slate-600">제목</span>
                  </div>
                  <p className="text-slate-900">{aiSuggestion.title}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-white border border-slate-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-slate-600">날짜</span>
                    </div>
                    <p className="text-sm text-slate-900">
                      {aiSuggestion.date}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-purple-600" />
                      <span className="text-sm text-slate-600">시간</span>
                    </div>
                    <p className="text-sm text-slate-900">
                      {aiSuggestion.time}
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white border border-slate-100">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-pink-600" />
                    <span className="text-sm text-slate-600">장소</span>
                  </div>
                  <p className="text-slate-900">{aiSuggestion.location}</p>
                </div>

                <div className="p-3 rounded-xl bg-white border border-slate-100">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-slate-600">참석자</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {aiSuggestion.attendees.map((attendee, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-indigo-50 text-indigo-700 border-indigo-200"
                      >
                        {attendee}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white border border-slate-100">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                    <span className="text-sm text-slate-600">할 일</span>
                  </div>
                  <ul className="space-y-2">
                    {aiSuggestion.tasks.map((task, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-sm text-slate-900"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={onOpenScheduleModal}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-lg shadow-indigo-500/30"
                >
                  일정 생성
                </Button>
                <Button variant="outline" className="gap-2">
                  <Edit className="w-4 h-4" />
                  수정
                </Button>
              </div>
            </div>
          )}

          {/* AI Meeting Summary */}
          {showAISummary && (
            <div className="glass-card rounded-2xl p-6 space-y-4 animate-in fade-in slide-in-from-right">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-slate-900">회의 요약</h3>
                    <p className="text-xs text-slate-600">{aiSummary.date}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAISummary(false)}
                  className="p-1 hover:bg-white/50 rounded transition-colors"
                >
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200">
                  <h4 className="text-sm text-purple-900 mb-2">주요 내용</h4>
                  <ul className="space-y-2">
                    {aiSummary.keyPoints.map((point, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm text-purple-800"
                      >
                        <ChevronRight className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
                  <h4 className="text-sm text-blue-900 mb-2">결정 사항</h4>
                  <ul className="space-y-2">
                    {aiSummary.decisions.map((decision, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm text-blue-800"
                      >
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        {decision}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <h4 className="text-sm text-slate-900 mb-3">할 일 목록</h4>
                  <div className="space-y-2">
                    {aiSummary.tasks.map((task, index) => (
                      <div
                        key={index}
                        className="p-3 rounded-lg bg-slate-50 border border-slate-100"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-slate-900">
                            {task.task}
                          </span>
                          <Badge
                            variant="outline"
                            className="text-xs bg-indigo-50 text-indigo-700 border-indigo-200"
                          >
                            {task.dueDate}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-600">
                          담당자: {task.assignee}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Button className="w-full gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                <FileText className="w-4 h-4" />
                전체 요약 보기
              </Button>
            </div>
          )}

          {/* Quick Actions */}
          <div className="glass-card rounded-2xl p-6 space-y-3">
            <h3 className="text-slate-900 mb-3">빠른 작업</h3>
            <Button
              variant="outline"
              className="w-full justify-start gap-3 h-auto p-3"
            >
              <Calendar className="w-5 h-5 text-indigo-600" />
              <div className="text-left flex-1">
                <p className="text-sm text-slate-900">새 일정 만들기</p>
                <p className="text-xs text-slate-600">수동으로 일정 추가</p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-3 h-auto p-3"
            >
              <Sparkles className="w-5 h-5 text-purple-600" />
              <div className="text-left flex-1">
                <p className="text-sm text-slate-900">회의 종료</p>
                <p className="text-xs text-slate-600">AI 요약 생성</p>
              </div>
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
