import { Lesson31Disease } from "./types";

export const lesson31DiseasesData: Lesson31Disease[] = [
  {
    id: "scoliosis",
    title: "Tật cong vẹo cột sống",
    shortDescription:
      "Tình trạng cột sống không giữ được trạng thái bình thường, các đốt sống bị xoay lệch về một bên, cong quá mức về phía trước hay phía sau.",
    causes: [
      "Tư thế hoạt động không đúng trong thời gian dài (ngồi, bàn ghế không phù hợp).",
      "Mang vác vật nặng thường xuyên.",
      "Do tai nạn hay biến chứng còi xương.",
    ],
    symptoms: [
      "Xương sống bị cong hoặc lệch sang một bên.",
      "Hai vai mất cân bằng, không đều nhau.",
      "Cảm giác đau mỏi lưng thường xuyên.",
    ],
    prevention: [
      "Đảm bảo tư thế ngồi học ngay ngắn.",
      "Lao động và tập luyện vừa sức, cân đối.",
      "Đảm bảo chế độ dinh dưỡng hợp lí.",
    ],
    doList: ["Đeo cặp trên 2 vai", "Ngồi học thẳng lưng, đúng tư thế"],
    avoidList: ["Ngồi học gù lưng, cúi sát mặt bàn", "Mang vác cặp xách lệch một bên"],
  },
  {
    id: "osteoporosis",
    title: "Bệnh loãng xương",
    shortDescription:
      "Tình trạng mật độ chất khoáng trong xương thưa dần, làm xương giòn và dễ gãy.",
    causes: [
      "Cơ thể thiếu hụt Canxi (Calcium) và Photpho (Phosphorus).",
      "Chế độ dinh dưỡng không đầy đủ nguyên liệu kiến tạo xương.",
      "Phổ biến do sự thoái hoá ở người cao tuổi.",
    ],
    symptoms: [
      "Có nguy cơ gãy xương cao khi va chạm nhẹ.",
      "Thường suy giảm chiều cao theo thời gian.",
      "Đau nhức thầm lặng ở các khung xương.",
    ],
    prevention: [
      "Tập thể dục, thể thao đều đặn và vừa sức.",
      "Chế độ ăn lành mạnh đảm bảo đủ đạm, Vitamin D và Canxi.",
      "Tắm nắng đúng cách để tổng hợp Vitamin D.",
    ],
    doList: [
      "Kết hợp ăn tôm, cua, sữa, trứng",
      "Vận động ngoài trời vào sáng sớm",
    ],
    avoidList: [
      "Uống nhiều bia, rượu hoặc đồ uống có cồn",
      "Lạm dụng cà phê",
    ],
  },
];
