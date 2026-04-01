import React, { Suspense, lazy } from "react";
import { createLessonLearnRoutes } from "../../lessons/learnRoutes";
import type { LessonRouteConfig } from "../../lessons/types";

const Blood = lazy(() => import("./tabs/Blood"));
const Diseases = lazy(() => import("./tabs/Diseases"));
const Explorer = lazy(() => import("./tabs/Explorer"));
const LearnPlayer = lazy(() => import("./LearnPlayer"));
const Overview = lazy(() => import("./Overview"));
const Quiz = lazy(() => import("./tabs/Quiz"));
const Shell = lazy(() => import("./Shell"));
const Simulation = lazy(() => import("./tabs/Simulation"));

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
      <Shell pathname="/lesson-33">
        <Overview />
      </Shell>
    ),
  },
  ...createLessonLearnRoutes(
    "/lesson-33",
    "mo-dau",
    withLessonFallback(<LearnPlayer />),
  ),
  {
    path: "/lesson-33/explorer",
    element: withLessonFallback(
      <Shell pathname="/lesson-33/explorer">
        <Explorer />
      </Shell>
    ),
  },
  {
    path: "/lesson-33/blood",
    element: withLessonFallback(
      <Shell pathname="/lesson-33/blood">
        <Blood />
      </Shell>
    ),
  },
  {
    path: "/lesson-33/simulation",
    element: withLessonFallback(
      <Shell pathname="/lesson-33/simulation">
        <Simulation />
      </Shell>
    ),
  },
  {
    path: "/lesson-33/diseases",
    element: withLessonFallback(
      <Shell pathname="/lesson-33/diseases">
        <Diseases />
      </Shell>
    ),
  },
  {
    path: "/lesson-33/quiz",
    element: withLessonFallback(
      <Shell pathname="/lesson-33/quiz">
        <Quiz />
      </Shell>
    ),
  },
];
