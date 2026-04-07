import {
  Activity,
  BookOpen,
  Gamepad2,
  HeartPulse,
  Layers,
  UserCircle2,
} from "lucide-react";
import type { LessonManifest } from "../../lessons/types";
import lesson33Card from "./assets/lesson-33-card.svg";

export const lesson33Manifest: LessonManifest = {
  id: "33",
  order: 33,
  subjectId: "khtn",
  title: "Bài 33: Máu và hệ tuần hoàn",
  routePath: "/lesson-33",
  card: {
    id: 4,
    title: "Bài 33: Máu và hệ tuần hoàn",
    description: "Thành phần máu, cấu tạo tim, mạch máu...",
    image: lesson33Card,
    progress: 0,
    duration: "55 phút",
    rating: 4.8,
    routePath: "/lesson-33",
  },
  tabs: [
    { label: "Tổng quan", path: "/lesson-33", icon: BookOpen },
    { label: "Khám phá 3D", path: "/lesson-33/explorer", icon: Layers },
    { label: "Cấu tạo máu", path: "/lesson-33/blood", icon: Activity },
    { label: "Tuần hoàn", path: "/lesson-33/simulation", icon: HeartPulse },
    { label: "Bệnh lý", path: "/lesson-33/diseases", icon: UserCircle2 },
    { label: "Trắc nghiệm", path: "/lesson-33/quiz", icon: Gamepad2 },
  ],
  sidebar: {
    label: "Bài 33",
    fullName: "Máu và hệ tuần hoàn",
    sections: [
      { id: "lesson-33-overview", label: "Tổng quan", path: "/lesson-33", iconKey: "book" },
      { id: "lesson-33-explorer", label: "Khám phá 3D", path: "/lesson-33/explorer", iconKey: "layers" },
      { id: "lesson-33-blood", label: "Cấu tạo máu", path: "/lesson-33/blood", iconKey: "activity" },
      { id: "lesson-33-simulation", label: "Tuần hoàn", path: "/lesson-33/simulation", iconKey: "clock" },
      { id: "lesson-33-diseases", label: "Bệnh lý", path: "/lesson-33/diseases", iconKey: "user" },
      { id: "lesson-33-quiz", label: "Trắc nghiệm", path: "/lesson-33/quiz", iconKey: "game" },
    ],
  },
};
