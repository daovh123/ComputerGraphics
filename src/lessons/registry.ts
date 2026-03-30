import type { LessonManifest, LessonRouteConfig } from "./types";
import { lesson30Manifest } from "../modules/lesson30/manifest";
import { lesson30Routes } from "../modules/lesson30/routes";
import { lesson31Manifest } from "../modules/lesson31/manifest";
import { lesson31Routes } from "../modules/lesson31/routes";
import { lesson32Manifest } from "../modules/lesson32/manifest";
import { lesson33Manifest } from "../modules/lesson33/manifest";
import { lesson32Routes } from "../modules/lesson32/routes";
import { lesson33Routes } from "../modules/lesson33/routes";
import type { LessonPlaceholderMeta } from "./types";

const defaultPlaceholder = (parts: LessonPlaceholderMeta["parts"]): LessonPlaceholderMeta => ({
  eyebrow: "Kiến thức trọng tâm",
  summary: "Khám phá các phần kiến thức trọng tâm của bài học này.",
  videoStatusLabel: "Sắp ra mắt",
  rating: 4.8,
  parts,
});

const placeholderLessons: LessonManifest[] = [
  {
    id: "34",
    order: 34,
    subjectId: "khtn",
    title: "Bài 34: Hệ hô hấp ở người",
    routePath: "/lesson-placeholder/34",
    card: {
      id: 5,
      title: "Bài 34: Hệ hô hấp ở người",
      description: "Cấu tạo hệ hô hấp, cơ chế trao đổi khí...",
      image: "https://picsum.photos/seed/bio5/400/300",
      progress: 0,
      duration: "40 phút",
      rating: 4.6,
      routePath: "/lesson-placeholder/34",
    },
    sidebar: {
      label: "Bài 34",
      fullName: "Hệ hô hấp ở người",
    },
    placeholder: defaultPlaceholder([
      {
        id: 1,
        title: "Phần 1: Cấu tạo hệ hô hấp",
        content: "Tìm hiểu mũi, thanh quản, khí quản, phế quản và phổi trong hệ hô hấp người.",
      },
      {
        id: 2,
        title: "Phần 2: Cơ chế trao đổi khí",
        content: "Không khí đi vào phổi, oxy khuếch tán vào máu và carbon dioxide được thải ra ngoài.",
      },
    ]),
  },
  {
    id: "35",
    order: 35,
    subjectId: "khtn",
    title: "Bài 35: Hệ bài tiết ở người",
    routePath: "/lesson-placeholder/35",
    card: {
      id: 6,
      title: "Bài 35: Hệ bài tiết ở người",
      description: "Cấu tạo hệ bài tiết, cơ chế tạo nước tiểu...",
      image: "https://picsum.photos/seed/bio6/400/300",
      progress: 0,
      duration: "45 phút",
      rating: 4.7,
      routePath: "/lesson-placeholder/35",
    },
    sidebar: {
      label: "Bài 35",
      fullName: "Hệ bài tiết ở người",
    },
    placeholder: defaultPlaceholder([
      {
        id: 1,
        title: "Phần 1: Cấu tạo hệ bài tiết",
        content: "Tìm hiểu thận, ống dẫn nước tiểu, bóng đái và ống đái trong hệ bài tiết.",
      },
      {
        id: 2,
        title: "Phần 2: Vai trò bài tiết",
        content: "Hệ bài tiết giúp loại bỏ chất thải, duy trì cân bằng nước và ổn định môi trường trong cơ thể.",
      },
    ]),
  },
];

export const LESSONS: LessonManifest[] = [
  lesson30Manifest,
  lesson31Manifest,
  lesson32Manifest,
  lesson33Manifest,
  ...placeholderLessons,
].sort((a, b) => a.order - b.order);

export const LESSON_ROUTES: LessonRouteConfig[] = [
  ...lesson30Routes,
  ...lesson31Routes,
  ...lesson32Routes,
  ...lesson33Routes,
];

export function getLessonsBySubject(subjectId: string) {
  return LESSONS.filter((lesson) => lesson.subjectId === subjectId);
}

export function getLessonById(lessonId: string) {
  return LESSONS.find((lesson) => lesson.id === lessonId);
}
