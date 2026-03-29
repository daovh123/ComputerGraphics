import { Lesson32NutritionData } from "./types";

export const lesson32NutritionData: Lesson32NutritionData = {
  introSummary:
    "Dinh duong hop ly giup co the phat trien, hoc tap tot va phong tranh benh tat.",
  nutrientGroups: [
    {
      id: "carbohydrate",
      title: "Nhóm bột đường",
      role: "Cung cap nang luong chinh cho hoc tap va van dong.",
      examples: ["Com", "Bun", "Khoai"],
    },
    {
      id: "protein",
      title: "Nhóm chất đạm",
      role: "Xay dung co, mo va ho tro tang truong co the.",
      examples: ["Thit", "Ca", "Trung", "Dau"],
    },
    {
      id: "lipid",
      title: "Nhóm chất béo",
      role: "Du tru nang luong va ho tro hap thu mot so vitamin.",
      examples: ["Dau an", "Mo ca", "Hat"],
    },
    {
      id: "vitamin-mineral",
      title: "Vitamin và khoáng chất",
      role: "Dieu hoa hoat dong co the, tang suc de khang.",
      examples: ["Rau xanh", "Trai cay", "Sua"],
    },
    {
      id: "water",
      title: "Nước",
      role: "Van chuyen chat va giu can bang cho co the.",
      examples: ["Nuoc loc", "Canh", "Trai cay nhieu nuoc"],
    },
  ],
  nutritionPrinciples: [
    "Ăn đủ và đa dạng nhóm chất.",
    "Cân đối giữa năng lượng nạp vào và mức vận động.",
    "Ưu tiên thực phẩm tươi, hạn chế đồ chế biến sẵn.",
    "Khong bo bua sang va han che an qua muon vao buoi toi.",
  ],
  factorsAffectingNeeds: [
    "Độ tuổi",
    "Giới tính",
    "Tình trạng sức khỏe",
    "Mức độ hoạt động thể lực",
  ],
  mealPlanningTips: [
    "Không bỏ bữa sáng.",
    "Mỗi bữa nên có rau xanh hoặc trái cây.",
    "Hạn chế nước ngọt có đường.",
    "Uong du nuoc trong ngay.",
  ],
  quickMealIdeas: [
    "Sang: banh mi trung + sua khong duong + trai cay.",
    "Trua: com + ca/thit + rau + canh.",
    "Toi: com vua du + dam + rau + trai cay trang mieng.",
  ],
  simpleActivities: [
    "Xây dựng thực đơn 1 ngày cho học sinh lớp 8.",
    "So sánh 2 bữa ăn và chọn bữa cân đối hơn.",
    "Tim xem bua an nao thieu nhom chat de bo sung.",
  ],
};
