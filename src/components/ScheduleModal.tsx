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
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0 gap-0 bg-gradient-to-br from-white to-indigo-50/30">
        <DialogHeader className="p-6 pb-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <DialogTitle className="text-xl text-white">
                AI 일정 생성
              </DialogTitle>
              <DialogDescription className="text-indigo-100">
                채팅에서 감지된 정보로 자동 생성되었습니다
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label
              htmlFor="title"
              className="flex items-center gap-2 text-slate-700"
            >
              <CalendarIcon className="w-4 h-4 text-indigo-600" />
              일정 제목
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-12 bg-white border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="회의 제목을 입력하세요"
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-slate-700">
                <CalendarIcon className="w-4 h-4 text-blue-600" />
                날짜
              </Label>
              <div className="glass-card rounded-xl p-4">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="time"
                  className="flex items-center gap-2 text-slate-700"
                >
                  <Clock className="w-4 h-4 text-purple-600" />
                  시간
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="h-12 bg-white border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="location"
                  className="flex items-center gap-2 text-slate-700"
                >
                  <MapPin className="w-4 h-4 text-pink-600" />
                  장소
                </Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="h-12 bg-white border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="회의 장소를 입력하세요"
                />
              </div>
            </div>
          </div>

          {/* Attendees */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-slate-700">
              <Users className="w-4 h-4 text-green-600" />
              참석자
            </Label>
            <div className="glass-card rounded-xl p-4 space-y-3">
              <div className="flex flex-wrap gap-2">
                {attendees.map((attendee, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-indigo-50 text-indigo-700 border-indigo-200 pl-3 pr-1 py-1.5 gap-2"
                  >
                    {attendee}
                    <button
                      onClick={() => handleRemoveAttendee(index)}
                      className="p-0.5 hover:bg-indigo-200 rounded transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
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
                  className="flex-1 bg-white border-slate-200"
                />
                <Button
                  onClick={handleAddAttendee}
                  variant="outline"
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  추가
                </Button>
              </div>
            </div>
          </div>

          {/* Tasks */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-indigo-600" />할 일 목록
            </Label>
            <div className="glass-card rounded-xl p-4 space-y-3">
              <div className="space-y-2">
                {tasks.map((task, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg bg-white border border-slate-100 group hover:border-indigo-200 transition-colors"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0"></div>
                    <span className="flex-1 text-sm text-slate-900">
                      {task}
                    </span>
                    <button
                      onClick={() => handleRemoveTask(index)}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 rounded transition-all"
                    >
                      <X className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
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
                  className="flex-1 bg-white border-slate-200"
                />
                <Button
                  onClick={handleAddTask}
                  variant="outline"
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  추가
                </Button>
              </div>
            </div>
          </div>

          {/* AI Note */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm text-purple-900 mb-1">
                  AI가 자동으로 감지했습니다
                </h4>
                <p className="text-sm text-purple-700">
                  채팅 내용을 분석하여 일정 정보를 추출했습니다. 필요한 경우
                  수정하고 저장하세요.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-4 border-t border-slate-200 bg-white rounded-b-lg">
          <div className="flex gap-3">
            <Button onClick={onClose} variant="outline" className="flex-1 h-12">
              취소
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 h-12 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-lg shadow-indigo-500/30"
            >
              캘린더에 저장
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
