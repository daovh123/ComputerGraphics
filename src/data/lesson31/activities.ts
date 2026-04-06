import { Lesson31FinalActivity } from "./types";

export const lesson31ActivitiesData: { finalActivity: Lesson31FinalActivity } = {
  finalActivity: {
    id: "habit-checklist",
    title: "Thói quen bảo vệ hệ vận động",
    instruction: "Đánh dấu vào những thói quen TỐT cho sự phát triển của hệ xương và cơ khớp của em:",
    items: [
      {
        id: "a1",
        label: "Đeo cặp học sinh (ba-lô) đều đặn trên cả 2 vai.",
        isCorrect: true,
      },
      {
        id: "a2",
        label: "Thường xuyên xách vali, đồ vật nặng lệch về 1 tay.",
        isCorrect: false,
      },
      {
        id: "a3",
        label: "Ngồi học bài ngay ngắn, thẳng lưng, không lết ngực xuống mặt bàn.",
        isCorrect: true,
      },
      {
        id: "a4",
        label: "Lười vận động ngoài trời, thường xem máy tính suốt ngày nghỉ.",
        isCorrect: false,
      },
      {
        id: "a5",
        label: "Đi bộ, đạp xe đều đặn mỗi ngày và tắm nắng đúng cách.",
        isCorrect: true,
      },
    ],
    feedbackSummary: "Hệ vận động cần có sự bảo vệ toàn diện từ việc ăn uống đầy đủ Canxi đến việc loại bỏ các tư thế học tập/làm việc sai lầm nhé!",
  },
};
