import React from "react";
import LessonPlayer from "../../components/LessonPlayer";
import { lesson33LearnConfig } from "./data/learnConfig";

export default function Lesson33LearnPlayer() {
  return <LessonPlayer {...lesson33LearnConfig} />;
}
