import React, { useState } from "react";
import { 
  Button, 
  Card, 
  Row, 
  Col, 
  Tooltip,
  Divider
} from "tdesign-react";
import { 
  ControlPlatformIcon as TGamepadIcon,
  ActivityIcon as TActivityIcon,
  ChevronRightIcon as TChevronRightIcon,
  ChevronLeftIcon as TChevronLeftIcon,
  StarIcon as TStarIcon,
  CheckCircleIcon as TCheckCircleIcon,
  InfoCircleIcon as TInfoCircleIcon,
  RefreshIcon as TRefreshIcon
} from "tdesign-icons-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";
import { type View } from "../../router/views";

const puzzleParts = [
  { id: "brain", label: "Não bộ", position: { top: "10%", left: "45%" }, color: "#FFB6C1" },
  { id: "heart", label: "Tim", position: { top: "30%", left: "45%" }, color: "#FF4500" },
  { id: "lungs", label: "Phổi", position: { top: "30%", left: "55%" }, color: "#00BFFF" },
  { id: "liver", label: "Gan", position: { top: "45%", left: "40%" }, color: "#CD5C5C" },
  { id: "stomach", label: "Dạ dày", position: { top: "45%", left: "55%" }, color: "#FFD700" },
  { id: "intestines", label: "Ruột", position: { top: "60%", left: "48%" }, color: "#DEB887" },
];

