import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronRight,
  Leaf,
  ShieldCheck,
  UtensilsCrossed,
  Workflow,
  Play,
  Layers,
  Shield,
  ClipboardCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { lesson32OverviewData } from "../../data/lesson32/overview";

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
  const navigate = useNavigate();
  const sections = lesson32OverviewData.sections;
  const firstRoute = sections[0]?.route || "/lesson-32/explorer";

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
    nutrition: { icon: Leaf, color: "text-emerald-600", bg: "bg-emerald-50" },
    "food-safety": { icon: Shield, color: "text-cyan-700", bg: "bg-cyan-50" },
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
        <div className="absolute top-0 right-0 w-[520px] h-[520px] bg-amber-50 rounded-full translate-x-1/3 -translate-y-1/3 group-hover:scale-110 transition-transform duration-700 pointer-events-none"></div>
        <div className="absolute bottom-0 right-16 w-32 h-32 bg-emerald-50 rounded-full translate-y-1/2 group-hover:-translate-y-4 transition-transform duration-700 pointer-events-none"></div>

        <div className="flex flex-col md:flex-row gap-12 relative z-10">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full text-amber-700 font-bold text-sm">
              <UtensilsCrossed className="w-4 h-4" />
              <span>Hệ tiêu hóa</span>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-black text-[#1f2937] leading-[1.1]">
                {lesson32OverviewData.title}
              </h2>
              <p className="text-[#4A5568] text-lg leading-relaxed max-w-2xl">
                {lesson32OverviewData.introSummary}
              </p>
            </div>

            <div className="rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] px-5 py-4 text-[#166534] font-semibold max-w-2xl">
              {lesson32OverviewData.heroQuestion}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate(firstRoute)}
                className="bg-[#00BFFF] text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-[#00BFFF]/20 hover:bg-[#009ACD] hover:scale-105 transition-all flex items-center gap-2"
              >
                Khám phá ngay <ChevronRight className="w-5 h-5" />
              </button>
              <Link
                to="/lesson-32/quiz"
                className="bg-white text-[#00BFFF] px-8 py-4 rounded-2xl font-bold text-lg border-2 border-[#E0F0FF] hover:border-[#00BFFF] hover:bg-[#F0F8FF] transition-all flex items-center gap-2"
              >
                Luyện tập nhanh
              </Link>
            </div>
          </div>

          <div className="flex-[0.8] relative aspect-square md:aspect-auto">
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500 to-emerald-500 rounded-[32px] rotate-3 opacity-20 group-hover:rotate-6 transition-transform"></div>
            <div className="absolute inset-0 bg-white rounded-[32px] shadow-2xl p-4 transform -rotate-2 group-hover:rotate-0 transition-transform">
              <div className="w-full h-full bg-[#0f172a] rounded-2xl overflow-hidden relative">
                <iframe
                  title="Mô hình hệ tiêu hóa 3D"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; fullscreen"
                  src="https://sketchfab.com/models/8c4c69035f4f4773813533d7ca56e516/embed?autostart=1&preload=1&ui_theme=dark&dnt=1"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 pointer-events-none">
                  <div className="text-white space-y-1">
                    <p className="font-bold text-lg">Mô hình hệ tiêu hóa 3D</p>
                    <p className="text-sm text-white/80">Xem đường đi và cơ quan chính</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30 text-white">
                  <ShieldCheck className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Objectives + Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[32px] border border-[#E0F0FF] shadow-sm space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#00BFFF] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#00BFFF]/20">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-extrabold text-[#1f2937]">Mục tiêu bài học</h3>
          </div>
          <div className="space-y-4">
            {lesson32OverviewData.learningObjectives.map((obj, i) => (
              <div
                key={obj}
                className="flex items-start gap-4 p-4 bg-[#F5F9FF] rounded-2xl border border-[#E0F0FF]"
              >
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#00BFFF] font-bold text-sm shrink-0 shadow-sm">
                  {i + 1}
                </div>
                <p className="text-[#4A5568] leading-relaxed font-medium mt-1">{obj}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0f172a] p-8 rounded-[32px] text-white shadow-2xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00BFFF]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-[#00BFFF] backdrop-blur-md border border-white/10">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-extrabold text-white">Bắt đầu học nhanh</h3>
          </div>

          <div className="space-y-4 relative z-10">
            {quickLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.route)}
                className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.iconBg}`}>
                    <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-white">{item.title}</p>
                    <p className="text-sm text-white/60">{item.description}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sections grid */}
      <div className="bg-white border border-[#E0F0FF] rounded-3xl p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F0F8FF] text-[#00BFFF] flex items-center justify-center font-bold">
            {journeySections.length}
          </div>
          <h3 className="text-2xl font-extrabold text-[#1f2937]">Các phần chính của bài học</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {lesson32OverviewData.sections.map((section) => (
            <article
              key={section.id}
              className="p-4 rounded-2xl bg-white border border-[#DDF0FF] hover:border-[#00BFFF] transition-colors shadow-[0_8px_30px_rgba(0,0,0,0.03)]"
            >
              <div className="flex items-center gap-2">
                {sectionIconMap[section.id] ? (
                  <span
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${sectionIconMap[section.id].bg}`}
                  >
                    {(() => {
                      const IconComp = sectionIconMap[section.id].icon;
                      return (
                        <IconComp
                          className={`w-5 h-5 ${sectionIconMap[section.id].color}`}
                        />
                      );
                    })()}
                  </span>
                ) : null}
                <p className="font-bold text-[#1e293b]">{section.title}</p>
              </div>
              <p className="text-sm text-[#64748b] mt-1">{section.description}</p>
              <Link
                to={section.route}
                className="inline-flex mt-3 text-sm font-bold text-[#00BFFF] hover:underline items-center gap-1"
              >
                Đi tới phần học <ChevronRight className="w-4 h-4" />
              </Link>
            </article>
          ))}
        </div>
      </div>

      {/* Learning path */}
      <div className="bg-white border border-[#E0F0FF] rounded-3xl p-8 shadow-sm space-y-4">
        <h3 className="text-2xl font-extrabold text-[#1f2937]">Lộ trình học gợi ý</h3>
        <ol className="space-y-3">
          {journeySections.map((section, index) => (
            <li
              key={`flow-${section.id}`}
              className="flex items-start gap-3 p-4 rounded-xl bg-[#F7FBFF] border border-[#EAF5FF]"
            >
              <span className="w-8 h-8 rounded-full bg-[#00BFFF] text-white text-sm font-bold flex items-center justify-center shrink-0">
                {index + 1}
              </span>
              <div className="min-w-0">
                <p className="font-semibold text-[#1f2937]">{section.title}</p>
                <p className="text-sm text-[#64748b]">{section.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
