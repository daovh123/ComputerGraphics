import React from "react";
import { ShieldCheck, Heart, CircleCheck, Info, Flame } from "lucide-react";
import { lesson31ProtectionData } from "../../data/lesson31/protection";

export default function Lesson31Protection() {
  const data = lesson31ProtectionData;

  return (
    <div className="space-y-8">
      {/* Thể dục thể thao */}
      <section className="bg-white border border-[#E0F0FF] rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
            <Heart className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#1f2937]">
            Ý nghĩa của Tập thể dục, thể thao
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-emerald-700 flex items-center gap-2">
              <Flame className="w-5 h-5" /> Tác dụng mang lại
            </h3>
            <ul className="space-y-3">
              {data.exerciseMeaning.significance.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CircleCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-[#4A5568]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-emerald-700 flex items-center gap-2">
              <Info className="w-5 h-5" /> Gợi ý hoạt động
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.exerciseMeaning.methods.map((method, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#4A5568] font-medium"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sơ cứu */}
      <section className="bg-white border border-[#E0F0FF] rounded-3xl p-6 md:p-8 shadow-sm space-y-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-rose-100 text-rose-600 rounded-xl">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-[#1f2937]">
              Thực hành: Sơ cứu gãy xương
            </h2>
            <p className="text-[#556070] mt-1">Nắm vững các bước sơ cứu thiết yếu để xử lý vết thương ở cẳng tay và cẳng chân.</p>
          </div>
        </div>

        {/* Chuẩn bị dụng cụ */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <h3 className="font-bold text-[#1f2937] mb-3">Dụng cụ cần chuẩn bị:</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {data.firstAid.preparation.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2 text-sm text-[#4A5568]">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0"></div>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Các quy trình sơ cứu */}
        <div className="space-y-8 mt-6">
          {data.firstAid.procedures.map((procedure) => (
            <div key={procedure.id} className="border border-slate-200 rounded-2xl overflow-hidden">
              <div className="bg-slate-50 p-4 border-b border-slate-200">
                <h3 className="text-lg font-bold text-slate-800">{procedure.title}</h3>
              </div>
              <div className="p-6">
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-slate-200">
                  {procedure.steps.map((step, idx) => (
                    <div
                      key={idx}
                      className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-rose-500 text-white shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 font-bold z-10 ms-0 md:ms-0 md:absolute md:left-1/2 -ms-0">
                        {step.stepNumber}
                      </div>

                      <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-100 bg-white shadow-sm group-hover:border-rose-200 transition-colors">
                        <div className="mb-1 text-sm font-bold text-rose-600 uppercase tracking-wider">
                          Bước {step.stepNumber}
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {step.instruction}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
