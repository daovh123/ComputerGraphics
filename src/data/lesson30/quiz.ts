export type Lesson30QuizQuestion = {
  id: string;
  question: string;
  options: [string, string, string, string];
  answerIndex: number;
  timeLimitSec: number;
  explanation?: string;
};

export const LESSON30_QUIZ_QUESTIONS: Lesson30QuizQuestion[] = [
  {
    id: "q1",
    question: "Hệ nào giúp cơ thể lấy ôxi và thải khí cacbon điôxít?",
    options: ["Hệ tiêu hóa", "Hệ hô hấp", "Hệ bài tiết", "Hệ vận động"],
    answerIndex: 1,
    timeLimitSec: 15,
    explanation: "Hệ hô hấp giúp trao đổi khí: lấy ôxi và thải cacbon điôxít.",
  },
  {
    id: "q2",
    question: "Cơ quan tiêu biểu của hệ tuần hoàn là gì?",
    options: ["Tim và hệ mạch", "Phổi và khí quản", "Dạ dày và ruột", "Não bộ và tủy sống"],
    answerIndex: 0,
    timeLimitSec: 15,
    explanation: "Hệ tuần hoàn gồm tim và hệ thống mạch máu.",
  },
  {
    id: "q3",
    question: "Hệ nào biến đổi thức ăn thành chất dinh dưỡng để cơ thể hấp thụ?",
    options: ["Hệ tiêu hóa", "Hệ vận động", "Hệ nội tiết", "Hệ thần kinh"],
    answerIndex: 0,
    timeLimitSec: 15,
    explanation: "Hệ tiêu hóa giúp biến đổi và hấp thụ chất dinh dưỡng.",
  },
  {
    id: "q4",
    question: "Vai trò chính của hệ bài tiết là gì?",
    options: [
      "Điều khiển hoạt động các cơ quan",
      "Lọc chất thải từ máu và thải ra ngoài",
      "Đưa ôxi vào cơ thể",
      "Giúp cơ thể di chuyển",
    ],
    answerIndex: 1,
    timeLimitSec: 15,
    explanation: "Hệ bài tiết lọc chất thải từ máu và thải ra môi trường.",
  },
  {
    id: "q5",
    question: "Hệ nào điều hoà hoạt động của cơ thể thông qua hormone?",
    options: ["Hệ nội tiết", "Hệ sinh dục", "Hệ tiêu hóa", "Hệ vận động"],
    answerIndex: 0,
    timeLimitSec: 15,
    explanation: "Các tuyến nội tiết tiết hormone để điều hoà hoạt động cơ thể.",
  },
  {
    id: "q6",
    question: "Hệ thần kinh gồm những bộ phận nào?",
    options: [
      "Não bộ – Tủy sống – Dây thần kinh",
      "Tim – Hệ mạch – Máu",
      "Mũi – Phổi – Phế quản",
      "Thận – Da – Gan",
    ],
    answerIndex: 0,
    timeLimitSec: 15,
    explanation: "Hệ thần kinh gồm não bộ, tủy sống và các dây thần kinh.",
  },
  {
    id: "q7",
    question: "Hệ vận động gồm những cơ quan nào?",
    options: ["Xương và cơ", "Tim và mạch máu", "Phổi và khí quản", "Dạ dày và ruột"],
    answerIndex: 0,
    timeLimitSec: 15,
    explanation: "Hệ vận động gồm xương và cơ giúp cử động và di chuyển.",
  },
  {
    id: "q8",
    question: "Các giác quan giúp cơ thể làm gì?",
    options: [
      "Sinh sản, duy trì nòi giống",
      "Nhận biết thế giới xung quanh",
      "Lọc chất thải từ máu",
      "Biến đổi thức ăn thành chất dinh dưỡng",
    ],
    answerIndex: 1,
    timeLimitSec: 15,
    explanation: "Giác quan giúp thu nhận thông tin như âm thanh, hình ảnh, mùi, vị, xúc giác.",
  },
  {
    id: "q9",
    question: "Cơ thể người gồm mấy phần chính?",
    options: ["3", "4", "5", "6"],
    answerIndex: 2,
    timeLimitSec: 12,
    explanation: "Gồm 5 phần: đầu, cổ, thân, tay, chân.",
  },
  {
    id: "q10",
    question: "Thứ tự các lớp bao bọc cơ thể (ngoài → trong) là gì?",
    options: [
      "Da → Cơ → Mỡ → Xương",
      "Da → Mỡ → Cơ → Xương",
      "Mỡ → Da → Cơ → Xương",
      "Da → Xương → Cơ → Mỡ",
    ],
    answerIndex: 1,
    timeLimitSec: 12,
    explanation: "Ngoài vào trong: da → mỡ → cơ → xương.",
  },
];
