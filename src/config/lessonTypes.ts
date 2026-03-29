import type { LucideIcon } from "lucide-react";
import type { View } from "../router/views";

export interface LessonSectionItem {
  id: View;
  label: string;
  iconKey: "book" | "layers" | "activity" | "clock" | "check" | "game" | "user";
}

export interface LessonNavItem {
  id: string;
  label: string;
  fullName: string;
  routePath?: string;
  fallbackView?: View;
  sections: LessonSectionItem[];
}

export interface SubjectLessonCard {
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

export interface LessonTabConfig {
  label: string;
  path: string;
  icon?: LucideIcon;
}
