import { Lesson32FoodSafetyData } from "./types";

export const lesson32FoodSafetyData: Lesson32FoodSafetyData = {
  safeFoodDefinition:
    "Thuc pham an toan la thuc pham sach, co nguon goc ro rang, duoc bao quan va che bien dung cach.",
  unsafeSources: [
    "Thực phẩm ôi thiu hoặc quá hạn",
    "Nguồn nước, dụng cụ chế biến không sạch",
    "Bảo quản sai nhiệt độ",
    "Nhiem cheo giua thuc pham song va chin",
  ],
  consequences: [
    "Ngộ độc thực phẩm",
    "Rối loạn tiêu hóa kéo dài",
    "Ảnh hưởng sức khỏe cộng đồng",
    "Giam kha nang hoc tap va sinh hoat hang ngay",
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
      item: "Sua tuoi con han, bao quan lanh dung nhiet do",
      isSafe: true,
      reason: "Con han su dung va bao quan dung cach.",
    },
    {
      id: "class-2",
      item: "Thuc an da nau de ngoai 6 gio o nhiet do phong",
      isSafe: false,
      reason: "Nguy co vi khuan tang cao.",
    },
    {
      id: "class-3",
      item: "Rau song rua qua loa bang nuoc khong sach",
      isSafe: false,
      reason: "Con nguy co ky sinh trung va vi khuan.",
    },
  ],
  trueFalseItems: [
    {
      id: "tf-1",
      statement: "Lam nong lai nhieu lan van an toan nhu lan dau.",
      isTrue: false,
      explanation: "Lam nong lai nhieu lan co the lam giam chat luong va tang nguy co mat an toan.",
    },
    {
      id: "tf-2",
      statement: "Tach thot dao cho do song va do chin giup giam nhiem cheo.",
      isTrue: true,
      explanation: "Tach rieng dung cu la nguyen tac quan trong de phong nhiem cheo.",
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
