import React, { useState } from "react";
import { Layers, Activity, User, ChevronRight, Info, Star, Play, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";

import { type View } from "../../router/views";

const layers = [
  { id: "skin", label: "Da", color: "#FFB6C1", description: "Lớp bảo vệ ngoài cùng của cơ thể, giúp điều hòa nhiệt độ và cảm giác.", icon: User },
  { id: "fat", label: "Mỡ", color: "#FFD700", description: "Lớp mô mỡ dự trữ năng lượng và bảo vệ các cơ quan bên trong.", icon: Layers },
  { id: "muscle", label: "Cơ", color: "#CD5C5C", description: "Hệ thống cơ bắp giúp cơ thể vận động và duy trì tư thế.", icon: Activity },
  { id: "bone", label: "Xương", color: "#F5F5F5", description: "Khung xương nâng đỡ cơ thể và bảo vệ các cơ quan quan trọng.", icon: Layers },
];

export default function BodyParts({ setCurrentView, goBack }: { setCurrentView: (view: View) => void, goBack: () => void }) {
  const [activeLayer, setActiveLayer] = useState(layers[0]);

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
            <h1 className="text-4xl font-extrabold text-[#333] tracking-tight">Khám phá các phần cơ thể</h1>
            <p className="text-[#666] text-lg">Tìm hiểu cấu trúc đa tầng của cơ thể người qua mô hình tương tác.</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setCurrentView("coordination")}
            className="bg-[#00BFFF] text-white px-8 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-[#00BFFF]/20 hover:bg-[#009ACD] transition-all hover:scale-[1.02] flex items-center gap-2"
          >
            Nội dung tiếp theo <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Layer Selection Sidebar */}
        <div className="lg:col-span-3 space-y-4">
          {layers.map((layer) => (
            <button
              key={layer.id}
              onClick={() => setActiveLayer(layer)}
              className={cn(
                "w-full flex items-center gap-4 p-5 rounded-3xl border transition-all duration-300 group",
                activeLayer.id === layer.id 
                  ? "bg-white border-[#00BFFF] shadow-xl shadow-[#00BFFF]/10 -translate-x-2" 
                  : "bg-white/50 border-[#E0F0FF] hover:bg-white hover:border-[#00BFFF]/50"
              )}
            >
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors",
                activeLayer.id === layer.id ? "bg-[#00BFFF] text-white shadow-lg shadow-[#00BFFF]/20" : "bg-[#F0F8FF] text-[#999]"
              )}>
                <layer.icon className="w-6 h-6" />
              </div>
              <div className="text-left">
                <span className={cn("block font-bold text-lg", activeLayer.id === layer.id ? "text-[#00BFFF]" : "text-[#666]")}>{layer.label}</span>
                <span className="text-xs text-[#999] font-medium uppercase tracking-wider">Tầng {layers.indexOf(layer) + 1}</span>
              </div>
              {activeLayer.id === layer.id && <ChevronRight className="w-5 h-5 ml-auto text-[#00BFFF]" />}
            </button>
          ))}
        </div>

        {/* Main 3D Viewport */}
        <div className="lg:col-span-6">
          <div className="relative aspect-[3/4] bg-white rounded-[60px] border border-[#E0F0FF] shadow-2xl shadow-[#00BFFF]/5 overflow-hidden group">
            <AnimatePresence>
              <motion.div
                key={activeLayer.id}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
              >
                <img 
                  src={`https://picsum.photos/seed/${activeLayer.id}/1200/1600`} 
                  alt={activeLayer.label} 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </AnimatePresence>

            {/* Floating UI Elements */}
            <div className="absolute top-10 left-10 right-10 flex items-center justify-between pointer-events-none">
              <div className="bg-white/80 backdrop-blur-xl px-6 py-3 rounded-2xl shadow-xl border border-white/50 flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: activeLayer.color }}></div>
                <span className="font-bold text-[#333]">{activeLayer.label}</span>
              </div>
              <button className="pointer-events-auto w-12 h-12 bg-white/80 backdrop-blur-xl rounded-2xl flex items-center justify-center text-[#00BFFF] shadow-xl border border-white/50">
                <Star className="w-6 h-6" />
              </button>
            </div>

            <div className="absolute bottom-10 left-10 right-10 flex items-center justify-center gap-6 pointer-events-none">
              <button className="pointer-events-auto bg-white/80 backdrop-blur-xl px-8 py-3 rounded-2xl font-bold text-[#00BFFF] shadow-xl border border-white/50 hover:bg-white transition-colors">
                Xoay mô hình
              </button>
              <button className="pointer-events-auto bg-[#00BFFF] text-white px-8 py-3 rounded-2xl font-bold shadow-xl shadow-[#00BFFF]/30 hover:bg-[#009ACD] transition-colors">
                Phóng to
              </button>
            </div>
          </div>
        </div>

        {/* Info Panel */}
        <div className="lg:col-span-3 space-y-6">
          <motion.div
            key={activeLayer.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-[40px] border border-[#E0F0FF] shadow-sm space-y-6"
          >
            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-[#333]">{activeLayer.label}</h3>
              <div className="w-12 h-1 bg-[#00BFFF] rounded-full"></div>
            </div>
            <p className="text-[#666] leading-relaxed text-sm">
              {activeLayer.description}
            </p>
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3 p-4 bg-[#F5F9FF] rounded-2xl border border-[#E0F0FF]">
                <Info className="w-5 h-5 text-[#00BFFF]" />
                <span className="text-xs font-bold text-[#333]">Chức năng chính: Bảo vệ</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-[#F5F9FF] rounded-2xl border border-[#E0F0FF]">
                <Activity className="w-5 h-5 text-[#00BFFF]" />
                <span className="text-xs font-bold text-[#333]">Độ dày: 1.5mm - 4mm</span>
              </div>
            </div>
            <button className="w-full flex items-center justify-center gap-2 text-[#00BFFF] font-bold text-sm hover:underline pt-4">
              <Play className="w-4 h-4" /> Xem video chi tiết
            </button>
          </motion.div>

          <div className="bg-gradient-to-br from-[#00BFFF] to-[#00CED1] p-8 rounded-[40px] text-white shadow-xl shadow-[#00BFFF]/20 space-y-4">
            <h4 className="font-bold text-lg">Bạn có biết?</h4>
            <p className="text-white/80 text-sm leading-relaxed">
              Da là cơ quan lớn nhất của cơ thể người, chiếm khoảng 15% trọng lượng cơ thể.
            </p>
            <button className="w-full bg-white/20 backdrop-blur-md text-white py-3 rounded-2xl font-bold text-sm hover:bg-white/30 transition-colors">
              Tìm hiểu thêm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
