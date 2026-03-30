import React from "react";
import type { LessonRouteConfig } from "../../lessons/types";
import Lesson30BiologicalClock from "./Lesson30BiologicalClock";
import Lesson30BodyParts from "./Lesson30BodyParts";
import Lesson30Challenge from "./Lesson30Challenge";
import Lesson30Characteristics from "./Lesson30Characteristics";
import Lesson30Coordination from "./Lesson30Coordination";
import Lesson30Overview from "./Lesson30Overview";
import Lesson30Shell from "./Lesson30Shell";
import Lesson30Summary from "./Lesson30Summary";

export const lesson30Routes: LessonRouteConfig[] = [
  {
    path: "/lesson-30",
    element: (
      <Lesson30Shell>
        <Lesson30Overview />
      </Lesson30Shell>
    ),
  },
  {
    path: "/lesson-30/body-parts",
    element: (
      <Lesson30Shell>
        <Lesson30BodyParts />
      </Lesson30Shell>
    ),
  },
  {
    path: "/lesson-30/coordination",
    element: (
      <Lesson30Shell>
        <Lesson30Coordination />
      </Lesson30Shell>
    ),
  },
  {
    path: "/lesson-30/biological-clock",
    element: (
      <Lesson30Shell>
        <Lesson30BiologicalClock />
      </Lesson30Shell>
    ),
  },
  {
    path: "/lesson-30/summary",
    element: (
      <Lesson30Shell>
        <Lesson30Summary />
      </Lesson30Shell>
    ),
  },
  {
    path: "/lesson-30/challenge",
    element: (
      <Lesson30Shell>
        <Lesson30Challenge />
      </Lesson30Shell>
    ),
  },
  {
    path: "/lesson-30/characteristics",
    element: (
      <Lesson30Shell>
        <Lesson30Characteristics />
      </Lesson30Shell>
    ),
  },
];
