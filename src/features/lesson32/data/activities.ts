import { Lesson32ActivitiesData } from "./types";

export const lesson32ActivitiesData: Lesson32ActivitiesData = {
  finalActivity: {
    id: "digestive-health-checklist",
    type: "habit-checklist",
    title: "Activity cuoi bai: Chon thoi quen tot cho he tieu hoa",
    instruction:
      "Hay chon tat ca hanh vi tot cho he tieu hoa va an toan thuc pham.",
    items: [
      {
        id: "habit-1",
        label: "Rua tay truoc khi che bien thuc pham.",
        isCorrect: true,
        explanation: "Rua tay dung cach giup giam nguy co nhiem khuan.",
      },
      {
        id: "habit-2",
        label: "Bo bua sang de giam can nhanh.",
        isCorrect: false,
        explanation: "Bo bua sang de lam co the thieu nang luong va de an bu tru.",
      },
      {
        id: "habit-3",
        label: "Danh rang 2 lan moi ngay.",
        isCorrect: true,
        explanation: "Day la thoi quen quan trong de phong sau rang.",
      },
      {
        id: "habit-4",
        label: "De thuc an chin canh thuc an song trong tu lanh.",
        isCorrect: false,
        explanation: "De chung song - chin de gay nhiem cheo.",
      },
      {
        id: "habit-5",
        label: "An da dang nhom chat va uong du nuoc.",
        isCorrect: true,
        explanation: "Giup co the phat trien can doi va ho tro tieu hoa.",
      },
      {
        id: "habit-6",
        label: "An nhieu do ngot truoc khi ngu.",
        isCorrect: false,
        explanation: "Tang nguy co sau rang va roi loan tieu hoa.",
      },
    ],
    answerKey: ["habit-1", "habit-3", "habit-5"],
    feedbackSummary:
      "Neu em chon dung cac thoi quen tot, em da hieu cach giu he tieu hoa khoe va phong tranh ngo doc thuc pham.",
    relatedSection: "quiz",
  },
};
