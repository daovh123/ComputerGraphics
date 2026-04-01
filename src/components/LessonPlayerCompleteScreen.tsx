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
    <div className="space-y-10">
      <section className="py-8 text-center md:py-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E8FFF5] text-[#15803D]">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h2 className="mt-5 text-3xl font-black text-[#1F2937]">{title}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-[#4B5563]">{description}</p>
      </section>

      <section className="grid gap-8 md:grid-cols-3">
        {highlights.map((item) => (
          <div key={item.title} className="border-l-2 border-[#7DD3FC] pl-5">
            <h3 className="text-xl font-black text-[#1F2937]">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#4B5563]">
              {item.description}
            </p>
          </div>
        ))}
      </section>

      <section className="flex flex-wrap justify-center gap-3 pt-4">
        {actions.map((action) => (
          <Link
            key={action.path}
            to={action.path}
            className={
              action.variant === "secondary"
                ? "inline-flex rounded-full border border-[#D7E8FF] bg-white px-5 py-2.5 text-sm font-bold text-[#334155] hover:bg-[#F8FCFF]"
                : "inline-flex rounded-full bg-[#00BFFF] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#009FD8]"
            }
          >
            {action.label}
          </Link>
        ))}
      </section>
    </div>
  );
}
