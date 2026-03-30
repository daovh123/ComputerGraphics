import { Activity, Droplet } from "lucide-react";

export const lessonOverview = {
  title: "Máu và Hệ tuần hoàn",
  description: "Khám phá dòng chảy sự sống trong cơ thể bạn: từ cấu tạo của máu, nguyên tắc truyền máu cho đến sự hoạt động nhịp nhàng của trái tim và hệ mạch.",
  objectives: [
    "Nêu được các thành phần của máu và chức năng của chúng.",
    "Trình bày được khái niệm miễn dịch, kháng nguyên, kháng thể.",
    "Giải thích được nguyên tắc truyền máu dựa trên nhóm máu ABO.",
    "Mô tả được cấu tạo của tim và hệ mạch.",
    "Trình bày được sự tuần hoàn của máu trong cơ thể (2 vòng tuần hoàn)."
  ],
  quickActions: [
    {
      id: "explorer",
      title: "Mô hình 3D Trái tim",
      description: "Khám phá cấu tạo tĩnh",
      path: "/lesson-33/explorer",
      icon: Activity,
      iconBgClassName: "bg-blue-500/20",
      iconClassName: "text-blue-400",
    },
    {
      id: "blood",
      title: "Cấu tạo Máu",
      description: "Tế bào máu & Huyết tương",
      path: "/lesson-33/blood",
      icon: Droplet,
      iconBgClassName: "bg-red-500/20",
      iconClassName: "text-red-400",
    },
  ]
};
