import React from "react";
import { Navigate } from "react-router-dom";
import type { LessonRouteConfig } from "./types";

export function createLessonLearnRoutes(
  basePath: string,
  firstStepId: string,
  element: React.ReactElement,
): LessonRouteConfig[] {
  return [
    {
      path: `${basePath}/learn`,
      element: <Navigate to={`${basePath}/learn/${firstStepId}`} replace />,
      chrome: "lesson",
    },
    {
      path: `${basePath}/learn/:stepId`,
      element,
      chrome: "lesson",
    },
  ];
}

export function createLessonStepPath(basePath: string, stepId: string) {
  return `${basePath}/learn/${stepId}`;
}
