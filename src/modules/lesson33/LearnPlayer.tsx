import React from "react";
import LessonPlayer from "../../components/LessonPlayer";
import { lesson33LearnConfig } from "./data/learnConfig";

export default function LearnPlayer() {
  return <LessonPlayer {...lesson33LearnConfig} />;
}
