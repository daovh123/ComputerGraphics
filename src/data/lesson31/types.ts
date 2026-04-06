export interface Lesson31OverviewData {
  title: string;
  subtitle: string;
  introSummary: string;
  heroQuestion: string;
  learningObjectives: string[];
  sections: Array<{
    id: string;
    title: string;
    description: string;
    route: string;
  }>;
}

export interface Lesson31Disease {
  id: string;
  title: string;
  shortDescription: string;
  causes: string[];
  symptoms: string[];
  prevention: string[];
  doList?: string[];
  avoidList?: string[];
}

export interface FirstAidStep {
  stepNumber: number;
  instruction: string;
}

export interface FirstAidProcedure {
  id: string;
  title: string;
  steps: FirstAidStep[];
}

export interface Lesson31ProtectionData {
  exerciseMeaning: {
    significance: string[];
    methods: string[];
  };
  firstAid: {
    preparation: string[];
    procedures: FirstAidProcedure[];
  };
}

export interface Lesson31QuizQuestion {
  id: string;
  prompt?: string;
  question?: string;
  options: string[];
  correctAnswerIndex: number;
  feedback?: string;
  explanation?: string;
  category: string;
}

export interface Lesson31ActivityItem {
  id: string;
  label: string;
  isCorrect: boolean;
}

export interface Lesson31FinalActivity {
  id: string;
  title: string;
  instruction: string;
  items: Lesson31ActivityItem[];
  feedbackSummary: string;
}

export interface Lesson31SimulationStep {
  id: string;
  order: number;
  title: string;
  shortDescription: string;
  phase: "Thần kinh" | "Co cơ" | "Đòn bẩy";
  keyComponents: string[];
  summaryBadges: string[];
}

export interface Lesson31Content {
  diseases: Lesson31Disease[];
  protection: Lesson31ProtectionData;
  quiz: Lesson31QuizQuestion[];
  activity: Lesson31FinalActivity;
  simulation: Lesson31SimulationStep[];
}
