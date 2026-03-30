import React from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Divider,
  Row,
  Tag,
} from "tdesign-react";
import {
  ActivityIcon as TActivityIcon,
  BookIcon as TBookIcon,
  ChevronLeftIcon as TChevronLeftIcon,
  ChevronRightIcon as TChevronRightIcon,
  LayersIcon as TLayersIcon,
  PlayCircleIcon as TPlayCircleIcon,
  StarFilledIcon as TStarFilledIcon,
} from "tdesign-icons-react";
import { motion } from "motion/react";
import { useParams } from "react-router-dom";
import { getLessonById } from "../lessons/registry";

const { BreadcrumbItem } = Breadcrumb;

interface LessonPlaceholderProps {
  goBack: () => void;
}

export default function LessonPlaceholder({
  goBack,
}: LessonPlaceholderProps) {
  const { lessonId = "" } = useParams();
  const lesson = getLessonById(lessonId);
  const title = lesson?.title ?? "Bài học đang cập nhật";
  const placeholder = lesson?.placeholder ?? {
    eyebrow: "Kiến thức trọng tâm",
    summary: "Nội dung bài học này đang được biên soạn.",
    videoStatusLabel: "Sắp ra mắt",
    rating: 4.8,
    parts: [
      {
        id: 1,
        title: "Phần 1: Đang cập nhật",
        content: "Nội dung phần này đang được biên soạn.",
      },
      {
        id: 2,
        title: "Phần 2: Đang cập nhật",
        content: "Nội dung phần này đang được biên soạn.",
      },
    ],
  };
  const heading = placeholder.title ?? title;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[1400px] mx-auto space-y-12 pb-20"
    >
      <div className="flex items-center gap-8">
        <Button
          variant="outline"
          shape="round"
          icon={<TChevronLeftIcon size="20px" />}
          onClick={goBack}
          className="!border-slate-200 !text-slate-600 hover:!bg-white !h-14 !w-14 !p-0 !rounded-2xl shadow-sm"
        />
        <Breadcrumb separator={<TChevronRightIcon size="16px" className="text-slate-300" />}>
          <BreadcrumbItem
            href="/dashboard"
            className="!cursor-pointer hover:!text-[#00BFFF] !text-slate-400 !font-medium"
          >
            Khoa học tự nhiên 8
          </BreadcrumbItem>
          <BreadcrumbItem className="!font-black !text-slate-800 font-display">
            {title}
          </BreadcrumbItem>
        </Breadcrumb>
      </div>

      <Row gutter={[48, 48]}>
        <Col xs={24} lg={14} className="space-y-8">
          <Card className="!rounded-[64px] !border-none shadow-2xl shadow-slate-200/50 !p-16 space-y-12 bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-slate-50 rounded-full translate-x-1/2 -translate-y-1/2"></div>

            <div className="flex items-center gap-8 border-b border-slate-50 pb-10 relative z-10">
              <div className="w-20 h-20 bg-slate-50 rounded-[28px] flex items-center justify-center text-[#00BFFF] shadow-inner rotate-3">
                <TLayersIcon size="40px" />
              </div>
              <div className="space-y-1">
                <h2 className="text-4xl font-black text-slate-800 font-display">{heading}</h2>
                <p className="text-slate-400 text-lg font-medium">
                  {placeholder.summary}
                </p>
              </div>
            </div>

            <div className="space-y-8 relative z-10">
              {placeholder.parts.map((part) => (
                <motion.div
                  key={part.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: part.id * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="p-10 bg-slate-50 rounded-[40px] border border-slate-100 hover:border-[#00BFFF]/30 transition-all duration-500 group shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:bg-white"
                >
                  <h3 className="text-2xl font-black text-slate-800 group-hover:text-[#00BFFF] transition-colors mb-4 font-display">
                    {part.title}
                  </h3>
                  <p className="text-slate-500 text-lg leading-relaxed font-medium">{part.content}</p>
                </motion.div>
              ))}
            </div>
          </Card>

          <Card className="!rounded-[40px] !border-none !p-8 shadow-sm bg-white group overflow-hidden relative">
            <div className="absolute inset-0 bg-slate-50/50 -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-8">
                <div className="w-16 h-16 bg-slate-50 rounded-[24px] flex items-center justify-center text-[#00BFFF] shadow-inner group-hover:scale-110 transition-transform">
                  <TPlayCircleIcon size="32px" />
                </div>
              <div>
                <h4 className="font-black text-xl text-slate-800 font-display">Video bài giảng</h4>
                  <p className="text-xs text-slate-400 font-black uppercase tracking-[0.2em] font-display">{placeholder.videoStatusLabel}</p>
                </div>
              </div>
              <Button disabled variant="base" className="!bg-slate-100 !text-slate-400 !px-10 !py-4 !rounded-[20px] !font-black !text-sm !h-14">
                Chưa có
              </Button>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={10} className="space-y-8">
          <Card className="!rounded-[64px] !border-none !p-16 shadow-2xl shadow-slate-200/50 bg-white space-y-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700"></div>

            <div className="space-y-6 relative z-10">
              <Tag theme="primary" variant="light" className="!rounded-full !px-6 !py-2 !font-black !text-xs !tracking-[0.2em] uppercase !border-none !bg-[#00BFFF]/10 !text-[#00BFFF]">
                <TBookIcon size="16px" className="mr-3" />
                {placeholder.eyebrow}
              </Tag>
              <h2 className="text-5xl font-black text-slate-800 leading-tight font-display">{heading}</h2>
              <div className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-3 text-base font-black text-slate-400 font-display">
                  <TStarFilledIcon size="24px" className="text-yellow-400" />
                  <span className="text-slate-800">{placeholder.rating}</span>/5.0
                </div>
                <Divider layout="vertical" className="!border-slate-100 !h-6" />
                <span className="text-base font-black text-slate-400 font-display uppercase tracking-widest">
                  {placeholder.parts.length} phần học
                </span>
              </div>
            </div>

            <div className="p-12 bg-slate-50 rounded-[48px] border border-slate-100 text-center space-y-8 shadow-inner relative group/info overflow-hidden">
              <div className="absolute inset-0 bg-white opacity-0 group-hover/info:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 space-y-6">
                <TActivityIcon size="64px" className="text-[#00BFFF] mx-auto drop-shadow-xl group-hover/info:scale-110 transition-transform" />
                <p className="text-slate-500 text-xl leading-relaxed font-medium">
                  Bạn đang xem nội dung tóm tắt của <strong>{heading}</strong>. Hãy đọc kỹ từng phần để nắm vững kiến thức nhé!
                </p>
              </div>
            </div>

            <Button
              theme="primary"
              size="large"
              block
              icon={<TChevronLeftIcon size="24px" />}
              onClick={goBack}
              className="!rounded-[32px] !py-6 !font-black !text-xl shadow-2xl shadow-[#00BFFF]/30 !h-20 transition-transform hover:scale-105 relative z-10"
            >
              Quay lại
            </Button>
          </Card>
        </Col>
      </Row>
    </motion.div>
  );
}
