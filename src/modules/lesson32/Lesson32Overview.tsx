import React from "react";
import {
  ClipboardCheck,
  Layers,
  Leaf,
  Play,
  Shield,
  ShieldCheck,
  UtensilsCrossed,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import LessonDetailPage from "../../components/LessonDetailPage";
import { lesson32OverviewData } from "./data/overview";

type QuickLink = {
  id: string;
  title: string;
  description: string;
  route: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
};

export default function Lesson32Overview() {
  const sections = lesson32OverviewData.sections;

  const quickLinks: QuickLink[] = [
    {
      id: "explorer",
      icon: Workflow,
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-600",
    },
    {
      id: "simulation",
      icon: Play,
      iconBg: "bg-amber-500/20",
      iconColor: "text-amber-600",
    },
    {
      id: "food-safety",
      icon: ShieldCheck,
      iconBg: "bg-emerald-500/20",
      iconColor: "text-emerald-600",
    },
  ]
    .map((item) => {
      const section = sections.find((candidate) => candidate.id === item.id);
      if (!section) return null;
      return { ...section, ...item };
    })
    .filter(Boolean) as QuickLink[];

  const sectionIconMap: Record<string, { icon: LucideIcon; color: string; bg: string }> = {
    explorer: { icon: Layers, color: "text-blue-600", bg: "bg-blue-50" },
    simulation: { icon: Play, color: "text-amber-600", bg: "bg-amber-50" },
    diseases: { icon: ShieldCheck, color: "text-rose-600", bg: "bg-rose-50" },
    nutrition: { icon: Leaf, color: "text-emerald-600", bg: "bg-emerald-50" },
    "food-safety": { icon: Shield, color: "text-cyan-700", bg: "bg-cyan-50" },
    quiz: { icon: ClipboardCheck, color: "text-indigo-600", bg: "bg-indigo-50" },
  };

  return (
    <LessonDetailPage
      badge={{
        label: "Hệ tiêu hóa",
        icon: UtensilsCrossed,
        className: "inline-flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full text-amber-700 font-bold text-sm",
      }}
      title={lesson32OverviewData.title}
      summary={lesson32OverviewData.introSummary}
      heroQuestion={lesson32OverviewData.heroQuestion}
      primaryAction={{
        label: "Khám phá ngay",
        path: sections[0]?.route || "/lesson-32/explorer",
      }}
      secondaryAction={{
        label: "Luyện tập nhanh",
        path: "/lesson-32/quiz",
        variant: "secondary",
      }}
      media={{
        title: "Mô hình hệ tiêu hóa 3D",
        description: "Xem đường đi và cơ quan chính",
        src: "https://sketchfab.com/models/8c4c69035f4f4773813533d7ca56e516/embed?autostart=1&preload=1&ui_theme=dark&dnt=1",
        icon: ShieldCheck,
        accentClassName: "bg-gradient-to-tr from-amber-500 to-emerald-500",
      }}
      objectives={lesson32OverviewData.learningObjectives}
      objectivesIcon={Leaf}
      quickActionsTitle="Bắt đầu học nhanh"
      quickActionsIcon={ShieldCheck}
      quickActions={quickLinks.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        path: item.route,
        icon: item.icon,
        iconBgClassName: item.iconBg,
        iconClassName: item.iconColor,
      }))}
      sectionsTitle="Các phần chính của bài học"
      sections={sections.map((section) => ({
        id: section.id,
        title: section.title,
        description: section.description,
        icon: sectionIconMap[section.id]?.icon,
        iconBgClassName: sectionIconMap[section.id]?.bg,
        iconClassName: sectionIconMap[section.id]?.color,
      }))}
    />
  );
}
