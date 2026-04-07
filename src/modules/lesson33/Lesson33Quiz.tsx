import React from "react";
import Quiz from "./tabs/Quiz";
import { type View } from "../../router/views";

type LegacyLesson33QuizProps = {
  setCurrentView: (view: View) => void;
};

export default function Lesson33Quiz(_: LegacyLesson33QuizProps) {
  return <Quiz />;
}
