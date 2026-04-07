import React from "react";
import Overview from "./Overview";
import { type View } from "../../router/views";

type LegacyLesson33OverviewProps = {
  setCurrentView: (view: View) => void;
};

export default function Lesson33Overview(_: LegacyLesson33OverviewProps) {
  return <Overview />;
}
