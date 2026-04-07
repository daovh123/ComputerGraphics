import React from "react";
import Diseases from "./tabs/Diseases";
import { type View } from "../../router/views";

type LegacyLesson33DiseasesProps = {
  setCurrentView: (view: View) => void;
};

export default function Lesson33Diseases(_: LegacyLesson33DiseasesProps) {
  return <Diseases />;
}
