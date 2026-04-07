export type BodySystem = "muscle" | "skeleton";

export type BodyView = "front" | "back";

export type Lesson31Tab =
  | "overview"
  | "anatomy"
  | "movement-function"
  | "diseases"
  | "model3d"
  | "quiz"
  | "summary";

export interface BodyPart {
  id: string;
  name: string;
  system: BodySystem;
  view: BodyView;
  x: number;
  y: number;
  width: number;
  height: number;
  shortDescription: string;
  function: string;
  gradeLevelNote: string;
}

export interface Lesson31TabOption {
  id: Lesson31Tab;
  label: string;
}

export interface Lesson31PartItem {
  id: string;
  name: string;
  system: BodySystem;
  side: BodyView;
  description: string;
  structure: string;
  function: string;
  note: string;
}

export type Lesson31ModelId = "skeleton" | "muscle" | "locomotor";

export interface Lesson31Model3DItem {
  id: Lesson31ModelId;
  label: string;
  cardDescription: string;
  modelPath: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  observationTips: string[];
  remember: string;
  cameraPosition: [number, number, number];
  fitScale: number;
  minDistance: number;
  maxDistance: number;
}

export interface Lesson31QuizQuestion {
  id: number;
  question: string;
  options: [string, string, string, string];
  correctAnswer: number;
}
