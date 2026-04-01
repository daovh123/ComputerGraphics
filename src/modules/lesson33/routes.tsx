import React, { Suspense, lazy } from "react";
import { createLessonLearnRoutes } from "../../lessons/learnRoutes";
import type { LessonRouteConfig } from "../../lessons/types";

const Lesson33Blood = lazy(() => import("./Lesson33Blood"));
const Lesson33Diseases = lazy(() => import("./Lesson33Diseases"));
const Lesson33Explorer = lazy(() => import("./Lesson33Explorer"));
const Lesson33LearnPlayer = lazy(() => import("./Lesson33LearnPlayer"));
const Lesson33Overview = lazy(() => import("./Lesson33Overview"));
const Lesson33Quiz = lazy(() => import("./Lesson33Quiz"));
const Lesson33Shell = lazy(() => import("./Lesson33Shell"));
const Lesson33Simulation = lazy(() => import("./Lesson33Simulation"));

function LessonRouteFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center px-6 text-sm font-semibold text-[#475569]">
      Đang tải nội dung bài học...
    </div>
  );
}

function withLessonFallback(element: React.ReactElement) {
  return <Suspense fallback={<LessonRouteFallback />}>{element}</Suspense>;
}

export const lesson33Routes: LessonRouteConfig[] = [
  {
    path: "/lesson-33",
    element: withLessonFallback(
      <Lesson33Shell pathname="/lesson-33">
        <Lesson33Overview />
      </Lesson33Shell>
    ),
  },
  ...createLessonLearnRoutes(
    "/lesson-33",
    "mo-dau",
    withLessonFallback(<Lesson33LearnPlayer />),
  ),
  {
    path: "/lesson-33/explorer",
    element: withLessonFallback(
      <Lesson33Shell pathname="/lesson-33/explorer">
        <Lesson33Explorer />
      </Lesson33Shell>
    ),
  },
  {
    path: "/lesson-33/blood",
    element: withLessonFallback(
      <Lesson33Shell pathname="/lesson-33/blood">
        <Lesson33Blood />
      </Lesson33Shell>
    ),
  },
  {
    path: "/lesson-33/simulation",
    element: withLessonFallback(
      <Lesson33Shell pathname="/lesson-33/simulation">
        <Lesson33Simulation />
      </Lesson33Shell>
    ),
  },
  {
    path: "/lesson-33/diseases",
    element: withLessonFallback(
      <Lesson33Shell pathname="/lesson-33/diseases">
        <Lesson33Diseases />
      </Lesson33Shell>
    ),
  },
  {
    path: "/lesson-33/quiz",
    element: withLessonFallback(
      <Lesson33Shell pathname="/lesson-33/quiz">
        <Lesson33Quiz />
      </Lesson33Shell>
    ),
  },
];
