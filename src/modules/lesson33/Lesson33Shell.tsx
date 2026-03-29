import React from "react";
import { View } from "../../types";
import { BookOpen, Layers, Activity, Clock, HeartPulse, UserCircle2, Gamepad2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";
import Lesson33Overview from "./Lesson33Overview";
import Lesson33Explorer from "./Lesson33Explorer";
import Lesson33Blood from "./Lesson33Blood";
import Lesson33Simulation from "./Lesson33Simulation";
import Lesson33Diseases from "./Lesson33Diseases";
import Lesson33Quiz from "./Lesson33Quiz";

const tabs = [
  { id: "lesson-33-overview", label: "Tổng quan", icon: BookOpen },
  { id: "lesson-33-explorer", label: "Explorer 3D", icon: Layers },
  { id: "lesson-33-blood", label: "Cấu tạo Máu", icon: Activity },
  { id: "lesson-33-simulation", label: "Tuần hoàn", icon: HeartPulse },
  { id: "lesson-33-diseases", label: "Bệnh lý", icon: UserCircle2 },
  { id: "lesson-33-quiz", label: "Quiz", icon: Gamepad2 }
] as const;

export default function Lesson33Shell({ currentView, setCurrentView }: { currentView: View, setCurrentView: (view: View) => void }) {
  // Map standard views to tabs if needed
  let activeTab = currentView;
  if (!tabs.find(t => t.id === currentView)) {
    activeTab = "lesson-33-overview";
  }

  const renderContent = () => {
    switch (activeTab) {
      case "lesson-33-overview": return <Lesson33Overview setCurrentView={setCurrentView} />;
      case "lesson-33-explorer": return <Lesson33Explorer setCurrentView={setCurrentView} />;
      case "lesson-33-blood": return <Lesson33Blood setCurrentView={setCurrentView} />;
      case "lesson-33-simulation": return <Lesson33Simulation setCurrentView={setCurrentView} />;
      case "lesson-33-diseases": return <Lesson33Diseases setCurrentView={setCurrentView} />;
      case "lesson-33-quiz": return <Lesson33Quiz setCurrentView={setCurrentView} />;
      default: return <Lesson33Overview setCurrentView={setCurrentView} />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Lesson Header */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#E0F0FF] flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm font-bold text-[#00BFFF] uppercase tracking-wider">
            <span>Khoa học tự nhiên 8</span>
            <span>•</span>
            <span>Phần cơ thể người</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#333]">Bài 33: Máu và hệ tuần hoàn</h1>
        </div>
        <div className="w-16 h-16 bg-[#F5F9FF] rounded-2xl flex items-center justify-center border border-[#E0F0FF]">
          <HeartPulse className="w-8 h-8 text-[#00BFFF]" />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 p-2 bg-white rounded-2xl shadow-sm border border-[#E0F0FF] overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentView(tab.id as View)}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap",
                isActive 
                  ? "bg-[#00BFFF] text-white shadow-lg shadow-[#00BFFF]/20" 
                  : "text-[#666] hover:bg-[#F5F9FF] hover:text-[#00BFFF]"
              )}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="min-h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
