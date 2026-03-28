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
  slug: string;
  organId: string;
  title: string;
  shortDescription: string;
  mechanicalDigestion: boolean;
  chemicalDigestion: boolean;
  absorption: boolean;
  absorptionNote: string;
  supportOrgans: string[];
  summaryBadges: string[];
  whatHappens?: string;
  mechanical?: string;
  chemical?: string;
  supportingOrgans?: string[];
  visualHint?: string;
}

export interface Lesson32Disease {
  id: string;
  title: string;
  shortDescription: string;
  causes: string[];
  symptoms: string[];
  prevention: string[];
  doList?: string[];
  avoidList?: string[];
}

export interface Lesson32NutrientGroup {
  id: string;
  title: string;
  role: string;
  examples: string[];
}

export interface Lesson32NutritionData {
  introSummary: string;
  nutrientGroups: Lesson32NutrientGroup[];
  nutritionPrinciples: string[];
  factorsAffectingNeeds: string[];
  mealPlanningTips: string[];
  quickMealIdeas: string[];
  simpleActivities: string[];
}

export interface Lesson32SafetyClassificationItem {
  id: string;
  item: string;
  isSafe: boolean;
  reason: string;
}

export interface Lesson32TrueFalseItem {
  id: string;
  statement: string;
  isTrue: boolean;
  explanation: string;
}

export interface Lesson32FoodSafetyData {
  safeFoodDefinition: string;
  unsafeSources: string[];
  consequences: string[];
  choosingRules: string[];
  storageRules: string[];
  cookingRules: string[];
  classificationItems: Lesson32SafetyClassificationItem[];
  trueFalseItems: Lesson32TrueFalseItem[];
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
