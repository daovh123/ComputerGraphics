import React from "react";
import type { LessonRouteConfig } from "../../lessons/types";
import Lesson32Diseases from "./Lesson32Diseases";
import Lesson32Explorer from "./Lesson32Explorer";
import Lesson32FoodSafety from "./Lesson32FoodSafety";
import Lesson32Nutrition from "./Lesson32Nutrition";
import Lesson32Overview from "./Lesson32Overview";
import Lesson32Quiz from "./Lesson32Quiz";
import Lesson32Shell from "./Lesson32Shell";
import Lesson32Simulation from "./Lesson32Simulation";

export const lesson32Routes: LessonRouteConfig[] = [
  {
    path: "/lesson-32",
    element: (
      <Lesson32Shell>
        <Lesson32Overview />
      </Lesson32Shell>
    ),
  },
  {
    path: "/lesson-32/explorer",
    element: (
      <Lesson32Shell>
        <Lesson32Explorer />
      </Lesson32Shell>
    ),
  },
  {
    path: "/lesson-32/simulation",
    element: (
      <Lesson32Shell>
        <Lesson32Simulation />
      </Lesson32Shell>
    ),
  },
  {
    path: "/lesson-32/diseases",
    element: (
      <Lesson32Shell>
        <Lesson32Diseases />
      </Lesson32Shell>
    ),
  },
  {
    path: "/lesson-32/nutrition",
    element: (
      <Lesson32Shell>
        <Lesson32Nutrition />
      </Lesson32Shell>
    ),
  },
  {
    path: "/lesson-32/food-safety",
    element: (
      <Lesson32Shell>
        <Lesson32FoodSafety />
      </Lesson32Shell>
    ),
  },
  {
    path: "/lesson-32/quiz",
    element: (
      <Lesson32Shell>
        <Lesson32Quiz />
      </Lesson32Shell>
    ),
  },
];
