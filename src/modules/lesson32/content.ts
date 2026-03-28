import { lesson32OrgansData } from "../../features/lesson32/data/organs";
import { lesson32QuizData } from "../../features/lesson32/data/quiz";

export interface DigestiveOrgan {
  id: string;
  name: string;
  role: string;
  mechanicalChemical: string;
  healthTip: string;
  color: string;
  position: [number, number, number];
}

export const lesson32Organs: DigestiveOrgan[] = lesson32OrgansData.map(
  (organ) => ({
    id: organ.id,
    name: organ.nameVi,
    role: organ.functionSummary,
    mechanicalChemical: `Co hoc: ${organ.mechanicalDigestion} Hoa hoc: ${organ.chemicalDigestion}`,
    healthTip: organ.healthNote,
    color: organ.color,
    position: organ.position,
  }),
);

export interface Lesson32QuizQuestion {
  id: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const lesson32Quiz: Lesson32QuizQuestion[] = lesson32QuizData.map(
  (item) => ({
    id: item.id,
    question: item.question,
    options: item.options,
    answer: item.correctAnswer,
    explanation: item.explanation,
  }),
);
