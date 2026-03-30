import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckSquare, Activity, Heart, Wind, Droplets, User, ChevronRight, Info, Star, Play, ChevronLeft, CheckCircle2, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";

const quizItems = [
  { id: 1, question: "Hệ cơ quan nào giúp cơ thể vận động và nâng đỡ?", options: ["Hệ tuần hoàn", "Hệ vận động", "Hệ hô hấp", "Hệ tiêu hóa"], correct: 1 },
  { id: 2, question: "Cơ quan nào là trung tâm của hệ tuần hoàn?", options: ["Phổi", "Gan", "Tim", "Dạ dày"], correct: 2 },
  { id: 3, question: "Hệ hô hấp có chức năng chính là gì?", options: ["Tiêu hóa thức ăn", "Lọc máu", "Trao đổi khí", "Vận động"], correct: 2 },
];

export default function Summary() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === quizItems[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizItems.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-3 bg-white border border-[#E0F0FF] rounded-2xl text-[#00BFFF] hover:bg-[#F0F8FF] transition-colors shadow-sm"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="space-y-1">
            <h1 className="text-4xl font-extrabold text-[#333] tracking-tight">Tổng kết kiến thức</h1>
            <p className="text-[#666] text-lg">Kiểm tra lại những gì bạn đã học về cơ thể người.</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate("/lesson-30/challenge")}
            className="bg-[#00BFFF] text-white px-8 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-[#00BFFF]/20 hover:bg-[#009ACD] transition-all hover:scale-[1.02] flex items-center gap-2"
          >
            Nội dung tiếp theo <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Quiz Area */}
        <div className="lg:col-span-8">
          <AnimatePresence>
            {!showResult ? (
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white p-12 rounded-[60px] border border-[#E0F0FF] shadow-2xl shadow-[#00BFFF]/5 space-y-10"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#00BFFF] uppercase tracking-widest">Câu hỏi {currentQuestion + 1} / {quizItems.length}</span>
                    <div className="w-32 h-2 bg-[#F0F8FF] rounded-full overflow-hidden">
                      <div className="h-full bg-[#00BFFF] transition-all duration-500" style={{ width: `${((currentQuestion + 1) / quizItems.length) * 100}%` }}></div>
                    </div>
                  </div>
                  <h2 className="text-3xl font-extrabold text-[#333] leading-tight">{quizItems[currentQuestion].question}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {quizItems[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionClick(index)}
                      className={cn(
                        "p-6 rounded-3xl border-2 text-left transition-all duration-300 flex items-center justify-between group",
                        selectedOption === index 
                          ? (index === quizItems[currentQuestion].correct ? "bg-green-50 border-green-500 text-green-700" : "bg-red-50 border-red-500 text-red-700")
                          : (isAnswered && index === quizItems[currentQuestion].correct ? "bg-green-50 border-green-500 text-green-700" : "bg-white border-[#F0F8FF] hover:border-[#00BFFF] hover:bg-[#F5F9FF] text-[#666]")
                      )}
                    >
                      <span className="font-bold text-lg">{option}</span>
                      {selectedOption === index && (
                        index === quizItems[currentQuestion].correct ? <CheckCircle2 className="w-6 h-6 text-green-500" /> : <XCircle className="w-6 h-6 text-red-500" />
                      )}
                    </button>
                  ))}
                </div>

                {isAnswered && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-6 flex justify-end">
                    <button
                      onClick={handleNext}
                      className="bg-[#00BFFF] text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-[#00BFFF]/20 hover:bg-[#009ACD] transition-all flex items-center gap-2"
                    >
                      {currentQuestion === quizItems.length - 1 ? "Xem kết quả" : "Câu tiếp theo"}
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-16 rounded-[60px] border border-[#E0F0FF] shadow-2xl shadow-[#00BFFF]/5 text-center space-y-10"
              >
                <div className="w-32 h-32 bg-[#F0F8FF] rounded-full flex items-center justify-center mx-auto text-[#00BFFF]">
                  <Star className="w-16 h-16 fill-current" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-4xl font-extrabold text-[#333]">Chúc mừng bạn!</h2>
                  <p className="text-[#666] text-xl">Bạn đã hoàn thành bài tổng kết với số điểm {score}/{quizItems.length}</p>
                </div>
                <div className="flex items-center justify-center gap-6">
                  <button
                    onClick={() => {
                      setCurrentQuestion(0);
                      setSelectedOption(null);
                      setIsAnswered(false);
                      setScore(0);
                      setShowResult(false);
                    }}
                    className="bg-white text-[#00BFFF] border-2 border-[#00BFFF] px-10 py-4 rounded-2xl font-bold text-lg hover:bg-[#F0F8FF] transition-all"
                  >
                    Làm lại
                  </button>
                  <button
                    onClick={() => navigate("/lesson-30/challenge")}
                    className="bg-[#00BFFF] text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-[#00BFFF]/20 hover:bg-[#009ACD] transition-all"
                  >
                    Tiếp tục học
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-[40px] border border-[#E0F0FF] shadow-sm space-y-6">
            <h3 className="text-xl font-extrabold text-[#333]">Thống kê học tập</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#F5F9FF] rounded-2xl border border-[#E0F0FF]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#00BFFF] shadow-sm">
                    <CheckSquare className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold text-[#666]">Bài đã học</span>
                </div>
                <span className="font-extrabold text-[#333]">12/15</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-[#F5F9FF] rounded-2xl border border-[#E0F0FF]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#00BFFF] shadow-sm">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  </div>
                  <span className="text-sm font-bold text-[#666]">Điểm trung bình</span>
                </div>
                <span className="font-extrabold text-[#333]">9.2</span>
              </div>
            </div>
          </div>

          <div className="bg-[#1a1a1a] p-8 rounded-[40px] text-white shadow-2xl space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#00BFFF] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#00BFFF]/30">
                <Play className="w-6 h-6 fill-current" />
              </div>
              <h4 className="font-bold text-lg">Ôn tập nhanh</h4>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Xem lại các khái niệm quan trọng trước khi làm bài kiểm tra cuối chương.
            </p>
            <button className="w-full bg-white/10 hover:bg-white/20 text-white py-4 rounded-2xl font-bold text-sm transition-all">
              Bắt đầu ôn tập
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
