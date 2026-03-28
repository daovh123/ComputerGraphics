import { Lesson32OverviewData } from "./types";

export const lesson32OverviewData: Lesson32OverviewData = {
  title: "Bài 32: Dinh dưỡng và tiêu hóa",
  subtitle: "Khoa học tự nhiên 8",
  introSummary:
    "Bài học giúp em hiểu từ kiến thức dinh dưỡng đến quá trình tiêu hóa, từ đó biết cách ăn uống hợp lý và bảo vệ hệ tiêu hóa trong đời sống hằng ngày.",
  heroQuestion:
    "Vì sao ăn đủ chất thôi chưa đủ, mà còn cần tiêu hóa hiệu quả và an toàn thực phẩm?",
  learningObjectives: [
    "Hiểu vai trò của dinh dưỡng đối với cơ thể.",
    "Nhận biết các cơ quan chính của hệ tiêu hóa.",
    "Hiểu được quá trình tiêu hóa theo từng giai đoạn.",
    "Biết một số bệnh đường tiêu hóa thường gặp và cách phòng tránh.",
    "Biết xây dựng chế độ dinh dưỡng hợp lý theo lứa tuổi.",
    "Biết các nguyên tắc cơ bản về an toàn vệ sinh thực phẩm.",
  ],
  sections: [
    {
      id: "explorer",
      title: "Khám phá hệ tiêu hóa 3D",
      description:
        "Nhận biết cơ quan chính và xem nhanh chức năng, tiêu hóa cơ học/hóa học của từng cơ quan.",
      route: "/lesson-32/explorer",
    },
    {
      id: "simulation",
      title: "Mô phỏng quá trình tiêu hóa",
      description:
        "Theo dõi hành trình thức ăn và các biến đổi chính từ miệng đến ruột già.",
      route: "/lesson-32/simulation",
    },
    {
      id: "diseases",
      title: "Một số bệnh đường tiêu hóa",
      description:
        "Nắm nguyên nhân, dấu hiệu cơ bản và cách phòng tránh sâu răng, viêm loét dạ dày - tá tràng.",
      route: "/lesson-32/diseases",
    },
    {
      id: "nutrition",
      title: "Chế độ dinh dưỡng hợp lý",
      description:
        "Hiểu các nhóm chất dinh dưỡng và nguyên tắc xây dựng khẩu phần cân đối.",
      route: "/lesson-32/nutrition",
    },
    {
      id: "food-safety",
      title: "An toàn vệ sinh thực phẩm",
      description:
        "Biết lựa chọn, bảo quản và chế biến thực phẩm an toàn trong sinh hoạt hằng ngày.",
      route: "/lesson-32/food-safety",
    },
    {
      id: "quiz",
      title: "Ôn tập và kiểm tra",
      description: "Làm quiz tổng hợp để củng cố toàn bộ nội dung bài 32.",
      route: "/lesson-32/quiz",
    },
  ],
};
