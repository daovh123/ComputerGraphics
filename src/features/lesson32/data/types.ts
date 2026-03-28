export interface Lesson32OverviewData {
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

export interface Lesson32OrganData {
  id: string;
  slug: string;
  title: string;
  nameVi: string;
  shortLabel: string;
  order: number;
  isFoodPath: boolean;
  functionText: string;
  digestionText: string;
  functionSummary: string;
  mechanicalDigestion: string;
  chemicalDigestion: string;
  healthNote: string;
  sceneTargetName: string;
  meshKey?: string;
  color: string;
  position: [number, number, number];
}

export interface Lesson32DigestionStep {
  id: string;
  order: number;
  organId: string;
  title: string;
  whatHappens: string;
  mechanical: string;
  chemical: string;
  absorption: string;
  supportingOrgans: string[];
  visualHint: string;
}

export interface Lesson32Disease {
  id: string;
  name: string;
  shortDescription: string;
  causes: string[];
  symptoms: string[];
  prevention: string[];
  shouldDo: string[];
  shouldAvoid: string[];
}

export interface Lesson32NutritionData {
  nutrientGroups: string[];
  nutritionPrinciples: string[];
  factorsAffectingNeeds: string[];
  mealPlanningTips: string[];
  simpleActivities: string[];
}

export interface Lesson32FoodSafetyData {
  unsafeSources: string[];
  consequences: string[];
  choosingRules: string[];
  storageRules: string[];
  cookingRules: string[];
  safetyScenarios: Array<{
    id: string;
    prompt: string;
    isSafe: boolean;
  }>;
}

export interface Lesson32QuizQuestion {
  id: string;
  topic: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface Lesson32ActivitiesData {
  projectIntro: string;
  diseaseSurveyTemplate: string[];
  foodSafetySurveyTemplate: string[];
  reflectionQuestions: string[];
}
