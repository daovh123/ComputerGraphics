import React from "react";
import { Navigate } from "react-router-dom";
import type { LessonRouteConfig } from "../../lessons/types";
import Lesson33Blood from "./Lesson33Blood";
import Lesson33Diseases from "./Lesson33Diseases";
import Lesson33Explorer from "./Lesson33Explorer";
import Lesson33LearnPlayer from "./Lesson33LearnPlayer";
import Lesson33Overview from "./Lesson33Overview";
import Lesson33Quiz from "./Lesson33Quiz";
import Lesson33Shell from "./Lesson33Shell";
import Lesson33Simulation from "./Lesson33Simulation";

export const lesson33Routes: LessonRouteConfig[] = [
  {
    path: "/lesson-33",
    element: (
      <Lesson33Shell pathname="/lesson-33">
        <Lesson33Overview />
      </Lesson33Shell>
    ),
  },
  {
    path: "/lesson-33/learn",
    element: <Navigate to="/lesson-33/learn/mo-dau" replace />,
  },
  {
    path: "/lesson-33/learn/:stepId",
    element: <Lesson33LearnPlayer />,
  },
  {
    path: "/lesson-33/explorer",
    element: (
      <Lesson33Shell pathname="/lesson-33/explorer">
        <Lesson33Explorer />
      </Lesson33Shell>
    ),
  },
  {
    path: "/lesson-33/blood",
    element: (
      <Lesson33Shell pathname="/lesson-33/blood">
        <Lesson33Blood />
      </Lesson33Shell>
    ),
  },
  {
    path: "/lesson-33/simulation",
    element: (
      <Lesson33Shell pathname="/lesson-33/simulation">
        <Lesson33Simulation />
      </Lesson33Shell>
    ),
  },
  {
    path: "/lesson-33/diseases",
    element: (
      <Lesson33Shell pathname="/lesson-33/diseases">
        <Lesson33Diseases />
      </Lesson33Shell>
    ),
  },
  {
    path: "/lesson-33/quiz",
    element: (
      <Lesson33Shell pathname="/lesson-33/quiz">
        <Lesson33Quiz />
      </Lesson33Shell>
    ),
  },
];
