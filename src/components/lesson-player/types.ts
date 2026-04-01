import type React from "react";

export interface LessonPlayerStepLink {
  id: string;
  title: string;
  path: string;
}

export interface LessonPlayerStep extends LessonPlayerStepLink {
  summary: string;
}

export interface LessonPlayerResolvedStep extends LessonPlayerStep {
  content: React.ReactNode;
}
