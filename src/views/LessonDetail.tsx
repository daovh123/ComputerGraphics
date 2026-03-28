import React, { useState } from "react";
import {
  Button,
  Card,
  Tag,
  Collapse,
  Breadcrumb,
  Tooltip,
  Row,
  Col,
  Divider,
} from "tdesign-react";
import {
  PlayCircleIcon as TPlayCircleIcon,
  LayersIcon as TLayersIcon,
  ActivityIcon as TActivityIcon,
  ChevronLeftIcon as TChevronLeftIcon,
  ChevronRightIcon as TChevronRightIcon,
  StarFilledIcon as TStarFilledIcon,
  InfoCircleIcon as TInfoCircleIcon,
  BookIcon as TBookIcon,
} from "tdesign-icons-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import { View } from "../types";

const { Panel } = Collapse;
const { BreadcrumbItem } = Breadcrumb;

const sections = [
  {
    id: 1,
    title: "I. Các hệ cơ quan trong cơ thể",
    content:
      "Cơ thể người được cấu tạo từ các hệ cơ quan khác nhau, mỗi hệ đảm nhận một chức năng riêng biệt nhưng phối hợp chặt chẽ với nhau.",
    icon: TLayersIcon,
  },
  {
    id: 2,
    title: "II. Hệ vận động",
    content:
      "Bao gồm xương và cơ, giúp cơ thể di chuyển và nâng đỡ trọng lượng.",
    icon: TActivityIcon,
  },
  {
    id: 3,
    title: "III. Hệ tuần hoàn",
    content:
      "Bao gồm tim và hệ thống mạch máu, vận chuyển oxy và chất dinh dưỡng đến các tế bào.",
    icon: TActivityIcon,
  },
  {
    id: 4,
    title: "IV. Hệ hô hấp",
    content: "Giúp cơ thể lấy oxy từ môi trường và thải khí cacbonic ra ngoài.",
    icon: TActivityIcon,
  },
];

