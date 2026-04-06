import { Lesson31QuizQuestion } from "./types";

export const lesson31QuizData: Lesson31QuizQuestion[] = [
  {
    id: "q1",
    category: "Cấu tạo và Chức năng",
    prompt: "Ý nào sau đây KHÔNG phải là chức năng của bộ xương người?",
    options: [
      "Tạo bộ khung vững chắc bảo vệ nội quan.",
      "Là điểm tựa vững chắc để các cơ bám vào.",
      "Đảm nhận nhiệm vụ lưu trữ và lấy thức ăn hữu cơ từ bên ngoài vào.",
      "Cùng với hệ cơ giúp cơ thể có hình dáng nhất định.",
    ],
    correctAnswerIndex: 2,
    feedback: "Phân loại thức ăn là nhiệm vụ của hệ Tiêu hóa, không phải của hệ Vận động.",
  },
  {
    id: "q2",
    category: "Cơ chế Vận động",
    prompt: "Hoạt động co cơ làm xương cử động tuân theo nguyên lý cơ học nào?",
    options: [
      "Nguyên lý đòn bẩy.",
      "Nguyên lý bảo toàn năng lượng.",
      "Nguyên lý lực hấp dẫn.",
      "Nguyên lý phản lực.",
    ],
    correctAnswerIndex: 0,
    feedback: "Khớp xương làm điểm tựa tạo thành hệ đòn bẩy, khi cơ co dãn sinh ra lực kéo làm cho hệ thống xương chuyển động.",
  },
  {
    id: "q3",
    category: "Bệnh tật liên quan",
    prompt: "Bệnh loãng xương phổ biến ở người cao tuổi chủ yếu là do sự suy giảm khả năng tổng hợp và sự thiếu hụt các khoáng chất nào?",
    options: [
      "Sắt (Fe) và Kẽm (Zn).",
      "Đạm (Protein) và lipit (Chất béo).",
      "Canxi (Calcium) và Phosphor.",
      "Vitamin A và Vitamin nhóm B.",
    ],
    correctAnswerIndex: 2,
    feedback: "Chất khoáng cấu tạo nên đặc tính rắn chắc của thành xương quan trọng nhất là Calcium và Phosphorus.",
  },
  {
    id: "q4",
    category: "Bệnh tật liên quan",
    prompt: "Tật cong vẹo cột sống ở lứa tuổi học đường do nguyên nhân nào dưới đây gây ra là chủ yếu?",
    options: [
      "Di truyền bẩm sinh từ bố mẹ.",
      "Do thường xuyên sử dụng nhiều đồ uống có cồn, chất kích thích.",
      "Tư thế ngồi học không ngay ngắn kéo dài.",
      "Tập luyện thể thao cường độ quá mức.",
    ],
    correctAnswerIndex: 2,
    feedback: "Nằm học, gù lưng hoặc ngồi học sai tư thế trong thời gian dài sẽ làm cột sống bị biến dạng.",
  },
  {
    id: "q5",
    category: "Bảo vệ & Sơ cứu",
    prompt: "Khi chứng kiến một người bạn không may bị tai nạn gãy tay, việc cần làm ngay lập tức ở bước đầu tiên là gì?",
    options: [
      "Cho bệnh nhân uống nước đường mặn hòa tan.",
      "Dùng nẹp thẳng dài bằng gỗ/tre cố định để giữ bất động đoạn tay gãy.",
      "Tự nắn bóp, chà xát xem thử xương xoay lệch hướng nào.",
      "Bôi cao nóng, dầu xoa bóp ngay vào vùng sưng tím để giảm đau gãy xương.",
    ],
    correctAnswerIndex: 1,
    feedback: "Tuyệt đối không được xoa dầu nóng hay tự ý nắn xương gãy. Bạn cần tiến hành sơ cứu bằng nẹp ngay lập tức để bất động phần chi gãy, tránh gây tổn thương nặng hơn.",
  },
];
