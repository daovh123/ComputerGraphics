import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Activity,
  Layers,
  ChevronRight,
  Play,
  ShieldCheck,
  Shield,
  ClipboardCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { lesson31OverviewData } from "../../data/lesson31/overview";

type QuickLink = {
  id: string;
  title: string;
  description: string;
  route: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
};

export default function Lesson31Overview() {
  const navigate = useNavigate();
  const sections = lesson31OverviewData.sections;
  const firstRoute = sections[0]?.route || "/lesson-31/explorer";

  const quickLinks: QuickLink[] = [
    {
      id: "explorer",
      icon: Layers,
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
      id: "protection",
      icon: Shield,
      iconBg: "bg-emerald-500/20",
      iconColor: "text-emerald-600",
    },
  ]
    .map((item) => {
      const section = sections.find((s) => s.id === item.id);
      if (!section) return null;
      return { ...section, ...item };
    })
    .filter(Boolean) as QuickLink[];

  const journeySections = sections;

  const sectionIconMap: Record<
    string,
    { icon: LucideIcon; color: string; bg: string }
  > = {
    explorer: { icon: Layers, color: "text-blue-600", bg: "bg-blue-50" },
    simulation: { icon: Play, color: "text-amber-600", bg: "bg-amber-50" },
    diseases: { icon: ShieldCheck, color: "text-rose-600", bg: "bg-rose-50" },
    protection: { icon: Shield, color: "text-emerald-600", bg: "bg-emerald-50" },
    quiz: {
      icon: ClipboardCheck,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
  };

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="bg-white rounded-[40px] p-8 md:p-12 border border-[#E0F0FF] shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-[520px] h-[520px] bg-blue-50 rounded-full translate-x-1/3 -translate-y-1/3 group-hover:scale-110 transition-transform duration-700 pointer-events-none"></div>
        <div className="absolute bottom-0 right-16 w-32 h-32 bg-amber-50 rounded-full translate-y-1/2 group-hover:-translate-y-4 transition-transform duration-700 pointer-events-none"></div>

        <div className="flex flex-col md:flex-row gap-12 relative z-10">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full text-blue-700 font-bold text-sm">
              <Activity className="w-4 h-4" />
              <span>Hệ vận động</span>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-black text-[#1f2937] leading-[1.1]">
                {lesson31OverviewData.title}
              </h2>
              <p className="text-[#4A5568] text-lg leading-relaxed max-w-2xl">
                {lesson31OverviewData.introSummary}
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-transparent p-6 rounded-2xl border-l-4 border-blue-500">
              <p className="font-medium text-[#2D3748] text-lg italic">
                "{lesson31OverviewData.heroQuestion}"
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate(firstRoute)}
                className="inline-flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/20"
              >
                Bắt đầu học ngay
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="w-full md:w-[400px] shrink-0">
            <div className="relative aspect-square rounded-[32px] overflow-hidden bg-slate-100/50 shadow-inner group-hover:shadow-2xl transition-all duration-500">
              {/* Optional 3D component preview here */}
              <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                <Layers className="w-24 h-24 opacity-20" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickLinks.map((link) => (
          <Link
            key={link.id}
            to={link.route}
            className="group bg-white rounded-3xl p-6 border border-[#E2E8F0] hover:border-blue-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col gap-4"
          >
            <div className="flex items-start justify-between">
              <div className={`w-14 h-14 ${link.iconBg} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110`}>
                <link.icon className={`w-7 h-7 ${link.iconColor}`} />
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-xl text-[#1f2937] mb-2">{link.title}</h3>
              <p className="text-[#4A5568] line-clamp-2">{link.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Objectives */}
        <div className="lg:col-span-1 border border-[#E2E8F0] shadow-sm bg-white rounded-[32px] p-8 h-fit">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
              <ClipboardCheck className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-black text-[#1f2937]">Mục tiêu bài học</h3>
          </div>
          <ul className="space-y-4">
            {lesson31OverviewData.learningObjectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-4 group">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {i + 1}
                </span>
                <span className="text-[#4A5568] leading-relaxed pt-1 flex-1">
                  {obj}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Full Journey */}
        <div className="lg:col-span-2 bg-white rounded-[32px] p-8 md:p-10 border border-[#E2E8F0] shadow-sm">
          <h3 className="text-2xl font-black text-[#1f2937] mb-8">Lộ trình học tập</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            {journeySections.map((section, index) => {
              const IconData = sectionIconMap[section.id] || sectionIconMap.explorer;
              const Icon = IconData.icon;

              return (
                <Link
                  key={section.id}
                  to={section.route}
                  className="group relative flex gap-5 p-5 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200"
                >
                  <div className={`w-14 h-14 shrink-0 rounded-2xl ${IconData.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-7 h-7 ${IconData.color}`} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-400 mb-1">
                      Phần {index + 1}
                    </div>
                    <h4 className="font-bold text-[#1f2937] text-lg mb-2 group-hover:text-blue-600 transition-colors">
                      {section.title}
                    </h4>
                    <p className="text-[#4A5568] text-sm leading-relaxed">
                      {section.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
