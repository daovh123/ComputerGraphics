import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { organs } from "../data/organs";
import { CheckCircle2, ChevronRight, Info, Video, Layers, Activity, Maximize2 } from "lucide-react";
import { cn } from "../../../lib/utils";

const models = [
  {
    id: "cross-section",
    name: "Mặt cắt không gian",
    url: "https://sketchfab.com/models/a70c0c47fe4b4bbfabfc8f445365d5a4/embed?autostart=1&preload=1&ui_theme=dark"
  },
  {
    id: "full-anatomy",
    name: "Phẫu thuật tổng quát",
    url: "https://sketchfab.com/models/ebe5a8650a3348d795350a57672e8a8d/embed?autostart=1&preload=1&ui_theme=dark"
  }
];

export default function Explorer() {
  const navigate = useNavigate();
  const [selectedOrgan, setSelectedOrgan] = useState(organs[0]);
  const [activeModel, setActiveModel] = useState(models[0].id);

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[700px]">
      {/* 3D Viewer Area (Left) */}
      <div className="flex-[2] bg-[#1a1a1a] rounded-[32px] overflow-hidden relative group shadow-2xl flex flex-col">
        
        {/* 3D Embed Iframe */}
        <div className="flex-1 w-full relative">
          {models.map(model => (
            <iframe
              key={model.id}
              title={model.name}
              frameBorder="0"
              allowFullScreen
              allow="autoplay; fullscreen; xr-spatial-tracking"
              src={model.url}
              className={cn(
                "absolute inset-0 w-full h-full transition-opacity duration-500",
                activeModel === model.id ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
              )}
            />
          ))}
          
          {/* Top UI Overlay on top of Iframe */}
          <div className="absolute top-6 left-6 right-6 flex justify-between items-start pointer-events-none z-20">
            <div className="bg-black/40 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
              <h2 className="text-white font-bold text-xl">{selectedOrgan.name}</h2>
              <p className="text-white/70 text-sm">Mô hình 3D tương tác Sketchfab</p>
            </div>
            
            <div className="pointer-events-auto flex items-center bg-black/40 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 shadow-xl">
              {models.map((model) => (
                <button
                  key={model.id}
                  onClick={() => setActiveModel(model.id)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-bold transition-all",
                    activeModel === model.id 
                      ? "bg-[#00BFFF] text-white shadow-lg shadow-[#00BFFF]/20" 
                      : "text-white/50 hover:text-white"
                  )}
                >
                  {model.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Watermark overlay block (Sketchfab adds some ugly buttons at bottom, this helps somewhat) */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#1a1a1a] to-transparent pointer-events-none z-10"></div>
        </div>

      </div>

      {/* Info Panel (Right) */}
      <div className="flex-1 bg-white rounded-[32px] border border-[#E0F0FF] shadow-sm flex flex-col p-6 space-y-6">
        <h3 className="text-xl font-extrabold text-[#333]">Hệ Tuần Hoàn</h3>
        <p className="text-sm text-[#00BFFF] font-bold bg-[#F0F8FF] p-3 rounded-xl border border-[#E0F0FF]">
          <Activity className="inline w-4 h-4 mr-1" /> Kéo thả chuột để xoay khối 3D. Cuộn chuột để Thu/Phóng.
        </p>

        <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {organs.map((organ) => (
            <button
              key={organ.id}
              onClick={() => setSelectedOrgan(organ)}
              className={cn(
                "w-full text-left p-4 rounded-2xl border-2 transition-all duration-300",
                selectedOrgan.id === organ.id
                  ? "border-[#00BFFF] bg-[#F0F8FF] shadow-md shadow-[#00BFFF]/10"
                  : "border-[#F0F8FF] hover:border-[#00BFFF]/50 hover:bg-[#F5F9FF]"
              )}
            >
              <div className="flex items-center gap-3 mb-2">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-sm"
                  style={{ backgroundColor: organ.color }}
                >
                  {organ.name[0]}
                </div>
                <h4 className="font-bold text-[#333] text-lg">{organ.name}</h4>
              </div>
              <p className="text-[#666] text-sm leading-relaxed max-w-[90%]">
                {organ.description}
              </p>
            </button>
          ))}
        </div>
        
        <div className="pt-4 border-t border-[#E0F0FF]">
          <button 
            onClick={() => navigate("/lesson-33/blood")}
            className="w-full bg-[#00BFFF] text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-[#00BFFF]/20 hover:bg-[#009ACD] hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            Nội dung tiếp: Cấu tạo Máu <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
