import React, { useState } from "react";
import { bloodComponents, bloodTypes } from "./data/blood";
import { Droplet, Type, Activity, Share2, Info } from "lucide-react";
import { cn } from "../../lib/utils";
import { motion, AnimatePresence } from "motion/react";

export default function Lesson33Blood() {
  const [activeTab, setActiveTab] = useState<"components" | "types">("components");
  const [selectedBlood, setSelectedBlood] = useState(bloodTypes[0]);

  return (
    <div className="space-y-8">
      {/* Tab Switcher */}
      <div className="flex gap-4 p-2 bg-white rounded-[24px] shadow-sm border border-[#E0F0FF] max-w-md mx-auto relative overflow-hidden">
        <div 
          className="absolute inset-y-2 left-2 w-[calc(50%-12px)] bg-[#00BFFF] rounded-[16px] transition-transform duration-300 shadow-md shadow-[#00BFFF]/20"
          style={{ transform: activeTab === "components" ? "translateX(0)" : "translateX(calc(100% + 8px))" }}
        ></div>
        <button 
          onClick={() => setActiveTab("components")}
          className={cn("flex-1 py-3 px-6 rounded-[16px] font-bold text-sm z-10 transition-colors flex items-center justify-center gap-2", activeTab === "components" ? "text-white" : "text-[#666] hover:text-[#00BFFF]")}
        >
          <Activity className="w-4 h-4" /> Thành phần máu
        </button>
        <button 
          onClick={() => setActiveTab("types")}
          className={cn("flex-1 py-3 px-6 rounded-[16px] font-bold text-sm z-10 transition-colors flex items-center justify-center gap-2", activeTab === "types" ? "text-white" : "text-[#666] hover:text-[#00BFFF]")}
        >
          <Type className="w-4 h-4" /> Nhóm máu (ABO)
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "components" ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Graphic/Visual Representation */}
              <div className="bg-[#1a1a1a] rounded-[40px] flex flex-col items-center justify-center min-h-[500px] shadow-xl relative overflow-hidden group">
                <iframe
                  title="Blood Cells"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; fullscreen"
                  src="https://sketchfab.com/models/e1b30076aeb34af6833af300a27fdef2/embed?autostart=1&ui_theme=dark&dnt=1"
                  className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>

                <div className="absolute bottom-8 left-8 right-8 bg-black/40 backdrop-blur-md p-6 rounded-3xl border border-white/10 pointer-events-none">
                   <h3 className="text-white font-bold text-xl mb-1">Dòng chảy vi mô 3D</h3>
                   <p className="text-white/70 text-sm">Trực quan hóa cảnh quan bên trong mao mạch, nơi hàng triệu Hồng cầu đang trôi dạt vận chuyển khí.</p>
                </div>
              </div>

              {/* Descriptions */}
              <div className="space-y-4">
                {bloodComponents.map((comp) => (
                  <div key={comp.id} className="bg-white p-6 rounded-[24px] border border-[#E0F0FF] shadow-sm flex items-start gap-6 hover:border-[#00BFFF]/50 hover:bg-[#F5F9FF] transition-all group">
                    <div className="w-16 h-16 rounded-[20px] flex items-center justify-center shrink-0 shadow-lg text-white" style={{ backgroundColor: comp.color }}>
                      {comp.id === 'plasma' && <Droplet className="w-8 h-8" />}
                      {comp.id !== 'plasma' && <Activity className="w-8 h-8" />}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-extrabold text-[#333] group-hover:text-[#00BFFF] transition-colors">{comp.name}</h3>
                        <span className="px-3 py-1 bg-[#F0F8FF] text-[#00BFFF] rounded-full text-xs font-bold">{comp.percentage}</span>
                      </div>
                      <p className="text-[#666] leading-relaxed text-sm">
                        {comp.function}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Blood Types Selection */}
              <div className="lg:col-span-4 space-y-4">
                {bloodTypes.map((blood) => (
                  <button
                    key={blood.id}
                    onClick={() => setSelectedBlood(blood)}
                    className={cn(
                      "w-full text-left p-6 rounded-[24px] border-2 transition-all duration-300 flex items-center gap-4",
                      selectedBlood.id === blood.id
                        ? "bg-white shadow-xl scale-105 z-10"
                        : "bg-white/50 border-[#E0F0FF] hover:border-[#00BFFF]/50 hover:bg-white"
                    )}
                    style={{ borderColor: selectedBlood.id === blood.id ? blood.color : "" }}
                  >
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-black text-xl shadow-lg"
                      style={{ backgroundColor: blood.color }}
                    >
                      {blood.id}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-[#333] text-lg">{blood.type}</h4>
                      <p className="text-xs text-[#999] uppercase tracking-widest font-bold">Kháng nguyên {blood.id === 'O' ? 'Không' : blood.id}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Transfusion Logic Detail */}
              <div className="lg:col-span-8">
                <div className="bg-white rounded-[40px] border border-[#E0F0FF] p-10 shadow-sm space-y-10 min-h-full">
                  <div className="flex items-center gap-6">
                    <div 
                      className="w-24 h-24 rounded-3xl flex items-center justify-center text-white text-5xl font-black shadow-2xl"
                      style={{ backgroundColor: selectedBlood.color, boxShadow: `0 20px 25px -5px ${selectedBlood.color}40` }}
                    >
                      {selectedBlood.id}
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-4xl font-black text-[#333]">{selectedBlood.type}</h2>
                      <div className="flex gap-4 text-sm font-bold text-[#666]">
                        <span className="flex items-center gap-1 bg-[#F5F9FF] px-3 py-1 rounded-full"><Info className="w-4 h-4 text-[#00BFFF]" /> Kháng nguyên: {selectedBlood.antigens}</span>
                        <span className="flex items-center gap-1 bg-[#fff0f0] px-3 py-1 rounded-full"><Activity className="w-4 h-4 text-red-500" /> Kháng thể: {selectedBlood.antibodies}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    {/* Can Donate To */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-green-600 font-bold uppercase tracking-widest text-sm">
                        <Share2 className="w-4 h-4" /> Cho được (Truyền đi)
                      </div>
                      <div className="p-6 bg-green-50 rounded-[24px] border border-green-100 flex flex-wrap gap-2">
                        {selectedBlood.canDonateTo.map(type => (
                          <div key={type} className="w-12 h-12 bg-white rounded-full flex items-center justify-center font-black text-green-600 text-lg shadow-sm border-2 border-green-200">
                            {type}
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-[#666] leading-relaxed">
                        Nhóm máu {selectedBlood.id} có thể truyền an toàn cho các nhóm máu trên vì không gây ngưng kết hồng cầu ở người nhận.
                      </p>
                    </div>

                    {/* Can Receive From */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-[#00BFFF] font-bold uppercase tracking-widest text-sm">
                        <Droplet className="w-4 h-4" /> Nhận được (Tiếp nhận)
                      </div>
                      <div className="p-6 bg-[#F5F9FF] rounded-[24px] border border-[#E0F0FF] flex flex-wrap gap-2">
                        {selectedBlood.canReceiveFrom.map(type => (
                          <div key={type} className="w-12 h-12 bg-white rounded-full flex items-center justify-center font-black text-[#00BFFF] text-lg shadow-sm border-2 border-[#E0F0FF]">
                            {type}
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-[#666] leading-relaxed">
                        Huyết tương của nhóm máu {selectedBlood.id} sẽ không làm ngưng kết (đông tụ) hồng cầu của các nhóm máu này.
                      </p>
                    </div>
                  </div>
                  
                  <div className="w-full h-px bg-[#F0F8FF] my-4"></div>
                  
                  <button className="w-full bg-[#1a1a1a] text-white py-4 rounded-2xl font-bold text-sm shadow-xl hover:bg-black transition-all flex items-center justify-center gap-2">
                    <Activity className="w-4 h-4" /> Bắt đầu bài tập mô phỏng truyền máu
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
