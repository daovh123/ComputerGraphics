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
