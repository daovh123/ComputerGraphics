import React from "react";
import type { LessonLearnConfig } from "../../../components/lesson-player/types";
import { createLessonStepPath } from "../../../lessons/learnRoutes";
import Lesson33LearnBlood from "../learn/Lesson33LearnBlood";
import Lesson33LearnCover from "../learn/Lesson33LearnCover";
import Lesson33LearnObjectives from "../learn/Lesson33LearnObjectives";
import { preloadAngiologyModel } from "../learn/AngiologyViewer";

const lesson33BasePath = "/lesson-33";

export const lesson33LearnConfig: LessonLearnConfig = {
  lessonTitle: "Bài 33",
  exitPath: lesson33BasePath,
  preload: preloadAngiologyModel,
  steps: [
    {
      id: "mo-dau",
      title: "Máu và dòng chảy sự sống",
      path: createLessonStepPath(lesson33BasePath, "mo-dau"),
      width: "wide",
      content: <Lesson33LearnCover />,
    },
    {
      id: "muc-tieu",
      title: "Điều em sẽ nắm được",
      path: createLessonStepPath(lesson33BasePath, "muc-tieu"),
      width: "wide",
      content: <Lesson33LearnObjectives />,
    },
    {
      id: "thanh-phan-mau",
      title: "Máu gồm những gì?",
      path: createLessonStepPath(lesson33BasePath, "thanh-phan-mau"),
      width: "wide",
      content: <Lesson33LearnBlood />,
    },
  ],
  completion: {
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
      { label: "Quay lại trang bài học", path: lesson33BasePath },
      {
        label: "Xem mô hình",
        path: `${lesson33BasePath}/explorer`,
        variant: "secondary",
      },
    ],
  },
};
