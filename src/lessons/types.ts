import type { LucideIcon } from "lucide-react";
import type React from "react";

export type SidebarIconKey =
  | "book"
  | "layers"
  | "activity"
  | "clock"
  | "check"
  | "game"
  | "user";

export interface LessonTabConfig {
  label: string;
  path: string;
  icon?: LucideIcon;
}

export interface LessonSidebarSection {
  id: string;
  label: string;
  path: string;
  iconKey: SidebarIconKey;
}

export interface LessonSidebarConfig {
  label?: string;
  fullName?: string;
  hidden?: boolean;
  sections?: LessonSidebarSection[];
}

export interface LessonCardMeta {
  id: number;
  title: string;
  description: string;
  image: string;
  progress: number;
  duration: string;
  rating: number;
  routePath?: string;
}

export interface LessonPlaceholderPart {
  id: number;
  title: string;
  content: string;
}

export interface LessonPlaceholderMeta {
  title?: string;
  eyebrow?: string;
  summary?: string;
  videoStatusLabel?: string;
  rating?: number;
  parts: LessonPlaceholderPart[];
}

export interface LessonManifest {
  id: string;
  order: number;
  subjectId: string;
  title: string;
  routePath?: string;
  card?: LessonCardMeta;
  tabs?: LessonTabConfig[];
  sidebar?: LessonSidebarConfig;
  placeholder?: LessonPlaceholderMeta;
}

export interface LessonRouteConfig {
  path: string;
  element: React.ReactElement;
  chrome?: "app" | "lesson";
}
