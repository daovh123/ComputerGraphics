import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { SUBJECTS } from "../subjects/registry";

interface LibraryProps {
  navigateToPath: (path: string) => void;
  goBack: () => void;
  setSelectedSubjectId: (id: string) => void;
}

export default function Library({
  navigateToPath,
  goBack,
  setSelectedSubjectId,
}: LibraryProps) {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 flex items-center gap-4">
        <button
          onClick={goBack}
          className="p-3 bg-white border border-[#E0F0FF] rounded-2xl text-[#00BFFF] hover:bg-[#F0F8FF] transition-colors shadow-sm"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-3xl font-extrabold text-[#005F8F] mb-2">
            Thư viện học liệu lớp 8
          </h1>
          <p className="text-[#666]">
            Khám phá các môn học và tài liệu học tập dành cho học sinh lớp 8.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SUBJECTS.map((subject, index) => (
          <motion.div
            key={subject.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -5 }}
            onClick={() => {
              setSelectedSubjectId(subject.id);
              navigateToPath("/dashboard");
            }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-[#E0F0FF] hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg"
                style={{ backgroundColor: subject.color }}
              >
                <subject.icon className="w-8 h-8" />
              </div>
              <div className="p-2 bg-[#F5F9FF] rounded-full group-hover:bg-[#00BFFF] group-hover:text-white transition-colors text-[#00BFFF]">
                <ChevronRight className="w-5 h-5" />
              </div>
            </div>

            <h3 className="text-xl font-bold text-[#333] mb-1 group-hover:text-[#00BFFF] transition-colors">
              {subject.name}
            </h3>

            {subject.description && (
              <p className="text-xs text-[#999] mb-3">{subject.description}</p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
