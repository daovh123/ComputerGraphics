import React from "react";
import { lesson32DigestionSteps } from "../../features/lesson32/data/digestionSteps";

export default function Lesson32Simulation() {
  return (
    <div className="bg-white border border-[#E0F0FF] rounded-3xl p-8 shadow-sm space-y-6">
      <h2 className="text-2xl font-extrabold text-[#333]">
        Simulation hành trình tiêu hóa
      </h2>
      <p className="text-[#5B6470] text-sm leading-relaxed">
        Theo dõi các bước tiêu hóa cơ bản theo đúng thứ tự để hiểu rõ biến đổi
        chính của thức ăn.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {lesson32DigestionSteps.map((step) => (
          <div
            key={step.id}
            className="p-5 rounded-2xl bg-[#F7FBFF] border border-[#EAF5FF] space-y-3"
          >
            <h3 className="font-extrabold text-[#334155]">
              {step.order}. {step.title}
            </h3>
            <p className="text-sm text-[#556070] leading-relaxed">
              {step.whatHappens}
            </p>
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              <span className="px-2 py-1 rounded-md bg-[#e0f2fe] text-[#0369a1]">
                Cơ học: {step.mechanical}
              </span>
              <span className="px-2 py-1 rounded-md bg-[#fef3c7] text-[#92400e]">
                Hóa học: {step.chemical}
              </span>
              <span className="px-2 py-1 rounded-md bg-[#dcfce7] text-[#166534]">
                Hấp thu: {step.absorption}
              </span>
            </div>
            {step.supportingOrgans.length > 0 && (
              <p className="text-xs text-[#64748b]">
                Cơ quan hỗ trợ: {step.supportingOrgans.join(", ")}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
