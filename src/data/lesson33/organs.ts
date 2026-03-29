import { Organ3D } from './types';

export const organs: Organ3D[] = [
  {
    id: "heart",
    name: "Trái tim",
    description: "Cơ quan trung tâm của hệ tuần hoàn, hoạt động như một cái bơm đẩy máu đi khắp cơ thể. Tim gồm 4 ngăn: 2 tâm nhĩ ở trên và 2 tâm thất ở dưới.",
    color: "#EF4444",
    hotspots: [
      { position: [-1, 2, 0], label: "Tâm nhĩ phải", description: "Nhận máu nhiều CO2 từ cơ thể về." },
      { position: [-1, -2, 0], label: "Tâm thất phải", description: "Bơm máu lên phổi để trao đổi khí." },
      { position: [1, 2, 0], label: "Tâm nhĩ trái", description: "Nhận máu giàu O2 từ phổi về." },
      { position: [1, -2, 0], label: "Tâm thất trái", description: "Bơm máu giàu O2 đi nuôi cơ thể." },
    ]
  },
  {
    id: "artery",
    name: "Động mạch",
    description: "Mạch máu đưa máu từ tim ra các cơ quan. Có thành dày, khả năng đàn hồi tốt để chịu áp lực lớn của máu khi tim co bóp.",
    color: "#EF4444"
  },
  {
    id: "vein",
    name: "Tĩnh mạch",
    description: "Mạch máu đưa máu từ các cơ quan trở về tim. Lòng mạch rộng hơn, thành mỏng và thường có van để ngăn máu chảy ngược.",
    color: "#3B82F6"
  },
  {
    id: "capillary",
    name: "Mao mạch",
    description: "Nối liền tiểu động mạch và tiểu tĩnh mạch. Thành mao mạch chỉ gồm một lớp tế bào, là nơi diễn ra sự trao đổi chất giữa máu và tế bào.",
    color: "#F59E0B"
  }
];
