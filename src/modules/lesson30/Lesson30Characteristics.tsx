import React, { useState } from "react";
import { User, Activity, Heart, Wind, Droplets, ChevronRight, Info, Star, Play, ChevronLeft, CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";

import { type View } from "../../router/views";

const characteristics = [
  { id: "blood", label: "Nhóm máu", value: "Nhóm O", icon: Droplets, color: "#CD5C5C", description: "Nhóm máu phổ biến nhất, có thể hiến cho tất cả các nhóm máu khác." },
  { id: "skin", label: "Màu da", value: "Da vàng", icon: User, color: "#FFD700", description: "Đặc điểm di truyền phổ biến của người Á Đông." },
  { id: "height", label: "Chiều cao", value: "165 cm", icon: Activity, color: "#00BFFF", description: "Chiều cao trung bình của học sinh lớp 8." },
  { id: "weight", label: "Cân nặng", value: "52 kg", icon: Activity, color: "#00CED1", description: "Cân nặng lý tưởng cho chiều cao 165 cm." },
];

export default function Characteristics({ setCurrentView, goBack }: { setCurrentView: (view: View) => void, goBack: () => void }) {
  const [activeChar, setActiveChar] = useState(characteristics[0]);

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
            <h1 className="text-4xl font-extrabold text-[#333] tracking-tight">Đặc điểm riêng</h1>
            <p className="text-[#666] text-lg">Khám phá những đặc điểm sinh học độc đáo của mỗi cá nhân.</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setCurrentView("dashboard")}
            className="bg-[#00BFFF] text-white px-8 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-[#00BFFF]/20 hover:bg-[#009ACD] transition-all hover:scale-[1.02] flex items-center gap-2"
          >
            Hoàn thành bài học <CheckCircle2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Profile Card */}
        <div className="lg:col-span-4">
          <div className="bg-white p-10 rounded-[60px] border border-[#E0F0FF] shadow-2xl shadow-[#00BFFF]/5 flex flex-col items-center text-center space-y-8">
            <div className="relative w-48 h-48 rounded-full border-8 border-[#F0F8FF] p-2 shadow-xl shadow-[#00BFFF]/10">
              <img src="https://picsum.photos/seed/user/400/400" alt="Profile" className="w-full h-full object-cover rounded-full" />
              <div className="absolute bottom-2 right-2 w-12 h-12 bg-[#00BFFF] rounded-full border-4 border-white flex items-center justify-center text-white shadow-lg">
                <Star className="w-6 h-6 fill-current" />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-extrabold text-[#333]">Đặng Đào</h2>
              <p className="text-[#999] font-bold uppercase tracking-widest text-sm">Học sinh lớp 8A</p>
            </div>
            <div className="w-full h-[1px] bg-[#F0F8FF]"></div>
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="p-4 bg-[#F5F9FF] rounded-3xl border border-[#E0F0FF] space-y-1">
                <p className="text-xs font-bold text-[#999] uppercase tracking-wider">Tuổi</p>
                <p className="text-xl font-extrabold text-[#333]">14</p>
              </div>
              <div className="p-4 bg-[#F5F9FF] rounded-3xl border border-[#E0F0FF] space-y-1">
                <p className="text-xs font-bold text-[#999] uppercase tracking-wider">Giới tính</p>
                <p className="text-xl font-extrabold text-[#333]">Nam</p>
              </div>
            </div>
          </div>
        </div>

        {/* Characteristics Grid */}
        <div className="lg:col-span-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {characteristics.map((char) => (
              <button
                key={char.id}
                onClick={() => setActiveChar(char)}
                className={cn(
                  "p-8 rounded-[40px] border-2 transition-all duration-300 flex items-start gap-6 group text-left",
                  activeChar.id === char.id 
                    ? "bg-white border-[#00BFFF] shadow-xl shadow-[#00BFFF]/10 -translate-y-1" 
                    : "bg-white/50 border-[#F0F8FF] hover:border-[#00BFFF]/50 hover:bg-white"
                )}
              >
                <div className={cn(
                  "w-16 h-16 rounded-3xl flex items-center justify-center text-white shadow-lg transition-colors",
                  activeChar.id === char.id ? "bg-[#00BFFF] shadow-[#00BFFF]/30" : "bg-[#F0F8FF] text-[#999] group-hover:bg-[#00BFFF] group-hover:text-white"
                )}>
                  <char.icon className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-[#999] uppercase tracking-widest">{char.label}</p>
                  <p className="text-2xl font-extrabold text-[#333] group-hover:text-[#00BFFF] transition-colors">{char.value}</p>
                </div>
              </button>
            ))}
          </div>

          <AnimatePresence>
            <motion.div
              key={activeChar.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white p-10 rounded-[50px] border border-[#E0F0FF] shadow-sm space-y-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: activeChar.color }}>
                  <activeChar.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#333]">{activeChar.label}: {activeChar.value}</h3>
              </div>
              <p className="text-[#666] text-lg leading-relaxed">
                {activeChar.description}
              </p>
              <div className="pt-4 flex items-center gap-6">
                <div className="flex items-center gap-2 text-sm font-bold text-[#00BFFF]">
                  <Info className="w-4 h-4" />
                  <span>Tìm hiểu thêm về di truyền học</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-[#00BFFF]">
                  <Play className="w-4 h-4" />
                  <span>Video bài giảng</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
