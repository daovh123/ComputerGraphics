import React from "react";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export interface LessonPlayerCompleteAction {
  label: string;
  path: string;
  variant?: "primary" | "secondary";
}

export interface LessonPlayerCompleteHighlight {
  title: string;
  description: string;
}

interface LessonPlayerCompleteScreenProps {
  title: string;
  description: string;
  highlights: LessonPlayerCompleteHighlight[];
  actions: LessonPlayerCompleteAction[];
}

export default function LessonPlayerCompleteScreen({
  title,
  description,
  highlights,
  actions,
}: LessonPlayerCompleteScreenProps) {
  return (
    <div className="space-y-6">
      <section className="rounded-[32px] border border-[#D9EEFF] bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E8FFF5] text-[#15803D]">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h2 className="mt-5 text-3xl font-black text-[#1F2937]">{title}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-[#4B5563]">{description}</p>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {highlights.map((item) => (
          <div
            key={item.title}
            className="rounded-[28px] border border-[#D9EEFF] bg-white p-6 shadow-sm"
          >
            <h3 className="text-xl font-black text-[#1F2937]">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#4B5563]">
              {item.description}
            </p>
          </div>
        ))}
      </section>

      <section className="flex flex-wrap gap-3">
        {actions.map((action) => (
          <Link
            key={action.path}
            to={action.path}
            className={
              action.variant === "secondary"
                ? "inline-flex rounded-xl border border-[#D7E8FF] bg-white px-4 py-2.5 text-sm font-bold text-[#334155] hover:bg-[#F8FCFF]"
                : "inline-flex rounded-xl bg-[#00BFFF] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#009FD8]"
            }
          >
            {action.label}
          </Link>
        ))}
      </section>
    </div>
  );
}
