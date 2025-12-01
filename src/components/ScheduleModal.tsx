import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Calendar } from "./ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Sparkles,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  Plus,
  X,
} from "lucide-react";
import "./ScheduleModal.css";

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

export default function ScheduleModal({
  isOpen,
  onClose,
  onSave,
}: ScheduleModalProps) {
  const [title, setTitle] = useState("최종 프로젝트 리뷰 회의");
  const [date, setDate] = useState<Date | undefined>(new Date(2024, 10, 29));
  const [time, setTime] = useState("14:00");
  const [location, setLocation] = useState("3층 회의실");
  const [attendees, setAttendees] = useState([
    "김민수",
    "이지은",
    "박서준",
    "최유진",
  ]);
  const [newAttendee, setNewAttendee] = useState("");
  const [tasks, setTasks] = useState([
    "디자인 최종 검토",
    "개발 진행 상황 공유",
    "다음 스프린트 계획 수립",
  ]);
  const [newTask, setNewTask] = useState("");

  const handleAddAttendee = () => {
    if (newAttendee.trim()) {
      setAttendees([...attendees, newAttendee.trim()]);
      setNewAttendee("");
    }
  };

  const handleRemoveAttendee = (index: number) => {
    setAttendees(attendees.filter((_, i) => i !== index));
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask.trim()]);
      setNewTask("");
    }
  };

  const handleRemoveTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onSave();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="schedule-modal-content">
        <DialogHeader className="schedule-modal-header">
          <div className="header-content">
            <div className="header-icon-box">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <DialogTitle className="modal-title">AI 일정 생성</DialogTitle>
              <DialogDescription className="modal-description">
                채팅에서 감지된 정보로 자동 생성되었습니다
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="modal-body">
          {/* Title */}
          <div className="form-section">
            <Label htmlFor="title" className="form-label">
              <CalendarIcon className="w-4 h-4 text-indigo-600" />
              일정 제목
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
              placeholder="회의 제목을 입력하세요"
            />
          </div>

          {/* Date & Time */}
          <div className="datetime-grid">
            <div className="form-section">
              <Label className="form-label">
                <CalendarIcon className="w-4 h-4 text-blue-600" />
                날짜
              </Label>
              <div className="calendar-wrapper">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md"
                />
              </div>
            </div>

            <div className="time-location-group">
              <div className="form-section">
                <Label htmlFor="time" className="form-label">
                  <Clock className="w-4 h-4 text-purple-600" />
                  시간
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-section">
                <Label htmlFor="location" className="form-label">
                  <MapPin className="w-4 h-4 text-pink-600" />
                  장소
                </Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="form-input"
                  placeholder="회의 장소를 입력하세요"
                />
              </div>
            </div>
          </div>

          {/* Attendees */}
          <div className="form-section">
            <Label className="form-label">
              <Users className="w-4 h-4 text-green-600" />
              참석자
            </Label>
            <div className="attendees-wrapper">
              <div className="attendees-list">
                {attendees.map((attendee, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="attendee-badge"
                  >
                    {attendee}
                    <button
                      onClick={() => handleRemoveAttendee(index)}
                      className="remove-attendee-btn"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="add-item-row">
                <Input
                  value={newAttendee}
                  onChange={(e) => setNewAttendee(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddAttendee();
                    }
                  }}
                  placeholder="참석자 이름 입력"
                  className="add-input"
                />
                <Button
                  onClick={handleAddAttendee}
                  variant="outline"
                  className="add-button"
                >
                  <Plus className="w-4 h-4" />
                  추가
                </Button>
              </div>
            </div>
          </div>

          {/* Tasks */}
          <div className="form-section">
            <Label className="form-label">
              <CheckCircle2 className="w-4 h-4 text-indigo-600" />할 일 목록
            </Label>
            <div className="attendees-wrapper">
              <div className="tasks-list">
                {tasks.map((task, index) => (
                  <div key={index} className="task-item group">
                    <div className="task-bullet"></div>
                    <span className="task-text">{task}</span>
                    <button
                      onClick={() => handleRemoveTask(index)}
                      className="remove-task-btn"
                    >
                      <X className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="add-item-row">
                <Input
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTask();
                    }
                  }}
                  placeholder="새 할 일 입력"
                  className="add-input"
                />
                <Button
                  onClick={handleAddTask}
                  variant="outline"
                  className="add-button"
                >
                  <Plus className="w-4 h-4" />
                  추가
                </Button>
              </div>
            </div>
          </div>

          {/* AI Note */}
          <div className="ai-note-box">
            <div className="ai-note-content">
              <div className="ai-icon-box">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="ai-text-content">
                <h4 className="ai-note-title">AI가 자동으로 감지했습니다</h4>
                <p className="ai-note-desc">
                  채팅 내용을 분석하여 일정 정보를 추출했습니다. 필요한 경우
                  수정하고 저장하세요.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <div className="footer-buttons">
            <Button
              onClick={onClose}
              variant="outline"
              className="cancel-button"
            >
              취소
            </Button>
            <Button onClick={handleSave} className="save-button">
              캘린더에 저장
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
