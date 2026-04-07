import React from "react";
import LessonHeader from "../../components/LessonHeader";
import LessonTabs from "../../components/LessonTabs";
import { LESSON_CARD_BASE } from "../../components/lessonClassNames";
import { lesson32Tabs } from "../../config/lessonCatalog";
import { cn } from "../../lib/utils";

export default function Lesson32Shell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className={cn(LESSON_CARD_BASE, "rounded-3xl p-6 space-y-4")}>
        <LessonHeader title="Bài 32: Dinh dưỡng và tiêu hóa" variant="embedded" />
        <LessonTabs tabs={lesson32Tabs} variant="embedded" />
      </div>
      {children}
    </div>
  );
}
