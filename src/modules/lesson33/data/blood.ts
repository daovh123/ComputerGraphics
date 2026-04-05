import { BloodComponent, BloodType } from './types';
import lesson33Card from "../assets/lesson-33-card.svg";

export const bloodComponents: BloodComponent[] = [
  {
    id: "plasma",
    name: "Huyết tương",
    percentage: "55%",
    function: "Duy trì trạng thái lỏng của máu và vận chuyển các chất dinh dưỡng, chất thải, hormone.",
    color: "#FCD34D", // yellow
    image: lesson33Card
  },
  {
    id: "rbc",
    name: "Hồng cầu",
    percentage: "43%",
    function: "Vận chuyển Oxy từ phổi đến tế bào và CO2 từ tế bào về phổi. Có hình đĩa lõm hai mặt để tăng diện tích tiếp xúc.",
    color: "#EF4444", // red
    image: lesson33Card
  },
  {
    id: "wbc",
    name: "Bạch cầu",
    percentage: "1%",
    function: "Bảo vệ cơ thể khỏi các tác nhân gây bệnh (vi khuẩn, virus) qua cơ chế thực bào và tiết kháng thể.",
    color: "#E2E8F0", // white-ish
    image: lesson33Card
  },
  {
    id: "platelets",
    name: "Tiểu cầu",
    percentage: "1%",
    function: "Tham gia quá trình đông máu, giúp cơ thể không bị mất máu khi bị thương.",
    color: "#8B5CF6", // purple
    image: lesson33Card
  }
];

export const bloodTypes: BloodType[] = [
  {
    id: "O",
    type: "Nhóm máu O",
    antigens: "Không có",
    antibodies: "Alpha và Beta",
    canDonateTo: ["O", "A", "B", "AB"],
    canReceiveFrom: ["O"],
    color: "#EF4444"
  },
  {
    id: "A",
    type: "Nhóm máu A",
    antigens: "Kháng nguyên A",
    antibodies: "Beta",
    canDonateTo: ["A", "AB"],
    canReceiveFrom: ["A", "O"],
    color: "#10B981"
  },
  {
    id: "B",
    type: "Nhóm máu B",
    antigens: "Kháng nguyên B",
    antibodies: "Alpha",
    canDonateTo: ["B", "AB"],
    canReceiveFrom: ["B", "O"],
    color: "#3B82F6"
  },
  {
    id: "AB",
    type: "Nhóm máu AB",
    antigens: "Kháng nguyên A và B",
    antibodies: "Không có",
    canDonateTo: ["AB"],
    canReceiveFrom: ["O", "A", "B", "AB"],
    color: "#8B5CF6"
  }
];
