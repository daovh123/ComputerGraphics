import { QuizQuestion } from './types';

export const quizData: QuizQuestion[] = [
  {
    id: 1,
    question: "Thành phần nào của máu chiếm thể tích lớn nhất và có chức năng duy trì máu ở dạng lỏng?",
    options: ["Hồng cầu", "Bạch cầu", "Huyết tương", "Tiểu cầu"],
    correct: 2,
    explanation: "Huyết tương chiếm 55% thể tích máu, bao gồm nước và các chất hòa tan, giúp duy trì máu ở dạng lỏng."
  },
  {
    id: 2,
    question: "Tế bào nào có vai trò chính trong quá trình vận chuyển O2 và CO2 trong cơ thể?",
    options: ["Thực bào", "Hồng cầu", "Bạch cầu Lympho", "Tiểu cầu"],
    correct: 1,
    explanation: "Hồng cầu có chứa Hemoglobin - huyết sắc tố có khả năng liên kết với O2 ở phổi và CO2 ở tế bào để vận chuyển đi theo dòng máu."
  },
  {
    id: 3,
    question: "Nhóm máu nào được gọi là 'Nhóm máu chuyên cho' (có thể truyền cho mọi nhóm máu khác)?",
    options: ["O", "A", "B", "AB"],
    correct: 0,
    explanation: "Người nhóm máu O không có kháng nguyên trên hồng cầu nên kháng thể của người nhận sẽ không làm ngưng kết hồng cầu truyền vào."
  },
  {
    id: 4,
    question: "Tim của người có cấu tạo gồm bao nhiêu ngăn?",
    options: ["2 ngăn", "3 ngăn", "4 ngăn", "5 ngăn"],
    correct: 2,
    explanation: "Tim người gồm 4 ngăn: Tâm nhĩ phải, tâm thất phải, tâm nhĩ trái, tâm thất trái. Cấu tạo này giúp tách biệt hoàn toàn máu giàu CO2 (phải) và O2 (trái)."
  },
  {
    id: 5,
    question: "Trong vòng tuần hoàn nhỏ (tuần hoàn phổi), máu chảy từ tâm thất phải đi đến đâu?",
    options: ["Đến toàn bộ cơ thể", "Đến phổi", "Đến não", "Đến tâm thất trái ngay lập tức"],
    correct: 1,
    explanation: "Máu nhiều CO2 rời tâm thất phải lên phổi để nhả CO2, lấy O2 biến thành máu đỏ tươi, trước khi trở về tâm nhĩ trái."
  }
];
