import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  Plus,
  X,
  FileText,
} from "lucide-react";

import type { Schedule } from "../types";

interface CreateScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (schedule: Schedule) => void;
}

export default function CreateScheduleModal({
  isOpen,
  onClose,
  onSave,
}: CreateScheduleModalProps) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");
  const [location, setLocation] = useState("");
  const [team, setTeam] = useState("");
  const [description, setDescription] = useState("");
  const [attendees, setAttendees] = useState<string[]>([]);
  const [newAttendee, setNewAttendee] = useState("");

  const handleAddAttendee = () => {
    if (newAttendee.trim()) {
      setAttendees([...attendees, newAttendee.trim()]);
      setNewAttendee("");
    }
  };

  const handleRemoveAttendee = (index: number) => {
    setAttendees(attendees.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const schedule = {
      title,
      date,
      time,
      duration,
      location,
      team,
      description,
      attendees,
    };
    onSave(schedule);
    // Reset form
    setTitle("");
    setDate("");
    setTime("");
    setDuration("");
    setLocation("");
    setTeam("");
    setDescription("");
    setAttendees([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 gap-0">
        <DialogHeader className="p-6 pb-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-t-lg">
          <DialogTitle className="text-xl text-white">
            새 일정 만들기
          </DialogTitle>
          <DialogDescription className="text-indigo-100">
            새로운 회의 또는 일정을 생성하세요
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label
              htmlFor="title"
              className="flex items-center gap-2 text-slate-700"
            >
              <FileText className="w-4 h-4 text-indigo-600" />
              일정 제목
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-12 bg-white border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="예: 주간 스프린트 회의"
              required
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="date"
                className="flex items-center gap-2 text-slate-700"
              >
                <CalendarIcon className="w-4 h-4 text-blue-600" />
                날짜
              </Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="h-12 bg-white border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

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
                required
              />
            </div>
          </div>

          {/* Duration & Location */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="duration"
                className="flex items-center gap-2 text-slate-700"
              >
                <Clock className="w-4 h-4 text-indigo-600" />
                소요 시간
              </Label>
              <Input
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="h-12 bg-white border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="예: 1h, 30m"
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
                placeholder="예: 3층 회의실"
              />
            </div>
          </div>

          {/* Team */}
          <div className="space-y-2">
            <Label htmlFor="team" className="text-slate-700">
              팀 선택
            </Label>
            <Select value={team} onValueChange={setTeam}>
              <SelectTrigger className="h-12 bg-white border-slate-200">
                <SelectValue placeholder="팀을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="개발팀">개발팀</SelectItem>
                <SelectItem value="디자인팀">디자인팀</SelectItem>
                <SelectItem value="마케팅팀">마케팅팀</SelectItem>
                <SelectItem value="운영팀">운영팀</SelectItem>
                <SelectItem value="전체">전체</SelectItem>
                <SelectItem value="개인">개인</SelectItem>
              </SelectContent>
            </Select>
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
                  type="button"
                  variant="outline"
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  추가
                </Button>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-slate-700">
              설명 (선택사항)
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px] bg-white border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="회의 안건이나 추가 정보를 입력하세요"
            />
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
              disabled={!title || !date || !time}
            >
              일정 생성
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
