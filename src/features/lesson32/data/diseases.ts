import { Lesson32Disease } from "./types";

export const lesson32DiseasesData: Lesson32Disease[] = [
  {
    id: "tooth-decay",
    title: "Sâu răng",
    shortDescription:
      "Tổn thương mô răng do vi khuẩn và vệ sinh răng miệng chưa tốt.",
    causes: [
      "Ăn nhiều đồ ngọt, đồ dính răng",
      "Không chải răng đúng cách",
      "Không khám răng định kỳ",
    ],
    symptoms: ["Đau răng", "Ê buốt", "Lỗ sâu màu đen trên răng"],
    prevention: [
      "Đánh răng 2 lần mỗi ngày",
      "Hạn chế đồ ngọt",
      "Khám răng định kỳ",
    ],
    doList: ["Súc miệng sau ăn", "Dùng chỉ nha khoa"],
    avoidList: ["Ăn ngọt trước khi ngủ", "Bỏ qua cơn đau răng kéo dài"],
  },
  {
    id: "gastric-ulcer",
    title: "Viêm loét dạ dày - tá tràng",
    shortDescription:
      "Tình trạng niêm mạc dạ dày hoặc tá tràng bị viêm và tổn thương.",
    causes: [
      "Ăn uống thất thường",
      "Căng thẳng kéo dài",
      "Lạm dụng thuốc giảm đau",
    ],
    symptoms: ["Đau vùng thượng vị", "Ợ chua", "Khó tiêu"],
    prevention: ["Ăn đúng giờ", "Giảm căng thẳng", "Không tự ý dùng thuốc"],
    doList: ["Thăm khám khi đau tái diễn", "Ăn chậm, chia nhỏ bữa"],
    avoidList: ["Bỏ bữa kéo dài", "Ăn quá cay nóng"],
  },
];
