import React from "react";
import type { LessonPlayerResolvedStep } from "../../../components/lesson-player/types";
import Lesson33LearnBlood from "../learn/Lesson33LearnBlood";
import Lesson33LearnCover from "../learn/Lesson33LearnCover";
import Lesson33LearnObjectives from "../learn/Lesson33LearnObjectives";

export const lesson33LearnSteps: LessonPlayerResolvedStep[] = [
  {
    id: "mo-dau",
    title: "Máu và dòng chảy sự sống",
    path: "/lesson-33/learn/mo-dau",
    width: "wide",
    content: <Lesson33LearnCover />,
  },
  {
    id: "muc-tieu",
    title: "Điều em sẽ nắm được",
    path: "/lesson-33/learn/muc-tieu",
    width: "wide",
    content: <Lesson33LearnObjectives />,
  },
  {
    id: "thanh-phan-mau",
    title: "Máu gồm những gì?",
    path: "/lesson-33/learn/thanh-phan-mau",
    width: "wide",
    content: <Lesson33LearnBlood />,
  },
];
