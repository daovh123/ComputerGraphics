import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, type LucideIcon } from "lucide-react";

type ActionVariant = "primary" | "secondary";
type PanelTheme = "light" | "dark";

export interface LessonDetailAction {
  label: string;
  path: string;
  icon?: LucideIcon;
  variant?: ActionVariant;
}

export interface LessonDetailBadge {
  label: string;
  icon: LucideIcon;
  className: string;
}

export interface LessonDetailMedia {
  title: string;
  description: string;
  src: string;
  icon: LucideIcon;
  accentClassName: string;
  frameClassName?: string;
}

export interface LessonDetailQuickAction {
  id: string;
  title: string;
  description: string;
  path: string;
  icon: LucideIcon;
  iconBgClassName: string;
  iconClassName: string;
}

export interface LessonDetailSection {
  id: string;
  title: string;
  description: string;
  icon?: LucideIcon;
  iconBgClassName?: string;
  iconClassName?: string;
}

interface LessonDetailPageProps {
  badge: LessonDetailBadge;
  title: string;
  summary: string;
  heroQuestion?: string;
  primaryAction: LessonDetailAction;
  secondaryAction?: LessonDetailAction;
  media: LessonDetailMedia;
  objectives: string[];
  objectivesIcon: LucideIcon;
  objectivesTitle?: string;
  quickActionsTitle: string;
  quickActionsIcon: LucideIcon;
  quickActionsTheme?: PanelTheme;
  quickActions: LessonDetailQuickAction[];
  sectionsTitle?: string;
  sections?: LessonDetailSection[];
}