export default function LessonDetail({
  setCurrentView,
  goBack,
}: {
  setCurrentView: (view: View) => void;
  goBack: () => void;
}) {
  const [activeSection, setActiveSection] = useState<(string | number)[]>([1]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-[1400px] mx-auto space-y-10 pb-20"
    >
      {/* Breadcrumbs & Back Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Button
            variant="outline"
            shape="round"
            icon={<TChevronLeftIcon size="20px" />}
            onClick={goBack}
            className="!border-slate-200 !text-slate-600 hover:!bg-white !h-14 !w-14 !p-0 !rounded-2xl shadow-sm"
          />
          <Breadcrumb
            separator={
              <TChevronRightIcon size="14px" className="text-slate-300" />
            }
          >
            <BreadcrumbItem onClick={() => setCurrentView("dashboard")}>
              <span className="text-slate-400 font-semibold hover:text-[#00BFFF] transition-colors">
                Khoa học Tự nhiên 8
              </span>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <span className="text-slate-800 font-bold font-display text-lg">
                Bài 30: Khái quát về cơ thể người
              </span>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="text"
            className="!font-bold !text-slate-400 hover:!text-[#00BFFF]"
          >
            Lưu bài học
          </Button>
          <Button
            theme="primary"
            variant="outline"
            className="!rounded-xl !font-bold"
          >
            Chia sẻ
          </Button>
        </div>
      </div>

      <Row gutter={[48, 48]}>
        {/* Left Column: 3D Model View */}
        <Col xs={24} lg={14} className="space-y-8">
          <Card className="!rounded-[48px] !overflow-hidden !border-none shadow-2xl shadow-slate-200/50 group bg-white">
            <div className="relative aspect-[16/10]">
              <img
                src="https://picsum.photos/seed/human/1600/1000"
                alt="Human Anatomy 3D"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"></div>

              {/* 3D Interaction Controls Overlay */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-white/90 backdrop-blur-2xl px-10 py-5 rounded-[32px] shadow-2xl border border-white/50 transition-all hover:scale-105">
                <Tooltip content="Lớp cấu tạo">
                  <Button
                    variant="text"
                    shape="square"
                    icon={<TLayersIcon size="24px" />}
                    className="!text-[#00BFFF] !h-12 !w-12 hover:!bg-[#F0F8FF] !rounded-xl"
                  />
                </Tooltip>
                <Tooltip content="Hoạt động">
                  <Button
                    variant="text"
                    shape="square"
                    icon={<TActivityIcon size="24px" />}
                    className="!text-[#00BFFF] !h-12 !w-12 hover:!bg-[#F0F8FF] !rounded-xl"
                  />
                </Tooltip>
                <Divider layout="vertical" className="!h-8 !mx-2" />
                <Button
                  theme="primary"
                  className="!rounded-2xl !px-10 !h-14 !font-bold shadow-xl shadow-[#00BFFF]/30 !text-lg"
                >
                  Tương tác 3D
                </Button>
              </div>

              {/* Floating Info Tags */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="absolute top-1/3 left-1/4 w-12 h-12 bg-[#00BFFF] rounded-full border-4 border-white shadow-2xl cursor-pointer flex items-center justify-center text-white group/pin"
              >
                <div className="w-4 h-4 bg-white rounded-full animate-ping absolute"></div>
                <div className="w-4 h-4 bg-white rounded-full relative z-10"></div>
                <div className="absolute top-full mt-4 bg-white text-slate-800 px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 group-hover/pin:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-slate-100">
                  Hệ tuần hoàn
                </div>
              </motion.div>
            </div>
          </Card>

          <Card className="!rounded-[32px] !border-none !shadow-sm hover:!shadow-xl transition-all bg-white overflow-hidden">
            <div className="flex items-center justify-between p-6">
              <div className="flex items-center gap-8">
                <div className="w-20 h-20 bg-gradient-to-br from-[#00BFFF] to-[#007BA7] rounded-[24px] flex items-center justify-center text-white shadow-xl shadow-[#00BFFF]/20">
                  <TPlayCircleIcon size="40px" />
                </div>
                <div>
                  <h4 className="font-bold text-2xl text-slate-800 mb-1 font-display">
                    Video bài giảng
                  </h4>
                  <p className="text-slate-400 font-semibold uppercase tracking-widest text-xs">
                    Thời lượng: 12:45 • HD 1080p
                  </p>
                </div>
              </div>
              <Button
                theme="primary"
                variant="base"
                className="!rounded-2xl !px-10 !font-bold !h-14 !text-lg shadow-lg shadow-[#00BFFF]/20"
              >
                Xem ngay
              </Button>
            </div>
          </Card>
        </Col>

        {/* Right Column: Information Accordion */}
        <Col xs={24} lg={10} className="space-y-8">
          <Card className="!rounded-[48px] !border-none !p-10 shadow-sm bg-white">
            <div className="space-y-10">
              <div className="space-y-6">
                <Tag
                  variant="light"
                  theme="primary"
                  shape="round"
                  className="!rounded-full !px-5 !py-1.5 !bg-[#F0F8FF] !text-[#00BFFF] !border-none"
                >
                  <div className="flex items-center gap-2">
                    <TBookIcon size="16px" />
                    <span className="font-bold uppercase tracking-widest text-[11px]">
                      Kiến thức trọng tâm
                    </span>
                  </div>
                </Tag>
                <h2 className="text-5xl font-black text-slate-800 leading-[1.1] font-display">
                  Bài 30: Khái quát về cơ thể người
                </h2>
                <div className="flex items-center gap-6 pt-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
                    <TStarFilledIcon className="text-yellow-400" size="18px" />
                    <span className="text-slate-600">4.8</span>
                    <span className="font-medium text-slate-300">
                      (1.2k đánh giá)
                    </span>
                  </div>
                  <div className="w-1.5 h-1.5 bg-slate-200 rounded-full"></div>
                  <span className="text-sm font-bold text-slate-400">
                    Cập nhật: 24/03/2026
                  </span>
                </div>
              </div>

              <Collapse
                value={activeSection}
                onChange={setActiveSection}
                className="!border-none !bg-transparent"
              >
                {sections.map((section) => (
                  // TDesign Collapse exposes active values as an array.
                  // We keep the state typed accordingly and check membership.
                  // This avoids runtime/typing mismatch in strict TS mode.
                  <Panel
                    key={section.id}
                    value={section.id}
                    header={
                      <div className="flex items-center gap-5 py-2">
                        <div
                          className={cn(
                            "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500",
                            activeSection.includes(section.id)
                              ? "bg-[#00BFFF] text-white shadow-xl shadow-[#00BFFF]/30 rotate-6"
                              : "bg-slate-50 text-slate-400",
                          )}
                        >
                          <section.icon size="24px" />
                        </div>
                        <span
                          className={cn(
                            "font-bold text-lg transition-colors",
                            activeSection.includes(section.id)
                              ? "text-slate-800"
                              : "text-slate-500",
                          )}
                        >
                          {section.title}
                        </span>
                      </div>
                    }
                    className="!border-none !bg-slate-50/50 hover:!bg-slate-50 !rounded-[24px] !mb-6 !transition-all !overflow-hidden"
                  >
                    <div className="space-y-6 pl-16 pr-6 pb-6">
                      <p className="text-slate-600 leading-relaxed font-medium text-base">
                        {section.content}
                      </p>
                      <div className="flex items-center gap-8">
                        <Button
                          variant="text"
                          theme="primary"
                          size="small"
                          className="!font-bold !p-0 !text-[#00BFFF] hover:!underline"
                          icon={<TInfoCircleIcon />}
                        >
                          Chi tiết
                        </Button>
                        <Button
                          variant="text"
                          theme="primary"
                          size="small"
                          className="!font-bold !p-0 !text-[#00BFFF] hover:!underline"
                          icon={<TLayersIcon />}
                        >
                          Mô hình 3D
                        </Button>
                      </div>
                    </div>
                  </Panel>
                ))}
              </Collapse>

              <Button
                theme="primary"
                block
                size="large"
                className="!rounded-[24px] !h-20 !text-xl !font-bold shadow-2xl shadow-[#00BFFF]/30 !mt-10"
                onClick={() => setCurrentView("body-parts")}
              >
                Nội dung tiếp theo
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </motion.div>
  );
}
