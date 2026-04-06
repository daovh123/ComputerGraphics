import { Lesson31ProtectionData } from "./types";

export const lesson31ProtectionData: Lesson31ProtectionData = {
  exerciseMeaning: {
    significance: [
      "Kích thích tăng chiều dài và chu vi của xương, giúp xương phát triển trọn vẹn.",
      "Làm cho cơ bắp nở nang, rắn chắc, tăng cường khả năng chịu đựng.",
      "Tăng cường sự dẻo dai của cơ thể và hỗ trợ sự tuần hoàn máu lưu thông tốt.",
    ],
    methods: [
      "Đi bộ, chạy bộ buổi sáng",
      "Đạp xe đạp",
      "Bơi lội",
      "Nhảy dây",
      "Chơi bóng rổ, cầu lông, bóng đá,...",
    ],
  },
  firstAid: {
    preparation: [
      "Nẹp gỗ (hoặc tre) nhẵn dài từ 30 - 40 cm rộng 4-5 cm",
      "Dây vải y tế hoặc dây thừng loại mềm nhỏ",
      "Cuộn bông y tế sạch",
      "Gạc hoặc khăn vải y tế mềm mỏng",
      "Băng tam giác (với trường hợp gãy tay)",
    ],
    procedures: [
      {
        id: "arm",
        title: "Sơ cứu gãy xương cẳng tay",
        steps: [
          {
            stepNumber: 1,
            instruction: "Để nạn nhân nằm hoặc ngồi thoải mái, đặt tay bị gãy sát vào thân người một cách cẩn thận.",
          },
          {
            stepNumber: 2,
            instruction: "Đặt một nẹp áp vào mặt trong cẳng tay và một nẹp áp vào mặt ngoài cẳng tay. Chêm lót bông y tế vào hai đầu nẹp và những chỗ sát xương.",
          },
          {
            stepNumber: 3,
            instruction: "Dùng dây vải buộc cố định hai nẹp vào tay ở các vị trí phía trên nẹp và phía dưới chỗ gãy.",
          },
          {
            stepNumber: 4,
            instruction: "Dùng băng tam giác hoặc khăn vải mềm quàng vào cổ gập góc 90 độ để treo tay lơ lửng, giữ cánh tay ổn định.",
          },
        ],
      },
      {
        id: "leg",
        title: "Sơ cứu gãy xương cẳng chân",
        steps: [
          {
            stepNumber: 1,
            instruction: "Để nạn nhân nằm yên trên một mặt phẳng cứng, duỗi thẳng cẳng chân bị gãy.",
          },
          {
            stepNumber: 2,
            instruction: "Đặt nẹp gỗ ở mặt trong và mặt ngoài của cẳng chân (từ gót chân đến đùi). Lót bông y tế vào các điểm đầu nẹp và mắt cá chân để tránh tổn thương da.",
          },
          {
            stepNumber: 3,
            instruction: "Buộc dây vải cố định hai nẹp ở các vị trí: cổ chân, dưới đầu gối và phía trên đùi để bất động hoàn toàn chi bị gãy.",
          },
        ],
      },
    ],
  },
};
