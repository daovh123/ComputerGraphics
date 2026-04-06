import { Lesson31SimulationStep } from "./types";

export const lesson31SimulationData: Lesson31SimulationStep[] = [
  {
    id: "step-1-nerve",
    order: 1,
    title: "Nhận tín hiệu",
    shortDescription:
      "Não bộ phân tích và truyền xung thần kinh vận động theo dây thần kinh chỉ huy xuống phần bắp cơ (cơ nhị đầu cánh tay).",
    phase: "Thần kinh",
    keyComponents: ["Não bộ", "Hệ thần kinh vận động"],
    summaryBadges: ["Phát xung", "Chỉ huy"],
  },
  {
    id: "step-2-sliding",
    order: 2,
    title: "Sự trượt tơ cơ",
    shortDescription:
      "Khi xung thần kinh truyền tới, các tơ cơ mảnh trượt vào phần giữa các tơ cơ dày khiến tế bào cơ rút ngắn lại, tạo ra sự co cơ.",
    phase: "Co cơ",
    keyComponents: ["Tế bào cơ", "Tơ cơ dày/mảnh", "Bắp cơ"],
    summaryBadges: ["Co thắt bắp cơ", "Cơ phình to"],
  },
  {
    id: "step-3-tendon",
    order: 3,
    title: "Gân kéo xương",
    shortDescription:
      "Hai đầu bắp cơ bám chặt vào xương qua mạng lưới gân. Bắp cơ co ngắn sinh ra lực kéo, truyền trực tiếp lên gân để kéo thân xương cử động theo hướng nhất định.",
    phase: "Đòn bẩy",
    keyComponents: ["Gân cơ nhị đầu", "Xương cẳng tay"],
    summaryBadges: ["Lực kéo gân", "Gắn kết"],
  },
  {
    id: "step-4-lever",
    order: 4,
    title: "Nguyên lý đòn bẩy",
    shortDescription:
      "Khớp khuỷu tay lúc này giữ vai trò là 'Điểm tựa'. Xương cẳng tay hoạt động như một thanh đòn bẩy chống lại trọng lực để nâng đồ vật (Lực cản) nhờ lực kéo từ cánh tay.",
    phase: "Đòn bẩy",
    keyComponents: ["Khớp khuỷu vai (Điểm tựa)", "Xương (Đòn bẩy)", "Trọng vật"],
    summaryBadges: ["Điểm tựa", "Cánh tay đòn"],
  },
  {
    id: "step-5-relax",
    order: 5,
    title: "Sự đối kháng thư giãn",
    shortDescription:
      "Khi não bộ ngừng phát lệnh, cơ nhị đầu dãn ra, đồng thời cơ tam đầu (phía sau) kết hợp co lại giúp cánh tay trở về trạng thái duỗi thẳng nhẹ nhàng.",
    phase: "Co cơ",
    keyComponents: ["Cơ nhị đầu", "Cơ tam đầu (đối kháng)"],
    summaryBadges: ["Dãn cơ", "Hoạt động đối kháng"],
  },
];
