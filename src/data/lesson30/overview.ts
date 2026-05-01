export const lessonOverview = {
  title: "Khái quát về cơ thể người",
  description:
    "Bài học giúp em nhận biết các phần chính của cơ thể người và nêu được vai trò của một số hệ cơ quan tiêu biểu.",
  objectives: [
    "Kể tên được 5 phần chính của cơ thể người (đầu, cổ, thân, tay và chân).",
    "Nêu được các lớp bao bọc cơ thể từ ngoài vào trong (da → mỡ → cơ → xương).",
    "Kể tên được một số hệ cơ quan và cơ quan tiêu biểu của mỗi hệ.",
    "Nêu được vai trò chính của các hệ cơ quan trong cơ thể người.",
  ],
} as const;

export const BODY_PARTS = ["Đầu", "Cổ", "Thân", "Tay", "Chân"] as const;

export const BODY_LAYERS = ["Da", "Mỡ", "Cơ", "Xương"] as const;

export const DISCUSSION = {
  prompt: "Cơ thể người có mấy phần? Kể tên các phần đó.",
  answer:
    "Cơ thể người gồm 5 phần chính: đầu, cổ, thân, tay và chân. Mỗi phần có cấu tạo và chức năng riêng, nhưng chúng phối hợp với nhau để cơ thể hoạt động một cách hiệu quả.",

} as const;
