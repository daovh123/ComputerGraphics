import type { LessonManifest } from "../../lessons/types";
import { lesson31Placeholder } from "./data/placeholder";

export const lesson31Manifest: LessonManifest = {
  id: "31",
  order: 31,
  subjectId: "khtn",
  title: "Bài 31: Hệ vận động ở người",
  routePath: "/lesson-placeholder/31",
  card: {
    id: 2,
    title: "Bài 31: Hệ vận động ở người",
    description: "Cấu tạo xương, cơ, khớp và các bệnh liên quan...",
    image: "https://picsum.photos/seed/bio2/400/300",
    progress: 40,
    duration: "60 phút",
    rating: 4.9,
    routePath: "/lesson-placeholder/31",
  },
  sidebar: {
    label: "Bài 31",
    fullName: "Hệ vận động ở người",
  },
  placeholder: lesson31Placeholder,
};
