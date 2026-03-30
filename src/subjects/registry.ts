import {
  BookText,
  Calculator,
  Languages,
  FlaskConical,
  Globe,
  Users,
  Monitor,
  Wrench,
  Dumbbell,
  Palette,
  Compass,
  MapPin,
} from "lucide-react";
import type { SubjectManifest } from "./types";
import { khtnLessonCards } from "./data/khtn";
import { toanLessonCards } from "./data/toan";
import { nguVanLessonCards } from "./data/ngu-van";
import { tiengAnhLessonCards } from "./data/tieng-anh";
import { lsDlLessonCards } from "./data/ls-dl";
import { gdcdLessonCards } from "./data/gdcd";
import { tinHocLessonCards } from "./data/tin-hoc";
import { congNgheLessonCards } from "./data/cong-nghe";
import { gdtcLessonCards } from "./data/gdtc";
import { ngheThuatLessonCards } from "./data/nghe-thuat";
import { traiNghiemLessonCards } from "./data/trai-nghiem";
import { diaPhuongLessonCards } from "./data/dia-phuong";

export const SUBJECTS: SubjectManifest[] = [
  {
    id: "ngu-van",
    name: "Ngữ văn",
    icon: BookText,
    color: "#FF6B6B",
    lessonCards: nguVanLessonCards,
    dashboard: { showInHome: true },
  },
  {
    id: "toan",
    name: "Toán",
    icon: Calculator,
    color: "#4D96FF",
    lessonCards: toanLessonCards,
    dashboard: { showInHome: true },
  },
  {
    id: "tieng-anh",
    name: "Tiếng Anh",
    icon: Languages,
    color: "#6BCB77",
    lessonCards: tiengAnhLessonCards,
  },
  {
    id: "khtn",
    name: "Khoa học tự nhiên",
    description: "Vật lý, Hóa học, Sinh học",
    icon: FlaskConical,
    color: "#00BFFF",
    lessonCards: khtnLessonCards,
    sidebar: { showLessons: true, defaultExpanded: true },
    dashboard: { showInHome: true },
  },
  {
    id: "ls-dl",
    name: "Lịch sử và Địa lý",
    icon: Globe,
    color: "#FFD93D",
    lessonCards: lsDlLessonCards,
  },
  {
    id: "gdcd",
    name: "Giáo dục công dân",
    icon: Users,
    color: "#6C5CE7",
    lessonCards: gdcdLessonCards,
  },
  {
    id: "tin-hoc",
    name: "Tin học",
    icon: Monitor,
    color: "#00CEC9",
    lessonCards: tinHocLessonCards,
  },
  {
    id: "cong-nghe",
    name: "Công nghệ",
    icon: Wrench,
    color: "#FAB1A0",
    lessonCards: congNgheLessonCards,
  },
  {
    id: "gdtc",
    name: "Giáo dục thể chất",
    icon: Dumbbell,
    color: "#E17055",
    lessonCards: gdtcLessonCards,
  },
  {
    id: "nghe-thuat",
    name: "Nghệ thuật",
    description: "Âm nhạc, Mĩ thuật",
    icon: Palette,
    color: "#FD79A8",
    lessonCards: ngheThuatLessonCards,
  },
  {
    id: "trai-nghiem",
    name: "HĐ trải nghiệm, HN",
    icon: Compass,
    color: "#55E6C1",
    lessonCards: traiNghiemLessonCards,
  },
  {
    id: "dia-phuong",
    name: "GD địa phương",
    icon: MapPin,
    color: "#A29BFE",
    lessonCards: diaPhuongLessonCards,
  },
];

export function getSubjectById(subjectId: string) {
  return SUBJECTS.find((subject) => subject.id === subjectId);
}

export function getHomeSubjects() {
  return SUBJECTS.filter((subject) => subject.dashboard?.showInHome);
}

export function getSubjectLessonCards(subjectId: string) {
  return getSubjectById(subjectId)?.lessonCards ?? [];
}
