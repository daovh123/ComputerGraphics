import React from "react";
import { Activity, CheckCircle2, Droplet, Layers, Play } from "lucide-react";
import LessonDetailPage from "../../components/LessonDetailPage";
import { lessonOverview } from "../../data/lesson33/overview";

export default function Lesson33Overview() {
  return (
    <LessonDetailPage
      badge={{
        label: "Dòng chảy sự sống",
        icon: Droplet,
        className: "inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full text-red-600 font-bold text-sm",
      }}
      title={lessonOverview.title}
      summary={lessonOverview.description}
      primaryAction={{ label: "Khám phá ngay", path: "/lesson-33/explorer" }}
      secondaryAction={{
        label: "Tìm hiểu về máu",
        path: "/lesson-33/blood",
        icon: Play,
        variant: "secondary",
      }}
      media={{
        title: "Mạng lưới tuần hoàn 3D",
        description: "Interactive Complete System",
        src: "https://sketchfab.com/models/e07b484471f04c87a9dcbfe8df51ff44/embed?autostart=1&ui_theme=dark&dnt=1",
        icon: Activity,
        accentClassName: "bg-gradient-to-tr from-red-500 to-blue-500",
      }}
      objectives={lessonOverview.objectives}
      objectivesIcon={CheckCircle2}
      quickActionsTitle="Bắt đầu học ngay"
      quickActionsIcon={Layers}
      quickActions={lessonOverview.quickActions}
    />
  );
}
