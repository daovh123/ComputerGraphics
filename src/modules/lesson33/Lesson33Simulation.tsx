import React from "react";
import Simulation from "./tabs/Simulation";
import { type View } from "../../router/views";

type LegacyLesson33SimulationProps = {
  setCurrentView: (view: View) => void;
};

export default function Lesson33Simulation(_: LegacyLesson33SimulationProps) {
  return <Simulation />;
}
