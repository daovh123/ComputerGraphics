import React from "react";
import LessonHeader from "../../components/LessonHeader";
import LessonTabs from "../../components/LessonTabs";
import { lesson30Manifest } from "./manifest";

export default function Lesson30Shell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <LessonHeader title="Bài 30: Khái quát về cơ thể người" />
      <LessonTabs tabs={lesson30Manifest.tabs ?? []} />
      {children}
    </div>
  );
}
