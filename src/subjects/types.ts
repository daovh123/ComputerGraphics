import type { LucideIcon } from "lucide-react";
import type { LessonCardMeta } from "../lessons/types";

export interface SubjectSidebarConfig {
  showLessons?: boolean;
  defaultExpanded?: boolean;
}

export interface SubjectDashboardConfig {
  showInHome?: boolean;
}

export interface SubjectManifest {
  id: string;
  name: string;
  description?: string;
  icon: LucideIcon;
  color: string;
  lessonCards?: LessonCardMeta[];
  sidebar?: SubjectSidebarConfig;
  dashboard?: SubjectDashboardConfig;
}
