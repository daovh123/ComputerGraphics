import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play, CheckCircle2, ChevronRight, Activity, Layers, ActivitySquare, UserCircle2 } from "lucide-react";
import { lessonOverview } from "../../data/lesson30/overview";

export default function Lesson30Overview() {
  const navigate = useNavigate();
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-white rounded-[40px] p-8 md:p-12 border border-[#E0F0FF] shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-50 rounded-full translate-x-1/3 -translate-y-1/3 group-hover:scale-110 transition-transform duration-700 pointer-events-none"></div>
        <div className="absolute bottom-0 right-20 w-32 h-32 bg-blue-50 rounded-full translate-y-1/2 group-hover:-translate-y-4 transition-transform duration-700 pointer-events-none"></div>

        <div className="flex flex-col md:flex-row gap-12 relative z-10">
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 rounded-full text-cyan-600 font-bold text-sm">
              <UserCircle2 className="w-4 h-4" />
              <span>Cơ thể kì diệu</span>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-black text-[#333] leading-[1.1]">{lessonOverview.title}</h2>
              <p className="text-[#666] text-lg leading-relaxed max-w-xl">
                {lessonOverview.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button 
                onClick={() => navigate("/lesson-30/body-parts")}
                className="bg-[#00BFFF] text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-[#00BFFF]/20 hover:bg-[#009ACD] hover:scale-105 transition-all flex items-center gap-2"
              >
                Khám phá ngay <ChevronRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setActiveVideo("intro")}
                className="bg-white text-[#00BFFF] px-8 py-4 rounded-2xl font-bold text-lg border-2 border-[#E0F0FF] hover:border-[#00BFFF] hover:bg-[#F0F8FF] transition-all flex items-center gap-2"
              >
                <Play className="w-5 h-5" /> Xem video
              </button>
            </div>
          </div>

          {/* Hero Media */}
          <div className="flex-[0.8] relative aspect-square md:aspect-auto">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-blue-500 rounded-[32px] rotate-3 opacity-20 group-hover:rotate-6 transition-transform"></div>
            <div className="absolute inset-0 bg-white rounded-[32px] shadow-2xl p-4 transform -rotate-2 group-hover:rotate-0 transition-transform">
              <div className="w-full h-full bg-[#1a1a1a] rounded-2xl overflow-hidden relative">
                <img
                  src="https://picsum.photos/seed/human/800/800"
                  alt="Human Anatomy"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 pointer-events-none">
                  <div className="text-white space-y-1">
                    <p className="font-bold text-lg">Cấu tạo tổng quát</p>
                    <p className="text-sm text-white/80">Hình ảnh 3D giải phẫu</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30 text-white">
                  <Layers className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Objectives */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[32px] border border-[#E0F0FF] shadow-sm space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#00BFFF] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#00BFFF]/20">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-extrabold text-[#333]">Mục tiêu bài học</h3>
          </div>
          <div className="space-y-4">
            {lessonOverview.objectives.map((obj, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-[#F5F9FF] rounded-2xl border border-[#E0F0FF]">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#00BFFF] font-bold text-sm shrink-0 shadow-sm">
                  {i + 1}
                </div>
                <p className="text-[#666] leading-relaxed font-medium mt-1">{obj}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps / Quick Links */}
        <div className="bg-[#1a1a1a] p-8 rounded-[32px] text-white shadow-2xl space-y-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00BFFF]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-[#00BFFF] backdrop-blur-md border border-white/10">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-extrabold text-white">Bắt đầu học ngay</h3>
          </div>
          
          <div className="space-y-4 relative z-10">
            <button 
              onClick={() => navigate("/lesson-30/body-parts")}
              className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-colors group/btn"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
                  <ActivitySquare className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-white">Cấu tạo cơ thể</p>
                  <p className="text-sm text-white/50">Khám phá các hệ thống cơ quan</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-white/30 group-hover/btn:text-white transition-colors" />
            </button>

            <button 
              onClick={() => navigate("/lesson-30/coordination")}
              className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-colors group/btn"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center text-green-400">
                  <Activity className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-white">Sự phối hợp</p>
                  <p className="text-sm text-white/50">Cơ chế làm việc một khối thống nhất</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-white/30 group-hover/btn:text-white transition-colors" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
