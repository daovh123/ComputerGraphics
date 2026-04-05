import heCoSau from "../../assets/img/he_co_sau.jpg";
import heCoTruoc from "../../assets/img/he_co_truoc.jpg";
import heXuongSau from "../../assets/img/he_xuong_sau.jpg";
import heXuongTruoc from "../../assets/img/he_xuong_truoc.jpg";
import coXuongModel from "../../assets/3d/co_xuong.glb";
import type { BodySystem, BodyView, Lesson31TabOption } from "./types";

export const lesson31Tabs: Lesson31TabOption[] = [
  { id: "overview", label: "Tổng quan" },
  { id: "anatomy", label: "Cấu tạo & chức năng" },
  { id: "movement-function", label: "Chức năng vận động" },
  { id: "diseases", label: "Bệnh hệ vận động" },
  { id: "model3d", label: "Mô hình 3D" },
  { id: "quiz", label: "Quiz" },
  { id: "summary", label: "Tổng kết" },
];

export const lesson31Header = {
  title: "Bài 31: Hệ vận động ở người",
  description:
    "Hệ vận động gồm xương và cơ, giúp nâng đỡ, bảo vệ cơ thể và tạo ra vận động.",
};

export const lesson31Overview = {
  goals: [
    "Nhận biết hệ vận động gồm bộ xương và hệ cơ.",
    "Hiểu xương tạo khung cơ thể, cơ bám vào xương để tạo vận động.",
    "Phân tích các chức năng chính: nâng đỡ, bảo vệ và vận động.",
  ],
  quickFacts: [
    "Bộ xương là khung cứng, giúp cơ thể đứng vững.",
    "Cơ co - giãn tạo lực kéo lên xương qua khớp.",
    "Xương và cơ luôn phối hợp để thực hiện động tác.",
  ],
};

export const lesson31Summary = {
  structureTitle: "Cấu tạo",
  structureText: "Hệ vận động gồm xương và cơ.",
  functionTitle: "Chức năng",
  functionText: "Xương nâng đỡ, bảo vệ; cơ giúp cơ thể cử động.",
  bullets: [
    "Hệ vận động gồm xương và cơ.",
    "Xương giúp nâng đỡ và bảo vệ cơ thể.",
    "Cơ giúp cơ thể cử động.",
    "Vận động và tập luyện giúp cơ thể khỏe mạnh.",
  ],
  keyPoints: [
    "Xương tạo khung, cơ tạo lực, khớp giúp cử động linh hoạt.",
    "Khi cơ co - giãn, xương sẽ chuyển động theo.",
    "Giữ tư thế đúng giúp bảo vệ cột sống và khớp.",
    "Dinh dưỡng tốt và vận động đều giúp hệ vận động phát triển khỏe mạnh.",
  ],
  selfCheckQuestions: [
    "Vì sao xương và cơ cần phối hợp với nhau để tạo vận động?",
    "Nếu ngồi học sai tư thế lâu ngày, phần nào của hệ vận động dễ bị ảnh hưởng?",
    "Nêu 2 thói quen hằng ngày giúp hệ vận động khỏe mạnh.",
  ],
  dailyHabits: [
    "Ngồi học đúng tư thế, giữ lưng thẳng.",
    "Đeo balo hai quai, tránh đeo lệch một bên.",
    "Ăn đủ canxi, đạm, rau xanh và uống đủ nước.",
    "Vận động ít nhất 30 phút mỗi ngày.",
    "Ngủ đủ giấc để cơ và xương phục hồi tốt hơn.",
  ],
  finalMessage:
    "Hiểu đúng hệ vận động sẽ giúp em biết cách học tập, sinh hoạt và luyện tập để cơ thể luôn khỏe mạnh.",
};

export const lesson31ImageMap: Record<BodySystem, Record<BodyView, string>> = {
  muscle: {
    front: heCoTruoc,
    back: heCoSau,
  },
  skeleton: {
    front: heXuongTruoc,
    back: heXuongSau,
  },
};

export const lesson31Model3D = {
  src: coXuongModel,
  caption:
    "Kéo chuột để xoay, lăn chuột để phóng to hoặc thu nhỏ mô hình hệ vận động.",
};
