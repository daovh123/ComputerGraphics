export interface BloodComponent {
  id: string;
  name: string;
  percentage: string;
  function: string;
  color: string;
  image: string;
}

export interface BloodType {
  id: string;
  type: string;
  antigens: string;
  antibodies: string;
  canDonateTo: string[];
  canReceiveFrom: string[];
  color: string;
}

export interface Organ3D {
  id: string;
  name: string;
  description: string;
  modelUrl?: string; // We'll use this later or ask user
  color: string;
  hotspots?: { position: [number, number, number]; label: string; description: string }[];
}

export interface Disease {
  id: string;
  name: string;
  cause: string;
  symptoms: string[];
  prevention: string[];
  image: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}
