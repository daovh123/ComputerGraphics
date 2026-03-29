import {
  LayersIcon as TLayersIcon,
  ActivityIcon as TActivityIcon,
} from "tdesign-icons-react";

export const lessonOverview = {
  title: "Khái quát về cơ thể người",
  description: "Bài học giúp em hình dung tổng quát về cấu tạo của cơ thể người, nhận biết các hệ cơ quan và sự phối hợp nhịp nhàng giữa chúng để tạo thành một khối thống nhất.",
  objectives: [
    "Kể tên được các cơ quan và hệ cơ quan trong cơ thể người.",
    "Nêu được chức năng chính của từng hệ cơ quan.",
    "Chứng minh được cơ thể người là một khối thống nhất thông qua sự phối hợp của các cơ quan.",
    "Khám phá các điểm đặc trưng của riêng từng cá nhân trong loài người."
  ]
};

export const sections = [
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
