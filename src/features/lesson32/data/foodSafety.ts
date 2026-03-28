import { Lesson32FoodSafetyData } from "./types";

export const lesson32FoodSafetyData: Lesson32FoodSafetyData = {
  unsafeSources: [
    "Thực phẩm ôi thiu hoặc quá hạn",
    "Nguồn nước, dụng cụ chế biến không sạch",
    "Bảo quản sai nhiệt độ",
  ],
  consequences: [
    "Ngộ độc thực phẩm",
    "Rối loạn tiêu hóa kéo dài",
    "Ảnh hưởng sức khỏe cộng đồng",
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
