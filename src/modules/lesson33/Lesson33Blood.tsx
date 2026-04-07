import React from "react";
import Blood from "./tabs/Blood";
import { type View } from "../../router/views";

type LegacyLesson33BloodProps = {
  setCurrentView: (view: View) => void;
};

export default function Lesson33Blood(_: LegacyLesson33BloodProps) {
  return <Blood />;
}
