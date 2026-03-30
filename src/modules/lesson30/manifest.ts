import { Activity, BookOpen, CheckSquare, Gamepad2, Layers, Timer, UserCircle2 } from "lucide-react";
import type { LessonManifest } from "../../lessons/types";

export const lesson30Manifest: LessonManifest = {
  id: "30",
  order: 30,
  subjectId: "khtn",
  title: "Bài 30: Khái quát về cơ thể người",
  routePath: "/lesson-30",
  card: {
    id: 1,
    title: "Bài 30: Khái quát về cơ thể người",
    description: "Hệ vận động, hệ tuần hoàn, hệ hô hấp, hệ tiêu hóa...",
    image: "https://picsum.photos/seed/bio1/400/300",
    progress: 85,
    duration: "45 phút",
    rating: 4.8,
    routePath: "/lesson-30",
  },
  tabs: [
    { label: "Tổng quan", path: "/lesson-30", icon: BookOpen },
    { label: "Cấu tạo cơ thể", path: "/lesson-30/body-parts", icon: Layers },
    { label: "Sự phối hợp", path: "/lesson-30/coordination", icon: Activity },
    { label: "Đồng hồ sinh học", path: "/lesson-30/biological-clock", icon: Timer },
    { label: "Đặc điểm riêng", path: "/lesson-30/characteristics", icon: UserCircle2 },
    { label: "Thử thách", path: "/lesson-30/challenge", icon: Gamepad2 },
    { label: "Tổng kết", path: "/lesson-30/summary", icon: CheckSquare },
  ],
  sidebar: {
    label: "Bài 30",
    fullName: "Khái quát về cơ thể người",
    sections: [
      { id: "lesson-overview", label: "Khái quát cơ thể người", path: "/lesson-30", iconKey: "book" },
      { id: "body-parts", label: "Cấu tạo cơ thể", path: "/lesson-30/body-parts", iconKey: "layers" },
      { id: "coordination", label: "Sự phối hợp cơ thể", path: "/lesson-30/coordination", iconKey: "activity" },
      { id: "biological-clock", label: "Đồng hồ sinh học", path: "/lesson-30/biological-clock", iconKey: "clock" },
      { id: "summary", label: "Tổng kết kiến thức", path: "/lesson-30/summary", iconKey: "check" },
      { id: "challenge", label: "Giải trí & Thử thách", path: "/lesson-30/challenge", iconKey: "game" },
      { id: "characteristics", label: "Đặc điểm riêng", path: "/lesson-30/characteristics", iconKey: "user" },
    ],
  },
};
