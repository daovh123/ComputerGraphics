import React from "react";
import type { LessonRouteConfig } from "../../lessons/types";
import BiologicalClock from "./BiologicalClock";
import BodyParts from "./BodyParts";
import Challenge from "./Challenge";
import Characteristics from "./Characteristics";
import Coordination from "./Coordination";
import Overview from "./Overview";
import Shell from "./Shell";
import Summary from "./Summary";

export const lesson30Routes: LessonRouteConfig[] = [
  {
    path: "/lesson-30",
    element: (
      <Shell>
        <Overview />
      </Shell>
    ),
  },
  {
    path: "/lesson-30/body-parts",
    element: (
      <Shell>
        <BodyParts />
      </Shell>
    ),
  },
  {
    path: "/lesson-30/coordination",
    element: (
      <Shell>
        <Coordination />
      </Shell>
    ),
  },
  {
    path: "/lesson-30/biological-clock",
    element: (
      <Shell>
        <BiologicalClock />
      </Shell>
    ),
  },
  {
    path: "/lesson-30/summary",
    element: (
      <Shell>
        <Summary />
      </Shell>
    ),
  },
  {
    path: "/lesson-30/challenge",
    element: (
      <Shell>
        <Challenge />
      </Shell>
    ),
  },
  {
    path: "/lesson-30/characteristics",
    element: (
      <Shell>
        <Characteristics />
      </Shell>
    ),
  },
];
