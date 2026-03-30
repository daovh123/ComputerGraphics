import React, { useState } from "react";
import { diseases } from "./data/diseases";
import { ShieldAlert, AlertTriangle, ShieldCheck, RefreshCcw } from "lucide-react";
import { cn } from "../../lib/utils";

export default function Lesson33Diseases() {
  const [activeTab, setActiveTab] = useState<"cause" | "prevention">("cause");

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mx-auto text-red-500 border border-red-100 shadow-lg shadow-red-500/10">
          <ShieldAlert className="w-10 h-10" />
        </div>
        <h2 className="text-4xl font-black text-[#333]">Bệnh lý Hệ tuần hoàn</h2>
        <p className="text-[#666] text-lg">Tìm hiểu các nguyên nhân gây bệnh để có biện pháp phòng tránh và bảo vệ hệ tim mạch khỏe mạnh.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {diseases.map((disease) => (
          <div key={disease.id} className="bg-white rounded-[40px] border border-[#E0F0FF] shadow-sm overflow-hidden flex flex-col group hover:shadow-xl hover:shadow-[#00BFFF]/10 transition-all duration-300">
            {/* Image Header */}
            <div className="h-56 relative overflow-hidden">
              <img 
                src={disease.image} 
                alt={disease.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl font-black text-white">{disease.name}</h3>
              </div>
            </div>

            {/* Toggle Logic */}
            <div className="flex bg-[#F5F9FF] border-b border-[#E0F0FF]">
              <button 
                onClick={() => setActiveTab("cause")}
                className={cn("flex-1 py-4 font-bold text-sm transition-colors text-center border-b-2", activeTab === "cause" ? "border-[#00BFFF] text-[#00BFFF]" : "border-transparent text-[#666] hover:text-[#00BFFF]")}
              >
                Nguyên nhân & Triệu chứng
              </button>
              <button 
                onClick={() => setActiveTab("prevention")}
                className={cn("flex-1 py-4 font-bold text-sm transition-colors text-center border-b-2", activeTab === "prevention" ? "border-green-500 text-green-500" : "border-transparent text-[#666] hover:text-green-500")}
              >
                Phòng ngừa
              </button>
            </div>

            {/* Content Area */}
            <div className="p-8 flex-1 flex flex-col gap-6">
              {activeTab === "cause" ? (
                <>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-red-500 font-bold uppercase tracking-widest text-xs">
                      <AlertTriangle className="w-4 h-4" /> Nguyên nhân
                    </div>
                    <p className="text-[#666] leading-relaxed font-medium">{disease.cause}</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-orange-500 font-bold uppercase tracking-widest text-xs">
                      <RefreshCcw className="w-4 h-4" /> Triệu chứng
                    </div>
                    <ul className="space-y-2">
                      {disease.symptoms.map((s, i) => (
                        <li key={i} className="flex items-center gap-3 text-[#555] font-medium p-3 bg-orange-50/50 rounded-2xl border border-orange-100 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0"></div> {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-green-600 font-bold uppercase tracking-widest text-xs">
                    <ShieldCheck className="w-4 h-4" /> Biện pháp phòng tránh
                  </div>
                  <ul className="space-y-3">
                    {disease.prevention.map((p, i) => (
                      <li key={i} className="flex gap-4 p-4 bg-green-50 rounded-2xl border border-green-100 hover:bg-green-100/50 transition-colors group/item">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-black text-green-600 shrink-0 shadow-sm shadow-green-200">
                          {i + 1}
                        </div>
                        <span className="text-[#333] font-medium leading-relaxed group-hover/item:text-green-800 transition-colors">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
