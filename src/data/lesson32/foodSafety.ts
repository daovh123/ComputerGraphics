import { Lesson32FoodSafetyData } from "./types";

export const lesson32FoodSafetyData: Lesson32FoodSafetyData = {
  safeFoodDefinition:
    "Thực phẩm an toàn là thực phẩm sạch, có nguồn gốc rõ ràng, được bảo quản và chế biến đúng cách.",
  unsafeSources: [
    "Thực phẩm ôi thiu hoặc quá hạn",
    "Nguồn nước, dụng cụ chế biến không sạch",
    "Bảo quản sai nhiệt độ",
    "Nhiễm chéo giữa thực phẩm sống và chín",
  ],
  consequences: [
    "Ngộ độc thực phẩm",
    "Rối loạn tiêu hóa kéo dài",
    "Ảnh hưởng sức khỏe tổng quát",
    "Giảm khả năng học tập và sinh hoạt hằng ngày",
  ],
  choosingRules: [
    "Chọn thực phẩm có nguồn gốc rõ ràng",
    "Đọc hạn sử dụng và bao bì",
    "Ưu tiên nơi bán bảo đảm vệ sinh",
  ],
  storageRules: [
    "Tách thực phẩm sống và chín",
    "Bảo quản lạnh đúng nhiệt độ",
    "Đậy kín thực phẩm sau khi mở",
  ],
  cookingRules: [
    "Rửa tay và dụng cụ trước khi chế biến",
    "Nấu chín kỹ thức ăn",
    "Ăn ngay sau khi nấu hoặc bảo quản đúng cách",
  ],
  classificationItems: [
    {
      id: "class-1",
      item: "Sữa tươi còn hạn, bảo quản lạnh đúng nhiệt độ",
      isSafe: true,
      reason: "Còn hạn sử dụng và bảo quản đúng cách.",
    },
    {
      id: "class-2",
      item: "Thức ăn đã nấu để ngoài 6 giờ ở nhiệt độ phòng",
      isSafe: false,
      reason: "Nguy cơ vi khuẩn tăng cao.",
    },
    {
      id: "class-3",
      item: "Rau sống rửa qua loa bằng nước không sạch",
      isSafe: false,
      reason: "Còn nguy cơ ký sinh trùng và vi khuẩn.",
    },
  ],
  trueFalseItems: [
    {
      id: "tf-1",
      statement: "Làm nóng lại nhiều lần vẫn an toàn như lần đầu.",
      isTrue: false,
      explanation:
        "Làm nóng lại nhiều lần có thể làm giảm chất lượng và tăng nguy cơ mất an toàn.",
    },
    {
      id: "tf-2",
      statement: "Tách thớt dao cho đồ sống và đồ chín giúp giảm nhiễm chéo.",
      isTrue: true,
      explanation:
        "Tách riêng dụng cụ là nguyên tắc quan trọng để phòng nhiễm chéo.",
    },
  ],
  safetyScenarios: [
    {
      id: "scenario-1",
      prompt: "Để thịt sống chung ngăn với rau ăn sống trong tủ lạnh.",
      isSafe: false,
    },
    {
      id: "scenario-2",
      prompt: "Rửa tay bằng xà phòng trước khi chế biến thực phẩm.",
      isSafe: true,
    },
    {
      id: "scenario-3",
      prompt: "Dùng lại dầu chiên nhiều lần trong nhiều ngày.",
      isSafe: false,
    },
  ],
};
