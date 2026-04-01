import React, { useEffect } from "react";
import LessonPlayer from "../../components/LessonPlayer";
import { lesson33LearnSteps } from "./data/learnSteps";
import { preloadAngiologyModel } from "./learn/AngiologyViewer";

export default function Lesson33LearnPlayer() {
  useEffect(() => {
    preloadAngiologyModel();
  }, []);

  return (
    <LessonPlayer
      lessonTitle="Bài 33"
      exitPath="/lesson-33"
      steps={lesson33LearnSteps}
      completion={{
        title: "Em đã hoàn thành phần học tương tác",
        description:
          "Em đã đi qua các ý chính của Bài 33. Từ đây có thể quay lại từng bước, mở mô hình hoặc chuyển sang phần học chi tiết hơn.",
        highlights: [
          {
            title: "Máu không chỉ có màu đỏ",
            description:
              "Máu gồm huyết tương và các tế bào máu, mỗi phần có vai trò riêng trong vận chuyển, bảo vệ và cầm máu.",
          },
          {
            title: "Từng lớp máu cho biết từng chức năng",
            description:
              "Khi ly tâm, các thành phần tách lớp giúp em nhìn rõ vai trò của hồng cầu, bạch cầu, tiểu cầu và huyết tương.",
          },
          {
            title: "Bài học còn có thể mở rộng",
            description:
              "Từ nền tảng này, em có thể tiếp tục tìm hiểu tim, hệ mạch, tuần hoàn máu và các vấn đề sức khỏe liên quan.",
          },
        ],
        actions: [
          { label: "Quay lại trang bài học", path: "/lesson-33" },
          {
            label: "Xem mô hình",
            path: "/lesson-33/explorer",
            variant: "secondary",
          },
        ],
      }}
    />
  );
}
