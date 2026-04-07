import coXuongModel from "../../assets/3d/co_xuong.glb";
import coModel from "../../assets/3d/cơ.glb";
import heVanDongModel from "../../assets/3d/hệ vận động.glb";
import type { Lesson31Model3DItem } from "./types";

export const lesson31Model3DData: Lesson31Model3DItem[] = [
  {
    id: "skeleton",
    label: "Bộ xương",
    cardDescription: "Quan sát khung xương của cơ thể",
    modelPath: heVanDongModel,
    title: "Bộ xương",
    subtitle: "Khung nâng đỡ của cơ thể",
    description:
      "Bộ xương tạo thành khung nâng đỡ cơ thể, giúp cơ thể có hình dạng nhất định và bảo vệ nhiều cơ quan quan trọng như não, tim và phổi.",
    highlights: [
      "Xương sọ bảo vệ não.",
      "Lồng ngực giúp bảo vệ tim và phổi.",
      "Cột sống giúp cơ thể đứng thẳng.",
      "Xương tay và xương chân giúp cơ thể vận động.",
    ],
    observationTips: [
      "Hãy quan sát phần đầu để nhận ra xương sọ.",
      "Quan sát vùng ngực để thấy lồng ngực và xương ức.",
      "Quan sát phần lưng để thấy cột sống.",
      "So sánh xương tay và xương chân để thấy chân có xương lớn và chắc hơn.",
    ],
    remember:
      "Bộ xương vừa nâng đỡ cơ thể, vừa bảo vệ cơ quan bên trong và hỗ trợ vận động.",
    cameraPosition: [0, 0.2, 3.6],
    fitScale: 2.6,
    minDistance: 1.2,
    maxDistance: 8,
  },
  {
    id: "muscle",
    label: "Hệ cơ",
    cardDescription: "Quan sát các nhóm cơ chính",
    modelPath: coModel,
    title: "Hệ cơ",
    subtitle: "Bộ phận tạo ra lực vận động",
    description:
      "Hệ cơ bám vào xương. Khi cơ co và giãn, chúng kéo xương cử động, giúp cơ thể thực hiện các động tác như đi, chạy, nhảy, nâng tay và cúi người.",
    highlights: [
      "Cơ ngực lớn và cơ vai giúp tay cử động.",
      "Cơ bụng giúp giữ tư thế và hỗ trợ cúi người.",
      "Cơ đùi và cơ cẳng chân rất quan trọng cho đi lại, chạy và nhảy.",
      "Cơ lưng giúp giữ thân người vững.",
    ],
    observationTips: [
      "Quan sát vai và ngực để thấy các cơ lớn ở phần trên cơ thể.",
      "Quan sát bụng để thấy nhóm cơ giúp giữ tư thế.",
      "Quan sát đùi và bắp chân để thấy các cơ lớn phục vụ vận động.",
      "So sánh cơ tay và cơ chân để thấy chân có nhiều cơ khỏe để chịu lực.",
    ],
    remember:
      "Cơ không tự vận động một mình mà phối hợp với xương để làm cơ thể chuyển động.",
    cameraPosition: [0, 0.3, 3.2],
    fitScale: 2.7,
    minDistance: 1.1,
    maxDistance: 7.5,
  },
  {
    id: "locomotor",
    label: "Hệ vận động",
    cardDescription: "Quan sát sự phối hợp giữa xương và cơ",
    modelPath: coXuongModel,
    title: "Hệ vận động",
    subtitle: "Sự phối hợp giữa xương, cơ và khớp",
    description:
      "Hệ vận động gồm xương, cơ và khớp. Nhờ sự phối hợp của các bộ phận này mà cơ thể có thể đứng, ngồi, đi, chạy, nhảy và thực hiện nhiều hoạt động khác.",
    highlights: [
      "Xương tạo khung và làm chỗ bám cho cơ.",
      "Cơ co giãn để kéo xương chuyển động.",
      "Khớp nối các xương lại với nhau.",
      "Toàn bộ hệ vận động giúp cơ thể linh hoạt và vững chắc.",
    ],
    observationTips: [
      "Quan sát để thấy cơ phủ bên ngoài và xương nằm bên trong.",
      "So sánh sự khác nhau giữa mô hình hệ cơ và hệ vận động.",
      "Chú ý vùng vai, khuỷu tay, hông và đầu gối là nơi vận động linh hoạt.",
      "Liên hệ với hoạt động thực tế như đi bộ, đá bóng, mang cặp sách.",
    ],
    remember:
      "Hệ vận động giúp cơ thể nâng đỡ, bảo vệ và tạo ra vận động.",
    cameraPosition: [0, 0.25, 3.4],
    fitScale: 2.6,
    minDistance: 1.2,
    maxDistance: 8,
  },
];

export const lesson31ViewerTips: string[] = [
  "Quan sát sự khác nhau giữa xương và cơ.",
  "Chú ý những phần lớn như đầu, ngực, lưng, tay và chân.",
  "Liên hệ mô hình với hoạt động hằng ngày của cơ thể.",
  "Nhớ rằng vận động là kết quả phối hợp giữa xương, cơ và khớp.",
];