export default function Challenge({ setCurrentView, goBack }: { setCurrentView: (view: View) => void, goBack: () => void }) {
  const [placedParts, setPlacedParts] = useState<string[]>([]);
  const [selectedPart, setSelectedPart] = useState<string | null>(null);

  const handlePartClick = (partId: string) => {
    if (placedParts.includes(partId)) return;
    setSelectedPart(partId);
  };

  const handleTargetClick = (partId: string) => {
    if (selectedPart === partId) {
      setPlacedParts([...placedParts, partId]);
      setSelectedPart(null);
    }
  };

  const resetGame = () => {
    setPlacedParts([]);
    setSelectedPart(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[1400px] mx-auto space-y-12 pb-20"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Button 
            variant="outline" 
            shape="round" 
            icon={<TChevronLeftIcon size="20px" />}
            onClick={goBack}
            className="!border-slate-200 !text-slate-600 hover:!bg-white !h-14 !w-14 !p-0 !rounded-2xl shadow-sm"
          />
          <div className="space-y-2">
            <h1 className="text-5xl font-black text-slate-800 tracking-tight font-display">Giải trí & Thử thách</h1>
            <p className="text-slate-400 text-xl font-medium">Lắp ghép các bộ phận cơ thể vào đúng vị trí để hoàn thành thử thách.</p>
          </div>
        </div>
        <Button 
          theme="primary" 
          size="large"
          suffix={<TChevronRightIcon size="20px" />}
          onClick={() => setCurrentView("characteristics")}
          className="!rounded-[24px] !px-12 !font-bold !h-16 !text-lg shadow-2xl shadow-[#00BFFF]/30 transition-transform hover:scale-105"
        >
          Nội dung tiếp theo
        </Button>
      </div>

      <Row gutter={[48, 48]}>
        {/* Puzzle Board */}
        <Col xs={24} lg={8}>
          <Card
            className="!rounded-[64px] !overflow-hidden !border-none shadow-2xl shadow-slate-200/50 bg-white flex items-center justify-center p-16 relative min-h-[700px]"
          >
            <div className="relative aspect-[4/5] w-full max-w-lg flex items-center justify-center">
              {/* Human Body Silhouette */}
              <div className="relative h-full aspect-[1/2] opacity-5 pointer-events-none">
                <img src="https://picsum.photos/seed/human-silhouette/800/1600" alt="Silhouette" className="w-full h-full object-contain" />
              </div>

              {/* Puzzle Targets */}
              {puzzleParts.map((part) => (
                <button
                  key={part.id}
                  onClick={() => handleTargetClick(part.id)}
                  className={cn(
                    "absolute w-20 h-20 rounded-full border-2 border-dashed border-slate-200 transition-all duration-500 flex items-center justify-center group",
                    placedParts.includes(part.id) ? "border-solid border-[#00BFFF] bg-slate-50 scale-110 shadow-xl" : "hover:border-[#00BFFF] hover:bg-slate-50",
                    selectedPart === part.id && "border-solid border-[#00BFFF] bg-[#00BFFF]/10 animate-pulse scale-110"
                  )}
                  style={{ top: part.position.top, left: part.position.left }}
                >
                  <AnimatePresence mode="wait">
                    {placedParts.includes(part.id) ? (
                      <motion.div 
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-xl" 
                        style={{ backgroundColor: part.color }}
                      >
                        <TCheckCircleIcon size="32px" />
                      </motion.div>
                    ) : (
                      <div className="w-3 h-3 bg-slate-200 rounded-full group-hover:bg-[#00BFFF] transition-colors"></div>
                    )}
                  </AnimatePresence>
                </button>
              ))}
            </div>

            {/* Success Message Overlay */}
            <AnimatePresence>
              {placedParts.length === puzzleParts.length && (
                <motion.div
                  initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                  animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
                  exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                  className="absolute inset-0 bg-[#00BFFF]/80 flex flex-col items-center justify-center text-white z-50 p-16 text-center space-y-12"
                >
                  <motion.div 
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    className="w-48 h-48 bg-white rounded-full flex items-center justify-center text-[#00BFFF] shadow-2xl shadow-black/20 relative group"
                  >
                    <div className="absolute inset-0 bg-white/30 rounded-full animate-ping"></div>
                    <TStarIcon size="96px" className="fill-current relative z-10" />
                  </motion.div>
                  
                  <div className="space-y-6">
                    <h2 className="text-6xl font-black tracking-tight font-display">Tuyệt vời!</h2>
                    <p className="text-white/90 text-2xl max-w-xl font-medium leading-relaxed">
                      Bạn đã hoàn thành thử thách lắp ghép cơ thể người một cách xuất sắc.
                    </p>
                  </div>
                  
                  <Button 
                    variant="base"
                    size="large"
                    onClick={resetGame}
                    className="!bg-white !text-[#00BFFF] !px-16 !py-6 !rounded-[32px] !font-black !text-2xl shadow-2xl hover:!scale-110 transition-all !h-20"
                  >
                    Chơi lại
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </Col>

        {/* Part Selection Sidebar */}
        <Col xs={24} lg={4} className="space-y-8">
          <Card className="!rounded-[48px] !border-none !p-10 shadow-sm bg-white space-y-10">
            <h3 className="text-3xl font-black text-slate-800 font-display">Các bộ phận</h3>
            <div className="grid grid-cols-2 gap-5">
              {puzzleParts.map((part) => (
                <button
                  key={part.id}
                  onClick={() => handlePartClick(part.id)}
                  disabled={placedParts.includes(part.id)}
                  className={cn(
                    "p-6 rounded-[32px] border-2 transition-all duration-500 flex flex-col items-center gap-5 group relative overflow-hidden",
                    placedParts.includes(part.id) 
                      ? "bg-slate-50 border-slate-100 opacity-40 grayscale cursor-not-allowed" 
                      : selectedPart === part.id 
                        ? "bg-slate-50 border-[#00BFFF] shadow-2xl shadow-[#00BFFF]/20 -translate-y-2 scale-105 z-10" 
                        : "bg-transparent border-slate-100 hover:border-[#00BFFF]/50 hover:bg-slate-50"
                  )}
                >
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-xl rotate-3 group-hover:rotate-12 transition-transform" style={{ backgroundColor: part.color }}>
                    <TActivityIcon size="32px" />
                  </div>
                  <span className={cn("font-bold text-base transition-colors", selectedPart === part.id ? "text-slate-800" : "text-slate-500 group-hover:text-slate-800")}>{part.label}</span>
                </button>
              ))}
            </div>
          </Card>

          <Card 
            className="!bg-slate-900 !p-10 !rounded-[48px] !text-white shadow-2xl space-y-10 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00BFFF]/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
            
            <div className="flex items-center gap-5 relative z-10">
              <div className="w-16 h-16 bg-[#00BFFF] rounded-[24px] flex items-center justify-center text-white shadow-2xl shadow-[#00BFFF]/40 rotate-3 group-hover:rotate-12 transition-transform">
                <TGamepadIcon size="32px" />
              </div>
              <h4 className="font-black text-2xl font-display">Hướng dẫn chơi</h4>
            </div>
            
            <p className="text-slate-400 text-lg leading-relaxed font-medium relative z-10">
              Chọn một bộ phận ở bên phải, sau đó nhấn vào vị trí tương ứng trên cơ thể người để lắp ghép.
            </p>
            
            <div className="pt-4 flex items-center gap-4 text-sm font-bold text-[#00BFFF] relative z-10">
              <div className="w-8 h-8 rounded-full bg-[#00BFFF]/10 flex items-center justify-center">
                <TInfoCircleIcon size="20px" />
              </div>
              <span>Gợi ý: Não bộ nằm ở phần cao nhất.</span>
            </div>
            
            <Button 
              variant="base" 
              block 
              icon={<TRefreshIcon size="20px" />}
              onClick={resetGame}
              className="!bg-white/10 hover:!bg-white/20 !text-white !border-none !rounded-[20px] !font-bold !h-16 !text-base relative z-10"
            >
              Đặt lại thử thách
            </Button>
          </Card>
        </Col>
      </Row>
    </motion.div>
  );
}
