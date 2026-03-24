import React, { useState } from "react";
import { Activity, Heart, Wind, Droplets, User, ChevronRight, Info, Star, Play, ChevronLeft, CheckCircle2, XCircle, RotateCcw, Layers } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";

import { View } from "../types";

const systems = [
  { id: "circulatory", label: "Hệ tuần hoàn", icon: Heart, color: "#FF4500", description: "Vận chuyển oxy, chất dinh dưỡng và hormone đến các tế bào." },
  { id: "respiratory", label: "Hệ hô hấp", icon: Wind, color: "#ADD8E6", description: "Thực hiện trao đổi khí giữa cơ thể và môi trường." },
  { id: "nervous", label: "Hệ thần kinh", icon: Activity, color: "#DA70D6", description: "Điều khiển và phối hợp hoạt động của các cơ quan." },
];

export default function Coordination({ setCurrentView, goBack }: { setCurrentView: (view: View) => void, goBack: () => void }) {
  const [activeSystem, setActiveSystem] = useState(systems[0]);

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={goBack}
            className="p-3 bg-white border border-[#E0F0FF] rounded-2xl text-[#00BFFF] hover:bg-[#F0F8FF] transition-colors shadow-sm"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="space-y-1">
            <h1 className="text-4xl font-extrabold text-[#333] tracking-tight">Sự phối hợp của cơ thể</h1>
            <p className="text-[#666] text-lg">Tìm hiểu cách các hệ cơ quan làm việc cùng nhau để duy trì sự sống.</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setCurrentView("biological-clock")}
            className="bg-[#00BFFF] text-white px-8 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-[#00BFFF]/20 hover:bg-[#009ACD] transition-all hover:scale-[1.02] flex items-center gap-2"
          >
            Nội dung tiếp theo <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* System Selection */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-[40px] border border-[#E0F0FF] shadow-sm space-y-6">
            <h3 className="text-2xl font-extrabold text-[#333]">Các hệ cơ quan</h3>
            <div className="space-y-4">
              {systems.map((system) => (
                <button
                  key={system.id}
                  onClick={() => setActiveSystem(system)}
                  className={cn(
                    "w-full flex items-center gap-4 p-5 rounded-3xl border transition-all duration-300 group",
                    activeSystem.id === system.id 
                      ? "bg-[#F0F8FF] border-[#00BFFF] shadow-lg shadow-[#00BFFF]/10" 
                      : "bg-white border-[#F0F8FF] hover:border-[#00BFFF]/50"
                  )}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg transition-colors",
                    activeSystem.id === system.id ? "bg-[#00BFFF] shadow-[#00BFFF]/30" : "bg-[#F5F9FF] text-[#999] group-hover:bg-[#00BFFF] group-hover:text-white"
                  )}>
                    <system.icon className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <span className={cn("block font-bold text-lg", activeSystem.id === system.id ? "text-[#00BFFF]" : "text-[#666]")}>{system.label}</span>
                    <span className="text-xs text-[#999] font-medium">Đang hoạt động</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-[40px] border border-[#E0F0FF] shadow-sm space-y-6">
            <h3 className="text-xl font-extrabold text-[#333]">Trạng thái cơ thể</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#F5F9FF] rounded-2xl border border-[#E0F0FF]">
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span className="text-sm font-bold text-[#666]">Nhịp tim</span>
                </div>
                <span className="font-extrabold text-[#333]">72 bpm</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-[#F5F9FF] rounded-2xl border border-[#E0F0FF]">
                <div className="flex items-center gap-3">
                  <Wind className="w-5 h-5 text-blue-400" />
                  <span className="text-sm font-bold text-[#666]">Nhịp thở</span>
                </div>
                <span className="font-extrabold text-[#333]">16 bpm</span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setCurrentView("biological-clock")}
            className="w-full bg-[#00BFFF] text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-[#00BFFF]/20 hover:bg-[#009ACD] transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Nội dung tiếp theo
          </button>
        </div>

        {/* 3D Visualization */}
        <div className="lg:col-span-8">
          <div className="relative aspect-video bg-white rounded-[60px] border border-[#E0F0FF] shadow-2xl shadow-[#00BFFF]/5 overflow-hidden group">
            <AnimatePresence>
              <motion.div
                key={activeSystem.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
              >
                <img 
                  src={`https://picsum.photos/seed/${activeSystem.id}/1600/900`} 
                  alt={activeSystem.label} 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </AnimatePresence>

            {/* Overlay Info */}
            <div className="absolute top-10 left-10 max-w-sm bg-white/80 backdrop-blur-xl p-8 rounded-[40px] shadow-2xl border border-white/50 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: activeSystem.color }}>
                  <activeSystem.icon className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#333]">{activeSystem.label}</h3>
              </div>
              <p className="text-[#666] text-sm leading-relaxed">
                {activeSystem.description}
              </p>
              <button className="w-full bg-[#00BFFF] text-white py-3 rounded-2xl font-bold text-sm shadow-xl shadow-[#00BFFF]/20 hover:bg-[#009ACD] transition-all">
                Xem mô phỏng 3D
              </button>
            </div>

            {/* Interaction Controls */}
            <div className="absolute bottom-10 right-10 flex items-center gap-4">
              <button className="w-14 h-14 bg-white/80 backdrop-blur-xl rounded-2xl flex items-center justify-center text-[#00BFFF] shadow-xl border border-white/50 hover:bg-white transition-colors">
                <Layers className="w-6 h-6" />
              </button>
              <button className="w-14 h-14 bg-white/80 backdrop-blur-xl rounded-2xl flex items-center justify-center text-[#00BFFF] shadow-xl border border-white/50 hover:bg-white transition-colors">
                <Activity className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
