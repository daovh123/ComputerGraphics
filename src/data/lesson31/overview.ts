import { Lesson31OverviewData } from "./types";

export const lesson31OverviewData: Lesson31OverviewData = {
  title: "Bài 31: Hệ vận động ở người",
  subtitle: "Khoa học tự nhiên 8",
  introSummary:
    "Bài học giúp em tìm hiểu cấu tạo và chức năng của hệ vận động, nhận biết một số bệnh tật liên quan, từ đó biết cách tập thể dục thể thao hợp lý và thực hành sơ cứu gãy xương.",
  heroQuestion:
    "Nhờ đâu cơ thể chúng ta có hình dạng nhất định và có thể vận động linh hoạt trong không gian?",
  learningObjectives: [
    "Nêu được chức năng của hệ vận động.",
    "Trình bày được cấu tạo của xương và hệ cơ, nêu được sự phù hợp giữa cấu tạo và chức năng.",
    "Quan sát 3D hoặc tranh ảnh, mô hình bộ xương người và nhận biết các phần chính của bộ xương.",
    "Giải thích được nguyên lí đòn bẩy trong sự vận động của hệ cơ xương.",
    "Hiểu được một số bệnh, tật về hệ vận động (cong vẹo cột sống, loãng xương) và cách phòng tránh.",
    "Nêu được ý nghĩa của việc tập luyện thể dục thể thao.",
    "Thực hành sơ cứu và băng bó khi người khác bị gãy xương.",
  ],
  sections: [
    {
      id: "explorer",
      title: "Khám phá bộ xương và hệ cơ 3D",
      description:
        "Tương tác với mô hình 3D để nhận biết vị trí và cấu tạo các xương chính, các khối cơ quan trọng trên cơ thể.",
      route: "/lesson-31/explorer",
    },
    {
      id: "simulation",
      title: "Cơ chế co cơ & Nguyên lý đòn bẩy",
      description:
        "Mô phỏng lại quá trình cơ co dãn làm xương cử động và minh họa đòn bẩy khi gập khuỷu tay.",
      route: "/lesson-31/simulation",
    },
    {
      id: "diseases",
      title: "Bệnh và tật liên quan",
      description:
        "Tìm hiểu nguyên nhân, biểu hiện và cách phòng ngừa tật cong vẹo cột sống cùng bệnh loãng xương.",
      route: "/lesson-31/diseases",
    },
    {
      id: "protection",
      title: "Bảo vệ & Sơ cứu",
      description:
        "Ý nghĩa tập thể dục, thể thao để rèn luyện hệ vận động và các bước sơ cứu khi gãy tay, gãy chân.",
      route: "/lesson-31/protection",
    },
    {
      id: "quiz",
      title: "Luyện tập và kiểm tra",
      description: "Làm trắc nghiệm để củng cố và kiểm tra kiến thức toàn bài 31.",
      route: "/lesson-31/quiz",
    },
  ],
};
