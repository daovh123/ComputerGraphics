import React, { useState } from "react";
import { HeartPulse, Droplet, Users, RefreshCcw, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "../../lib/utils";
import { bloodTypes } from "./data/blood";
import { motion, AnimatePresence } from "motion/react";

export default function Lesson33Simulation() {
  const [donorType, setDonorType] = useState<string | null>(null);
  const [recipientType, setRecipientType] = useState<string | null>(null);
  const [result, setResult] = useState<"success" | "fail" | null>(null);

  const simulateTransfusion = () => {
    if (!donorType || !recipientType) return;
    const donor = bloodTypes.find(b => b.id === donorType);
    if (donor?.canDonateTo.includes(recipientType)) {
      setResult("success");
    } else {
      setResult("fail");
    }
  };

  const reset = () => {
    setDonorType(null);
    setRecipientType(null);
    setResult(null);
  };

  return (
    <div className="max-w-[1200px] mx-auto space-y-12 pb-10">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="w-20 h-20 bg-[#F5F9FF] rounded-3xl flex items-center justify-center mx-auto text-[#00BFFF] border border-[#E0F0FF] shadow-lg shadow-[#00BFFF]/10">
          <HeartPulse className="w-10 h-10" />
        </div>
        <h2 className="text-4xl font-black text-[#333]">Mô phỏng Truyền máu</h2>
        <p className="text-[#666] text-lg">Áp dụng nguyên tắc kháng nguyên - kháng thể để thực hiện các ca truyền máu an toàn cứu sống bệnh nhân.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
        {/* Người Cho */}
        <div className="bg-white rounded-[40px] p-8 border border-[#E0F0FF] shadow-sm space-y-6 flex flex-col items-center">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-2">
            <Users className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-extrabold text-[#333]">Người Cho (Bệnh nhân A)</h3>
          <p className="text-sm text-[#999] uppercase font-bold tracking-widest text-center">Chọn nhóm máu</p>
          
          <div className="grid grid-cols-2 gap-4 w-full">
            {bloodTypes.map(blood => (
              <button 
                key={blood.id}
                onClick={() => { setDonorType(blood.id); setResult(null); }}
                className={cn(
                  "py-4 rounded-2xl font-black text-2xl transition-all border-2",
                  donorType === blood.id ? "bg-white shadow-xl scale-105 z-10" : "bg-[#F5F9FF] border-transparent text-[#666] hover:bg-[#E0F0FF]"
                )}
                style={{ borderColor: donorType === blood.id ? blood.color : "", color: donorType === blood.id ? blood.color : "" }}
              >
                {blood.id}
              </button>
            ))}
          </div>
        </div>

        {/* Ống truyền máu */}
        <div className="flex flex-col items-center justify-center space-y-6 relative h-64 md:h-auto">
          {/* Cột hiển thị dây truyền máu giả lập */}
          <div className="hidden md:flex flex-col items-center gap-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] pointer-events-none -mr-8">
             <div className="w-full h-4 bg-[#F0F8FF] rounded-full overflow-hidden relative border border-[#E0F0FF]">
                <AnimatePresence>
                  {result === "success" && (
                     <motion.div 
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="h-full bg-green-500 shadow-[0_0_10px_#22c55e]"
                     />
                  )}
                  {result === "fail" && (
                     <motion.div 
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.5 }}
                        className="h-full bg-red-500 flex items-center"
                     >
                       <div className="w-full flex justify-around">
                          {[1,2,3,4,5].map(i => <XCircle key={i} className="w-3 h-3 text-white/50 animate-pulse" />)}
                       </div>
                     </motion.div>
                  )}
                </AnimatePresence>
             </div>
             <Droplet className={cn("w-6 h-6", result === "success" ? "text-green-500 animate-bounce" : (result === "fail" ? "text-red-500" : "text-[#E0F0FF]"))} />
          </div>

          <button
            onClick={simulateTransfusion}
            disabled={!donorType || !recipientType || result !== null}
            className="relative z-10 bg-[#00BFFF] text-white w-24 h-24 rounded-full font-black text-sm shadow-xl shadow-[#00BFFF]/30 hover:bg-[#009ACD] hover:scale-110 transition-all disabled:opacity-50 disabled:grayscale disabled:scale-100 flex flex-col items-center justify-center gap-1"
          >
             <HeartPulse className="w-8 h-8" />
             <span className="leading-none">TRUYỀN</span>
          </button>
          
          <button onClick={reset} className="text-[#999] hover:text-[#333] font-bold text-sm bg-white px-4 py-2 rounded-full shadow-sm flex items-center gap-2 relative z-10">
            <RefreshCcw className="w-4 h-4" /> Làm lại
          </button>
        </div>

        {/* Người Nhận */}
        <div className="bg-white rounded-[40px] p-8 border border-[#E0F0FF] shadow-sm space-y-6 flex flex-col items-center">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 mb-2">
            <Users className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-extrabold text-[#333]">Người Nhận (Bệnh nhân B)</h3>
          <p className="text-sm text-[#999] uppercase font-bold tracking-widest text-center">Chọn nhóm máu</p>
          
          <div className="grid grid-cols-2 gap-4 w-full">
            {bloodTypes.map(blood => (
              <button 
                key={blood.id}
                onClick={() => { setRecipientType(blood.id); setResult(null); }}
                className={cn(
                  "py-4 rounded-2xl font-black text-2xl transition-all border-2",
                  recipientType === blood.id ? "bg-white shadow-xl scale-105 z-10" : "bg-[#F5F9FF] border-transparent text-[#666] hover:bg-[#E0F0FF]"
                )}
                style={{ borderColor: recipientType === blood.id ? blood.color : "", color: recipientType === blood.id ? blood.color : "" }}
              >
                {blood.id}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result Status */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "p-8 rounded-[32px] border-2 shadow-2xl flex items-center gap-6 max-w-3xl mx-auto",
              result === "success" 
                ? "bg-green-50 border-green-200 shadow-green-500/10 text-green-800"
                : "bg-red-50 border-red-200 shadow-red-500/10 text-red-800"
            )}
          >
            <div className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center shrink-0 shadow-lg text-white",
              result === "success" ? "bg-green-500" : "bg-red-500"
            )}>
              {result === "success" ? <CheckCircle2 className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
            </div>
            
            <div className="space-y-2">
              <h4 className="text-2xl font-black">
                {result === "success" ? "Tuyệt vời! Truyền máu thành công." : "Nguy hiểm! Xảy ra tai biến truyền máu."}
              </h4>
              <p className={cn("text-lg font-medium opacity-90", result === "success" ? "text-green-700" : "text-red-700")}>
                {result === "success" 
                  ? `Kháng nguyên nhóm máu ${donorType} không bị ngưng kết bởi kháng thể trong huyết tương của nhóm máu ${recipientType}.`
                  : `Huyết tương của người nhóm máu ${recipientType} chứa kháng thể làm ngưng kết (đông tụ) hồng cầu của nhóm máu ${donorType}, dẫn đến tắc nghẽn mạch máu và có thể tử vong!`}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