function renderAction(
  action: LessonDetailAction,
  navigate: ReturnType<typeof useNavigate>,
) {
  const Icon = action.icon;
  const isPrimary = (action.variant ?? "primary") === "primary";

  if (isPrimary) {
    return (
      <button
        onClick={() => navigate(action.path)}
        className="bg-[#00BFFF] text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-[#00BFFF]/20 hover:bg-[#009ACD] hover:scale-105 transition-all flex items-center gap-2"
      >
        {action.label}
        {Icon ? <Icon className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
      </button>
    );
  }

  return (
    <Link
      to={action.path}
      className="bg-white text-[#00BFFF] px-8 py-4 rounded-2xl font-bold text-lg border-2 border-[#E0F0FF] hover:border-[#00BFFF] hover:bg-[#F0F8FF] transition-all flex items-center gap-2"
    >
      {Icon ? <Icon className="w-5 h-5" /> : null}
      {action.label}
    </Link>
  );
}

export default function LessonDetailPage({
  badge,
  title,
  summary,
  heroQuestion,
  primaryAction,
  secondaryAction,
  media,
  objectives,
  objectivesIcon: ObjectivesIcon,
  objectivesTitle = "Mục tiêu bài học",
  quickActionsTitle,
  quickActionsIcon: QuickActionsIcon,
  quickActionsTheme = "dark",
  quickActions,
  sectionsTitle,
  sections = [],
}: LessonDetailPageProps) {
  const navigate = useNavigate();
  const BadgeIcon = badge.icon;
  const MediaIcon = media.icon;

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-[40px] p-8 md:p-12 border border-[#E0F0FF] shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-[520px] h-[520px] bg-amber-50 rounded-full translate-x-1/3 -translate-y-1/3 group-hover:scale-110 transition-transform duration-700 pointer-events-none"></div>
        <div className="absolute bottom-0 right-16 w-32 h-32 bg-emerald-50 rounded-full translate-y-1/2 group-hover:-translate-y-4 transition-transform duration-700 pointer-events-none"></div>

        <div className="flex flex-col md:flex-row gap-12 relative z-10">
          <div className="flex-1 space-y-6">
            <div className={badge.className}>
              <BadgeIcon className="w-4 h-4" />
              <span>{badge.label}</span>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-black text-[#1f2937] leading-[1.1]">
                {title}
              </h2>
              <p className="text-[#4A5568] text-lg leading-relaxed max-w-2xl">
                {summary}
              </p>
            </div>

            {heroQuestion ? (
              <div className="rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] px-5 py-4 text-[#166534] font-semibold max-w-2xl">
                {heroQuestion}
              </div>
            ) : null}

            <div className="flex flex-wrap items-center gap-4">
              {renderAction(primaryAction, navigate)}
              {secondaryAction ? renderAction(secondaryAction, navigate) : null}
            </div>
          </div>

          <div className="flex-[0.8] relative aspect-square md:aspect-auto">
            <div
              className={`absolute inset-0 rounded-[32px] rotate-3 opacity-20 group-hover:rotate-6 transition-transform ${media.accentClassName}`}
            ></div>
            <div
              className={`absolute inset-0 bg-white rounded-[32px] shadow-2xl p-4 transform -rotate-2 group-hover:rotate-0 transition-transform ${media.frameClassName ?? ""}`}
            >
              <div className="w-full h-full bg-[#0f172a] rounded-2xl overflow-hidden relative">
                <iframe
                  title={media.title}
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; fullscreen"
                  src={media.src}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 pointer-events-none">
                  <div className="text-white space-y-1">
                    <p className="font-bold text-lg">{media.title}</p>
                    <p className="text-sm text-white/80">{media.description}</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30 text-white">
                  <MediaIcon className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[32px] border border-[#E0F0FF] shadow-sm space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#00BFFF] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#00BFFF]/20">
              <ObjectivesIcon className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-extrabold text-[#1f2937]">{objectivesTitle}</h3>
          </div>
          <div className="space-y-4">
            {objectives.map((objective, index) => (
              <div
                key={objective}
                className="flex items-start gap-4 p-4 bg-[#F5F9FF] rounded-2xl border border-[#E0F0FF]"
              >
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#00BFFF] font-bold text-sm shrink-0 shadow-sm">
                  {index + 1}
                </div>
                <p className="text-[#4A5568] leading-relaxed font-medium mt-1">{objective}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          className={
            quickActionsTheme === "dark"
              ? "bg-[#0f172a] p-8 rounded-[32px] text-white shadow-2xl space-y-6 relative overflow-hidden"
              : "bg-white p-8 rounded-[32px] border border-[#E0F0FF] shadow-sm space-y-6 relative overflow-hidden"
          }
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00BFFF]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="flex items-center gap-4 relative z-10">
            <div
              className={
                quickActionsTheme === "dark"
                  ? "w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-[#00BFFF] backdrop-blur-md border border-white/10"
                  : "w-12 h-12 bg-[#F0F8FF] rounded-2xl flex items-center justify-center text-[#00BFFF] border border-[#E0F0FF]"
              }
            >
              <QuickActionsIcon className="w-6 h-6" />
            </div>
            <h3
              className={
                quickActionsTheme === "dark"
                  ? "text-2xl font-extrabold text-white"
                  : "text-2xl font-extrabold text-[#1f2937]"
              }
            >
              {quickActionsTitle}
            </h3>
          </div>

          <div className="space-y-4 relative z-10">
            {quickActions.map((action) => {
              const ActionIcon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={() => navigate(action.path)}
                  className={
                    quickActionsTheme === "dark"
                      ? "w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-colors group"
                      : "w-full flex items-center justify-between p-4 bg-[#F8FBFF] hover:bg-[#F0F8FF] rounded-2xl border border-[#E0F0FF] transition-colors group"
                  }
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${action.iconBgClassName}`}
                    >
                      <ActionIcon className={`w-5 h-5 ${action.iconClassName}`} />
                    </div>
                    <div className="text-left">
                      <p className={quickActionsTheme === "dark" ? "font-bold text-white" : "font-bold text-[#1f2937]"}>
                        {action.title}
                      </p>
                      <p
                        className={
                          quickActionsTheme === "dark"
                            ? "text-sm text-white/60"
                            : "text-sm text-[#64748b]"
                        }
                      >
                        {action.description}
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    className={
                      quickActionsTheme === "dark"
                        ? "w-5 h-5 text-white/40 group-hover:text-white transition-colors"
                        : "w-5 h-5 text-[#94a3b8] group-hover:text-[#00BFFF] transition-colors"
                    }
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {sectionsTitle && sections.length > 0 ? (
        <div className="bg-white border border-[#E0F0FF] rounded-3xl p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0F8FF] text-[#00BFFF] flex items-center justify-center font-bold">
              {sections.length}
            </div>
            <h3 className="text-2xl font-extrabold text-[#1f2937]">{sectionsTitle}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {sections.map((section) => {
              const SectionIcon = section.icon;
              return (
                <article
                  key={section.id}
                  className="p-4 rounded-2xl bg-white border border-[#DDF0FF] hover:border-[#00BFFF] transition-colors shadow-[0_8px_30px_rgba(0,0,0,0.03)]"
                >
                  <div className="flex items-center gap-2">
                    {SectionIcon ? (
                      <span
                        className={`w-9 h-9 rounded-xl flex items-center justify-center ${section.iconBgClassName ?? "bg-[#F0F8FF]"}`}
                      >
                        <SectionIcon className={`w-5 h-5 ${section.iconClassName ?? "text-[#00BFFF]"}`} />
                      </span>
                    ) : null}
                    <h4 className="font-bold text-[#1f2937]">{section.title}</h4>
                  </div>
                  <p className="text-[#475569] text-sm leading-relaxed mt-3">{section.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
