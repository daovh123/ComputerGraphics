import type React from "react";
import type {
  LessonPlayerCompleteAction,
  LessonPlayerCompleteHighlight,
} from "../LessonPlayerCompleteScreen";

export interface LessonPlayerStepLink {
  id: string;
  title: string;
  path: string;
}

export interface LessonPlayerStep extends LessonPlayerStepLink {
  width?: "default" | "wide" | "full";
}

export interface LessonPlayerResolvedStep extends LessonPlayerStep {
  content: React.ReactNode;
}

export interface LessonLearnConfig {
  lessonTitle: string;
  exitPath: string;
  steps: LessonPlayerResolvedStep[];
  preload?: () => void;
  completion?: {
    title?: string;
    description?: string;
    highlights?: LessonPlayerCompleteHighlight[];
    actions?: LessonPlayerCompleteAction[];
  };
}
