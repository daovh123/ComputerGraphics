import React from "react";
import {
  CheckCircle2,
  ChevronRight,
  Layers,
  MessageCircleQuestion,
  UserCircle2,
} from "lucide-react";
import { type View } from "../../router/views";
import Fullscreenable from "../../components/Fullscreenable";
import {
  BODY_LAYERS,
  BODY_PARTS,
  DISCUSSION,
  lessonOverview,
} from "../../data/lesson30/overview";

export default function Lesson30Overview({
  setCurrentView,
}: {
  setCurrentView: (view: View) => void;
}) {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="bg-white rounded-[40px] p-8 md:p-12 border border-[#E0F0FF] shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-50 rounded-full translate-x-1/3 -translate-y-1/3 group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
        <div className="absolute bottom-0 right-20 w-32 h-32 bg-blue-50 rounded-full translate-y-1/2 group-hover:-translate-y-4 transition-transform duration-700 pointer-events-none" />

        <div className="flex flex-col md:flex-row gap-12 relative z-10">
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 rounded-full text-cyan-700 font-bold text-sm">
              <UserCircle2 className="w-4 h-4" />
              <span>Cơ thể người</span>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-black text-[#333] leading-[1.1]">
                {lessonOverview.title}
              </h2>
              <p className="text-[#666] text-lg leading-relaxed max-w-xl">
                {lessonOverview.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setCurrentView("lesson-30-khai-quat")}
                className="bg-[#00BFFF] text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-[#00BFFF]/20 hover:bg-[#009ACD] hover:scale-105 transition-all flex items-center gap-2"
              >
                Bắt đầu: Khái quát <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentView("lesson-30-van-dong")}
                className="bg-white text-[#00BFFF] px-8 py-4 rounded-2xl font-bold text-lg border-2 border-[#E0F0FF] hover:border-[#00BFFF] hover:bg-[#F0F8FF] transition-all flex items-center gap-2"
              >
                Hệ vận động <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-[0.8] relative aspect-square md:aspect-auto">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-blue-500 rounded-[32px] rotate-3 opacity-20 group-hover:rotate-6 transition-transform" />
            <div className="absolute inset-0 bg-white rounded-[32px] shadow-2xl p-4 transform -rotate-2 group-hover:rotate-0 transition-transform">
              <div className="w-full h-full bg-[#1a1a1a] rounded-2xl overflow-hidden relative">
                <Fullscreenable
                  className="w-full h-full bg-slate-900"
                  dataThreeSlot="lesson30-overview-hero"
                />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 pointer-events-none">
                  <div className="text-white space-y-1">
                    <p className="font-bold text-lg">Vùng minh hoạ</p>
                    <p className="text-sm text-white/80">(Bạn gắn model 3D sau)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Objectives + Discussion */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[32px] border border-[#E0F0FF] shadow-sm space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#00BFFF] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#00BFFF]/20">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-extrabold text-[#333]">Mục tiêu</h3>
          </div>
          <div className="space-y-4">
            {lessonOverview.objectives.map((obj, i) => (
              <div
                key={obj}
                className="flex items-start gap-4 p-4 bg-[#F5F9FF] rounded-2xl border border-[#E0F0FF]"
              >
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#00BFFF] font-bold text-sm shrink-0 shadow-sm">
                  {i + 1}
                </div>
                <p className="text-[#666] leading-relaxed font-medium mt-1">
                  {obj}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-[32px] border border-[#E0F0FF] shadow-sm space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#00BFFF] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#00BFFF]/20">
              <MessageCircleQuestion className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-extrabold text-[#333]">Thảo luận</h3>
          </div>

          <div className="p-6 bg-[#1a1a1a] rounded-[28px] text-white border border-black/10">
            <p className="font-black text-xl leading-relaxed">{DISCUSSION.prompt}</p>
            <p className="text-white/80 font-medium mt-4">{DISCUSSION.answer}</p>
          </div>

          <div className="space-y-2">
          </div>
        </div>
      </div>

      {/* Conclusion */}
      <div className="bg-white rounded-[40px] p-8 md:p-12 border border-[#E0F0FF] shadow-sm space-y-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#00BFFF] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#00BFFF]/20">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-[#333]">
              Kết luận
            </h3>
            <p className="text-[#666] font-medium">
              Tổng hợp kiến thức trọng tâm.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-[#666] font-medium">
                Cơ thể người gồm các phần:
              </p>
              <div className="flex flex-wrap gap-2">
                {BODY_PARTS.map((part) => (
                  <span
                    key={part}
                    className="px-4 py-2 rounded-2xl bg-[#F5F9FF] border border-[#E0F0FF] text-[#333] font-bold"
                  >
                    {part}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-[#666] font-medium">
                Cơ thể được bao bọc từ ngoài vào trong bởi:
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {BODY_LAYERS.map((layer, idx) => (
                  <React.Fragment key={layer}>
                    <span className="px-4 py-2 rounded-2xl bg-[#F5F9FF] border border-[#E0F0FF] text-[#333] font-bold">
                      {layer}
                    </span>
                    {idx !== BODY_LAYERS.length - 1 && (
                      <span className="text-[#999] font-black">→</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <button
              onClick={() => setCurrentView("lesson-30-khai-quat")}
              className="bg-[#00BFFF] text-white px-7 py-4 rounded-2xl font-bold text-base shadow-xl shadow-[#00BFFF]/20 hover:bg-[#009ACD] hover:scale-[1.02] transition-all inline-flex items-center gap-2"
            >
              Tiếp theo: Khái quát <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="bg-white rounded-[32px] border border-[#E0F0FF] shadow-sm p-4">
            <Fullscreenable
              className="w-full aspect-[16/10] rounded-2xl border border-[#E0F0FF] bg-[#F5F9FF]"
              dataThreeSlot="lesson30-overview-body"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
