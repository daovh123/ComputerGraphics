import React from "react";
import type { LessonRouteConfig } from "../../lessons/types";
import Diseases from "./tabs/Diseases";
import Explorer from "./tabs/Explorer";
import FoodSafety from "./tabs/FoodSafety";
import Nutrition from "./tabs/Nutrition";
import Overview from "./Overview";
import Quiz from "./tabs/Quiz";
import Shell from "./Shell";
import Simulation from "./tabs/Simulation";

export const lesson32Routes: LessonRouteConfig[] = [
  {
    path: "/lesson-32",
    element: (
      <Shell>
        <Overview />
      </Shell>
    ),
  },
  {
    path: "/lesson-32/explorer",
    element: (
      <Shell>
        <Explorer />
      </Shell>
    ),
  },
  {
    path: "/lesson-32/simulation",
    element: (
      <Shell>
        <Simulation />
      </Shell>
    ),
  },
  {
    path: "/lesson-32/diseases",
    element: (
      <Shell>
        <Diseases />
      </Shell>
    ),
  },
  {
    path: "/lesson-32/nutrition",
    element: (
      <Shell>
        <Nutrition />
      </Shell>
    ),
  },
  {
    path: "/lesson-32/food-safety",
    element: (
      <Shell>
        <FoodSafety />
      </Shell>
    ),
  },
  {
    path: "/lesson-32/quiz",
    element: (
      <Shell>
        <Quiz />
      </Shell>
    ),
  },
];
