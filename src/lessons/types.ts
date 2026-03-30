import type { LucideIcon } from "lucide-react";
import type React from "react";
import type { View } from "../router/views";

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
  fallbackView?: View;
}

export interface LessonManifest {
  id: string;
  order: number;
  subjectId: string;
  title: string;
  routePath?: string;
  fallbackView?: View;
  card?: LessonCardMeta;
  tabs?: LessonTabConfig[];
  sidebar?: LessonSidebarConfig;
}

export interface LessonRouteConfig {
  path: string;
  element: React.ReactElement;
}
