import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { quizData } from "../data/quiz";
import { CheckCircle2, XCircle, Star, ChevronRight, RefreshCcw, Gamepad2, Info } from "lucide-react";
import { cn } from "../../../lib/utils";
import { motion, AnimatePresence } from "motion/react";
import BloodRoleChallenge from "../components/BloodRoleChallenge";

export default function Quiz() {
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
    if (index === quizData[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="max-w-[1000px] mx-auto py-10">
      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white p-10 md:p-16 rounded-[40px] md:rounded-[60px] border border-[#E0F0FF] shadow-xl shadow-[#00BFFF]/5 space-y-12"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="px-4 py-2 bg-[#F0F8FF] text-[#00BFFF] rounded-full text-sm font-bold tracking-widest uppercase shadow-sm flex items-center gap-2">
                  <Gamepad2 className="w-5 h-5" />
                  Câu hỏi {currentQuestion + 1} / {quizData.length}
                </span>
                <span className="text-xl font-black text-[#666]">Điểm: {score}</span>
              </div>
              <div className="w-full h-3 bg-[#F5F9FF] rounded-full overflow-hidden shadow-inner border border-[#E0F0FF]">
                <div 
                  className="h-full bg-gradient-to-r from-[#00BFFF] to-[#00CED1] transition-all duration-700 rounded-full" 
                  style={{ width: `${((currentQuestion) / quizData.length) * 100}%` }}
                ></div>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#333] leading-[1.3]">{quizData[currentQuestion].question}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {quizData[currentQuestion].options.map((option, index) => {
                const isSelected = selectedOption === index;
                const isCorrect = index === quizData[currentQuestion].correct;
                let bgState = "bg-white border-[#E0F0FF] hover:border-[#00BFFF]/50 hover:bg-[#F5F9FF] hover:scale-[1.02] shadow-sm";
                
                if (isAnswered) {
                  if (isSelected && isCorrect) bgState = "bg-green-50 border-green-400 text-green-700 shadow-md shadow-green-500/20";
                  else if (isSelected && !isCorrect) bgState = "bg-red-50 border-red-400 text-red-700 shadow-md shadow-red-500/20 opacity-80";
                  else if (!isSelected && isCorrect) bgState = "bg-green-50 border-green-200 text-green-700 shadow-sm opacity-60";
                  else bgState = "bg-slate-50 border-slate-200 text-slate-400 opacity-50 grayscale";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(index)}
                    disabled={isAnswered}
                    className={cn(
                      "p-6 md:p-8 rounded-[32px] border-2 text-left transition-all duration-300 flex items-center justify-between group",
                       bgState
                    )}
                  >
                    <div className="flex items-center gap-6">
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg transition-colors shadow-sm",
                        isAnswered && isCorrect ? "bg-green-500 text-white" : "",
                        isAnswered && isSelected && !isCorrect ? "bg-red-500 text-white" : "",
                        (!isAnswered || (!isSelected && !isCorrect)) ? "bg-[#F0F8FF] text-[#00BFFF] group-hover:bg-[#00BFFF] group-hover:text-white" : ""
                      )}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="font-bold text-xl">{option}</span>
                    </div>
                    {isAnswered && isSelected && (
                      isCorrect ? <CheckCircle2 className="w-8 h-8 text-green-500 animate-pulse" /> : <XCircle className="w-8 h-8 text-red-500" />
                    )}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pt-6 border-t border-[#E0F0FF] space-y-8">
                <div className={cn(
                  "p-6 md:p-8 rounded-[32px] border",
                  selectedOption === quizData[currentQuestion].correct 
                    ? "bg-green-50 border-green-100 text-green-800"
                    : "bg-red-50 border-red-100 text-red-800"
                )}>
                  <p className="font-bold text-lg leading-relaxed flex items-start gap-4">
                    <Info className="w-6 h-6 shrink-0 mt-1" />
                    <span>{quizData[currentQuestion].explanation}</span>
                  </p>
                </div>
                
                <div className="flex justify-end">
                  <button
                    onClick={handleNext}
                    className="bg-[#00BFFF] text-white px-12 py-5 rounded-2xl font-black text-xl shadow-xl shadow-[#00BFFF]/20 hover:bg-[#009ACD] hover:scale-105 transition-all flex items-center gap-2 group"
                  >
                    {currentQuestion === quizData.length - 1 ? "Xem kết quả" : "Câu tiếp theo"}
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-16 md:p-24 rounded-[60px] border border-[#E0F0FF] shadow-2xl shadow-[#00BFFF]/5 text-center space-y-12"
          >
            <div className="w-40 h-40 bg-[#F5F9FF] rounded-full flex items-center justify-center mx-auto text-yellow-400 border-[8px] border-yellow-100 shadow-xl relative overflow-hidden">
               <div className="absolute inset-0 bg-yellow-400/20 blur-2xl animate-spin-slow"></div>
               <Star className="w-20 h-20 fill-current relative z-10 drop-shadow-lg" />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-5xl font-black text-[#333]">Chúc mừng!</h2>
              <p className="text-[#666] text-2xl font-medium max-w-lg mx-auto leading-relaxed">
                Bạn đã hoàn thành bài kiểm tra với số điểm tuyệt vời.
              </p>
              <div className="text-8xl font-black text-[#00BFFF] drop-shadow-sm py-4">
                {score} <span className="text-4xl text-[#999]">/ {quizData.length}</span>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8 border-t border-[#E0F0FF]">
              <button
                onClick={resetQuiz}
                className="w-full md:w-auto bg-white text-[#00BFFF] border-2 border-[#E0F0FF] hover:border-[#00BFFF] px-12 py-5 rounded-2xl font-black text-xl hover:bg-[#F0F8FF] transition-all flex items-center justify-center gap-3"
              >
                <RefreshCcw className="w-5 h-5" /> Làm lại
              </button>
              <button 
                onClick={() => navigate("/lesson-33")}
                className="w-full md:w-auto bg-[#00BFFF] text-white px-12 py-5 rounded-2xl font-black text-xl shadow-xl shadow-[#00BFFF]/20 hover:bg-[#009ACD] transition-all"
              >
                Trở về Tổng quan
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <BloodRoleChallenge />
    </div>
  );
}
