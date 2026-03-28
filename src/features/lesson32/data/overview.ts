import { Lesson32OverviewData } from "./types";

export const lesson32OverviewData: Lesson32OverviewData = {
  title: "Bài 32: Dinh dưỡng và tiêu hóa",
  subtitle: "Khoa học tự nhiên 8",
  introSummary:
    "Bài học giúp em hiểu mối liên hệ giữa thức ăn, quá trình tiêu hóa và cách cơ thể sử dụng chất dinh dưỡng để phát triển khỏe mạnh.",
  heroQuestion: "Vì sao ăn đúng chưa đủ mà còn cần tiêu hóa tốt?",
  learningObjectives: [
    "Nêu được khái niệm chất dinh dưỡng và dinh dưỡng.",
    "Nhận biết cơ quan chính của hệ tiêu hóa và chức năng cơ bản.",
    "Mô tả được quá trình tiêu hóa cơ học và hóa học theo từng đoạn.",
    "Vận dụng kiến thức để ăn uống hợp lý và giữ vệ sinh thực phẩm.",
  ],
  sections: [
    {
      id: "explorer",
      title: "Khám phá hệ tiêu hóa 3D",
      description: "Chạm vào từng cơ quan để xem chức năng và lưu ý sức khỏe.",
      route: "/lesson-32/explorer",
    },
    {
      id: "simulation",
      title: "Mô phỏng quá trình tiêu hóa",
      description:
        "Theo dõi hành trình thức ăn và biến đổi chính trong cơ thể.",
      route: "/lesson-32/simulation",
    },
    {
      id: "diseases",
      title: "Một số bệnh đường tiêu hóa",
      description: "Nhận biết nguyên nhân, dấu hiệu và cách phòng tránh.",
      route: "/lesson-32/diseases",
    },
    {
      id: "nutrition",
      title: "Chế độ dinh dưỡng hợp lý",
      description: "Hiểu nhóm chất và nguyên tắc xây dựng khẩu phần phù hợp.",
      route: "/lesson-32/nutrition",
    },
    {
      id: "food-safety",
      title: "An toàn vệ sinh thực phẩm",
      description:
        "Nắm nguyên tắc lựa chọn, bảo quản và chế biến thực phẩm an toàn.",
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
