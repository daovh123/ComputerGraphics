import type { View } from "../../router/views";

export type Lesson30SystemId =
  | "van-dong"
  | "tuan-hoan"
  | "ho-hap"
  | "tieu-hoa"
  | "bai-tiet"
  | "than-kinh"
  | "noi-tiet"
  | "sinh-duc"
  | "giac-quan";

export type Lesson30System = {
  id: Lesson30SystemId;
  name: string;
  organs: string[];
  role: string;
  viewId: View;
  threeSlot: string;
};

export const LESSON30_SYSTEMS: Lesson30System[] = [
  {
    id: "van-dong",
    name: "Hệ vận động",
    organs: ["Xương", "Cơ"],
    role: "Định hình cơ thể, bảo vệ nội quan, giúp cơ thể cử động và di chuyển.",
    viewId: "lesson-30-van-dong",
    threeSlot: "lesson30-system-van-dong",
  },
  {
    id: "tuan-hoan",
    name: "Hệ tuần hoàn",
    organs: ["Tim", "Hệ mạch"],
    role:
      "Vận chuyển chất dinh dưỡng, ôxi, hormone,... đến các tế bào và vận chuyển chất thải từ tế bào đến các cơ quan bài tiết để thải ra ngoài.",
    viewId: "lesson-30-tuan-hoan",
    threeSlot: "lesson30-system-tuan-hoan",
  },
  {
    id: "ho-hap",
    name: "Hệ hô hấp",
    organs: ["Mũi", "Khí quản", "Phế quản", "Phổi"],
    role:
      "Giúp cơ thể lấy khí ôxi từ môi trường và thải khí cacbon điôxít ra khỏi cơ thể.",
    viewId: "lesson-30-ho-hap",
    threeSlot: "lesson30-system-ho-hap",
  },
  {
    id: "tieu-hoa",
    name: "Hệ tiêu hóa",
    organs: [
      "Miệng",
      "Thực quản",
      "Dạ dày",
      "Ruột non",
      "Ruột già",
      "Trực tràng",
      "Gan",
    ],
    role:
      "Biến đổi thức ăn thành các chất dinh dưỡng mà cơ thể hấp thụ được và loại chất thải ra khỏi cơ thể.",
    viewId: "lesson-30-tieu-hoa",
    threeSlot: "lesson30-system-tieu-hoa",
  },
  {
    id: "bai-tiet",
    name: "Hệ bài tiết",
    organs: ["Thận", "Phổi", "Da"],
    role:
      "Lọc các chất thải có hại cho cơ thể từ máu và thải ra ngoài môi trường.",
    viewId: "lesson-30-bai-tiet",
    threeSlot: "lesson30-system-bai-tiet",
  },
  {
    id: "than-kinh",
    name: "Hệ thần kinh",
    organs: ["Não bộ", "Tủy sống", "Dây thần kinh"],
    role:
      "Thu nhận các kích thích từ môi trường, điều khiển và điều hoà hoạt động của các cơ quan, giúp cho cơ thể thích nghi với môi trường.",
    viewId: "lesson-30-than-kinh",
    threeSlot: "lesson30-system-than-kinh",
  },
  {
    id: "noi-tiet",
    name: "Hệ nội tiết",
    organs: [
      "Tuyến tùng",
      "Vùng dưới đồi",
      "Tuyến yên",
      "Tuyến giáp",
      "Tuyến ức",
      "Tuyến tụy",
      "Tuyến thượng thận",
      "Tinh hoàn",
      "Buồng trứng",
    ],
    role:
      "Điều hoà hoạt động của các cơ quan trong cơ thể thông qua việc tiết một số loại hormone tác động đến cơ quan nhất định.",
    viewId: "lesson-30-noi-tiet",
    threeSlot: "lesson30-system-noi-tiet",
  },
  {
    id: "sinh-duc",
    name: "Hệ sinh dục",
    organs: ["Cơ quan sinh dục nam", "Cơ quan sinh dục nữ"],
    role: "Giúp cơ thể sinh sản, duy trì nòi giống.",
    viewId: "lesson-30-sinh-duc",
    threeSlot: "lesson30-system-sinh-duc",
  },
  {
    id: "giac-quan",
    name: "Các giác quan",
    organs: ["Tai", "Mũi", "Lưỡi/Miệng", "Da/Tay", "Mắt"],
    role:
      "Giúp cơ thể nhận biết thế giới xung quanh và thu nhận thông tin (âm thanh, hình ảnh, mùi, vị và xúc giác).",
    viewId: "lesson-30-giac-quan",
    threeSlot: "lesson30-system-giac-quan",
  },
];

export function getLesson30System(systemId: Lesson30SystemId): Lesson30System {
  const found = LESSON30_SYSTEMS.find((s) => s.id === systemId);
  if (!found) {
    throw new Error(`Unknown Lesson30 systemId: ${systemId}`);
  }
  return found;
}
