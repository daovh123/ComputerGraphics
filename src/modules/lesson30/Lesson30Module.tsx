import React from "react";
import { Link } from "react-router-dom";

export default function Lesson30Module() {
  return (
    <div className="bg-white border border-[#E0F0FF] rounded-3xl p-8 shadow-sm space-y-4">
      <p className="text-xs uppercase tracking-wider font-bold text-[#00BFFF]">
        Lesson 30 Workspace
      </p>
      <h2 className="text-2xl font-extrabold text-[#333]">
        Bài 30: Khái quát về cơ thể người
      </h2>
      <p className="text-[#556070] mt-2">
        Đây là điểm vào riêng để nhóm phụ trách Bài 30 phát triển độc lập. Nội
        dung cũ vẫn truy cập được qua các route chi tiết.
      </p>
      <Link
        to="/lesson-overview"
        className="inline-flex px-4 py-2 rounded-xl bg-[#F0F8FF] text-[#00BFFF] font-bold hover:bg-[#E0F2FF] transition-colors"
      >
        Vào luồng học Bài 30 hiện tại
      </Link>
    </div>
  );
}
