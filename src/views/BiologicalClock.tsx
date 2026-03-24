import React, { useState, useEffect } from "react";
import { Clock, Activity, Heart, Wind, Droplets, User, ChevronRight, Info, Star, Play, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";

import { View } from "../types";

const clockData = [
  { time: "01:00 - 03:00", organ: "Gan", activity: "Thải độc, tái tạo máu", icon: Activity, color: "#CD5C5C" },
  { time: "03:00 - 05:00", organ: "Phổi", activity: "Thải độc phổi, trao đổi khí", icon: Wind, color: "#ADD8E6" },
  { time: "05:00 - 07:00", organ: "Ruột già", activity: "Thải chất cặn bã", icon: Droplets, color: "#DEB887" },
  { time: "07:00 - 09:00", organ: "Dạ dày", activity: "Hấp thụ dinh dưỡng", icon: Activity, color: "#FFD700" },
  { time: "09:00 - 11:00", organ: "Tụy & Lách", activity: "Chuyển hóa năng lượng", icon: Activity, color: "#98FB98" },
  { time: "11:00 - 13:00", organ: "Tim", activity: "Tuần hoàn máu mạnh nhất", icon: Heart, color: "#FF4500" },
  { time: "13:00 - 15:00", organ: "Ruột non", activity: "Phân loại chất dinh dưỡng", icon: Droplets, color: "#F4A460" },
  { time: "15:00 - 17:00", organ: "Bàng quang", activity: "Thải độc hệ tiết niệu", icon: Droplets, color: "#4682B4" },
  { time: "17:00 - 19:00", organ: "Thận", activity: "Lọc máu, cân bằng nước", icon: Droplets, color: "#4169E1" },
  { time: "19:00 - 21:00", organ: "Màng ngoài tim", activity: "Bảo vệ tim, thư giãn", icon: Heart, color: "#DC143C" },
  { time: "21:00 - 23:00", organ: "Hệ nội tiết", activity: "Điều hòa hormone", icon: Activity, color: "#DA70D6" },
  { time: "23:00 - 01:00", organ: "Túi mật", activity: "Tiết mật, tiêu hóa chất béo", icon: Droplets, color: "#2E8B57" },
];

export default function BiologicalClock({ setCurrentView, goBack }: { setCurrentView: (view: View) => void, goBack: () => void }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = clockData[activeIndex];

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
            <h1 className="text-4xl font-extrabold text-[#333] tracking-tight">Đồng hồ sinh học</h1>
            <p className="text-[#666] text-lg">Khám phá chu kỳ hoạt động của các cơ quan trong cơ thể theo thời gian.</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setCurrentView("summary")}
            className="bg-[#00BFFF] text-white px-8 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-[#00BFFF]/20 hover:bg-[#009ACD] transition-all hover:scale-[1.02] flex items-center gap-2"
          >
            Nội dung tiếp theo <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Interactive Clock Visualization */}
        <div className="lg:col-span-7 flex items-center justify-center">
          <div className="relative w-[500px] h-[500px] bg-white rounded-full border-[20px] border-[#F0F8FF] shadow-2xl shadow-[#00BFFF]/10 flex items-center justify-center group">
            {/* Clock Numbers/Markers */}
            {clockData.map((item, index) => {
              const angle = (index * 30) - 90;
              const radius = 180;
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;

              return (
                <button
                  key={item.time}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "absolute w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 z-20",
                    activeIndex === index 
                      ? "bg-[#00BFFF] text-white scale-125 shadow-xl shadow-[#00BFFF]/30" 
                      : "bg-[#F5F9FF] text-[#999] hover:bg-[#E0F0FF] hover:text-[#00BFFF]"
                  )}
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                >
                  <item.icon className="w-6 h-6" />
                </button>
              );
            })}

            {/* Central Clock Hand */}
            <motion.div 
              animate={{ rotate: (activeIndex * 30) }}
              transition={{ type: "spring", stiffness: 100 }}
              className="absolute w-1.5 h-40 bg-gradient-to-t from-[#00BFFF] to-transparent rounded-full origin-bottom -translate-y-20 z-10"
            ></motion.div>

            {/* Center Hub */}
            <div className="w-10 h-10 bg-white rounded-full border-4 border-[#00BFFF] shadow-lg z-30 flex items-center justify-center">
              <div className="w-2 h-2 bg-[#00BFFF] rounded-full"></div>
            </div>

            {/* Background Decorative Circles */}
            <div className="absolute inset-10 border border-dashed border-[#E0F0FF] rounded-full"></div>
            <div className="absolute inset-24 border border-dashed border-[#E0F0FF] rounded-full"></div>
          </div>
        </div>

        {/* Info Panel */}
        <div className="lg:col-span-5 space-y-6">
          <AnimatePresence>
            <motion.div
              key={activeItem.time}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white p-10 rounded-[50px] border border-[#E0F0FF] shadow-sm space-y-8"
            >
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-[#F0F8FF] text-[#00BFFF] px-4 py-1.5 rounded-full text-sm font-bold tracking-wide">
                  <Clock className="w-4 h-4" />
                  <span>{activeItem.time}</span>
                </div>
                <h2 className="text-4xl font-extrabold text-[#333] leading-tight">Hoạt động của {activeItem.organ}</h2>
                <div className="w-16 h-1.5 bg-[#00BFFF] rounded-full"></div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-6 bg-[#F5F9FF] rounded-3xl border border-[#E0F0FF]">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#00BFFF] shadow-sm">
                    <Activity className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-[#999] uppercase tracking-wider">Chức năng chính</p>
                    <p className="text-lg font-bold text-[#333]">{activeItem.activity}</p>
                  </div>
                </div>

                <div className="p-6 bg-white rounded-3xl border border-[#E0F0FF] space-y-4">
                  <h4 className="font-bold text-[#333] flex items-center gap-2">
                    <Info className="w-4 h-4 text-[#00BFFF]" />
                    Lời khuyên sức khỏe
                  </h4>
                  <p className="text-[#666] text-sm leading-relaxed">
                    Trong khoảng thời gian này, bạn nên {activeItem.organ === "Gan" ? "ngủ sâu để gan thải độc hiệu quả." : activeItem.organ === "Dạ dày" ? "ăn sáng đầy đủ để cung cấp năng lượng cho cả ngày." : "duy trì thói quen sinh hoạt lành mạnh."}
                  </p>
                </div>
              </div>

              <div className="pt-6 flex items-center gap-4">
                <button className="flex-1 bg-[#00BFFF] text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-[#00BFFF]/20 hover:bg-[#009ACD] transition-all">
                  Tìm hiểu chi tiết
                </button>
                <button className="w-16 h-16 bg-[#F0F8FF] text-[#00BFFF] rounded-2xl flex items-center justify-center hover:bg-[#E0F0FF] transition-colors">
                  <Star className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="bg-gradient-to-br from-[#00BFFF] to-[#00CED1] p-8 rounded-[40px] text-white shadow-xl shadow-[#00BFFF]/20 flex items-center gap-6">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center flex-shrink-0">
              <Play className="w-10 h-10 fill-current" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-lg">Video: Nhịp sinh học</h4>
              <p className="text-white/80 text-sm">Tại sao chúng ta cần ngủ đúng giờ?</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
