export type View = 
  | "dashboard" 
  | "lesson-overview" 
  | "body-parts" 
  | "coordination" 
  | "biological-clock" 
  | "summary" 
  | "challenge" 
  | "characteristics"
  | "lesson-placeholder"
  | "library"
  | "lesson-32-overview"
  | "lesson-32-explorer"
  | "lesson-32-simulation"
  | "lesson-32-diseases"
  | "lesson-32-nutrition"
  | "lesson-32-food-safety"
  | "lesson-32-quiz"
  | "lesson-33-overview"
  | "lesson-33-explorer"
  | "lesson-33-blood"
  | "lesson-33-simulation"
  | "lesson-33-diseases"
  | "lesson-33-quiz";

export interface Lesson {
  id: string;
  title: string;
  description: string;
  image: string;
  progress: number;
}
