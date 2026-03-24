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
  | "library";

export interface Lesson {
  id: string;
  title: string;
  description: string;
  image: string;
  progress: number;
}
