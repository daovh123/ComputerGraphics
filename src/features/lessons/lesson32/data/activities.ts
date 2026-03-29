import { Lesson32ActivitiesData } from "./types";

export const lesson32ActivitiesData: Lesson32ActivitiesData = {
  finalActivity: {
    id: "digestive-health-checklist",
    type: "habit-checklist",
    title: "Hoạt động cuối bài: Chọn thói quen tốt cho hệ tiêu hóa",
    instruction:
      "Hãy chọn tất cả hành vi tốt cho hệ tiêu hóa và an toàn thực phẩm.",
    items: [
      {
        id: "habit-1",
        label: "Rửa tay trước khi chế biến thực phẩm.",
        isCorrect: true,
        explanation: "Rửa tay đúng cách giúp giảm nguy cơ nhiễm khuẩn.",
      },
      {
        id: "habit-2",
        label: "Bỏ bữa sáng để giảm cân nhanh.",
        isCorrect: false,
        explanation:
          "Bỏ bữa sáng dễ làm cơ thể thiếu năng lượng và ăn bù không tốt.",
      },
      {
        id: "habit-3",
        label: "Đánh răng 2 lần mỗi ngày.",
        isCorrect: true,
        explanation: "Thói quen quan trọng để phòng sâu răng.",
      },
      {
        id: "habit-4",
        label: "Để thức ăn chín cạnh thức ăn sống trong tủ lạnh.",
        isCorrect: false,
        explanation: "Để chung sống - chín dễ gây nhiễm chéo.",
      },
      {
        id: "habit-5",
        label: "Ăn đa dạng nhóm chất và uống đủ nước.",
        isCorrect: true,
        explanation: "Giúp cơ thể phát triển cân đối và hỗ trợ tiêu hóa.",
      },
      {
        id: "habit-6",
        label: "Ăn nhiều đồ ngọt trước khi ngủ.",
        isCorrect: false,
        explanation: "Tăng nguy cơ sâu răng và rối loạn tiêu hóa.",
      },
    ],
    answerKey: ["habit-1", "habit-3", "habit-5"],
    feedbackSummary:
      "Nếu em chọn đúng các thói quen tốt, em đã hiểu cách giữ hệ tiêu hóa khỏe và phòng tránh ngộ độc thực phẩm.",
    relatedSection: "quiz",
  },
};
