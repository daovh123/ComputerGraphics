import {
  BookOpen,
  ClipboardCheck,
  Layers,
  Leaf,
  PlayCircle,
  Shield,
  ShieldCheck,
} from "lucide-react";
import type { LessonManifest } from "../../lessons/types";

export const lesson32Manifest: LessonManifest = {
  id: "32",
  order: 32,
  subjectId: "khtn",
  title: "Bài 32: Dinh dưỡng và tiêu hóa",
  routePath: "/lesson-32",
  card: {
    id: 3,
    title: "Bài 32: Dinh dưỡng và tiêu hóa",
    description: "Các chất dinh dưỡng, cấu tạo hệ tiêu hóa...",
    image: "https://picsum.photos/seed/bio3/400/300",
    progress: 0,
    duration: "50 phút",
    rating: 4.7,
    routePath: "/lesson-32",
  },
  tabs: [
    { label: "Tổng quan", path: "/lesson-32", icon: BookOpen },
    { label: "Khám phá 3D", path: "/lesson-32/explorer", icon: Layers },
    { label: "Mô phỏng", path: "/lesson-32/simulation", icon: PlayCircle },
    { label: "Bệnh tiêu hóa", path: "/lesson-32/diseases", icon: ShieldCheck },
    { label: "Dinh dưỡng", path: "/lesson-32/nutrition", icon: Leaf },
    { label: "An toàn thực phẩm", path: "/lesson-32/food-safety", icon: Shield },
    { label: "Trắc nghiệm", path: "/lesson-32/quiz", icon: ClipboardCheck },
  ],
  sidebar: {
    label: "Bài 32",
    fullName: "Dinh dưỡng và tiêu hóa",
    sections: [
      { id: "lesson-32-overview", label: "Tổng quan", path: "/lesson-32", iconKey: "book" },
      { id: "lesson-32-explorer", label: "Khám phá 3D", path: "/lesson-32/explorer", iconKey: "layers" },
      { id: "lesson-32-simulation", label: "Mô phỏng", path: "/lesson-32/simulation", iconKey: "activity" },
      { id: "lesson-32-diseases", label: "Bệnh tiêu hóa", path: "/lesson-32/diseases", iconKey: "clock" },
      { id: "lesson-32-nutrition", label: "Dinh dưỡng", path: "/lesson-32/nutrition", iconKey: "check" },
      { id: "lesson-32-food-safety", label: "An toàn thực phẩm", path: "/lesson-32/food-safety", iconKey: "user" },
      { id: "lesson-32-quiz", label: "Trắc nghiệm", path: "/lesson-32/quiz", iconKey: "game" },
    ],
  },
};
