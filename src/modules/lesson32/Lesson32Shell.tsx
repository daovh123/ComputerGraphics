import React from "react";
import LessonHeader from "../../components/LessonHeader";
import LessonTabs from "../../components/LessonTabs";
import { lesson32Manifest } from "./manifest";

export default function Lesson32Shell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <LessonHeader title="Bài 32: Dinh dưỡng và tiêu hóa" />
      <LessonTabs tabs={lesson32Manifest.tabs ?? []} />
      {children}
    </div>
  );
}
