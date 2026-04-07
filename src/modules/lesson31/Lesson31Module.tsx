import React from "react";
import Lesson31Overview from "./Lesson31Overview";
import type { Lesson31Tab } from "../../data/lesson31";

interface Lesson31ModuleProps {
  initialTab?: Lesson31Tab;
}

export default function Lesson31Module({ initialTab }: Lesson31ModuleProps) {
  return <Lesson31Overview initialTab={initialTab} />;
}
