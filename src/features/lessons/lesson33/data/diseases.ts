import { Disease } from './types';
import hypertensionImg from '../../../../assets/img/benh-cao-huyet-ap.jpg';
import anemiaImg from '../../../../assets/img/Hinh-3.-Thieu-mauthieu-mau.webp';
import atherosclerosisImg from '../../../../assets/img/xo-vua-dong-mach.jpg';

export const diseases: Disease[] = [
  {
    id: "hypertension",
    name: "Cao huyết áp",
    cause: "Áp lực máu tác động lên thành mạch qua cao. Nguyên nhân do ăn mặn, béo phì, căng thẳng, mỡ máu cao...",
    symptoms: ["Đau đầu", "Chóng mặt", "Chảy máu cam", "Đỏ mặt nhanh"],
    prevention: ["Hạn chế ăn mặn (chứa nhiều Natri).", "Tập thể dục thường xuyên.", "Giữ tinh thần thoải mái."],
    image: hypertensionImg
  },
  {
    id: "anemia",
    name: "Thiếu máu",
    cause: "Số lượng hồng cầu giảm hoặc lượng Hemoglobin trong hồng cầu thấp. Nguyên nhân chính do thiếu Sắt, Vitamin B12.",
    symptoms: ["Da xanh xao", "Mệt mỏi, hoa mắt", "Tim đập nhanh", "Chân tay lạnh"],
    prevention: ["Ăn thực phẩm giàu sắt: thịt đỏ, gan, rau sẫm màu.", "Bổ sung Vitamin C giúp hấp thu sắt.", "Xổ giun định kỳ."],
    image: anemiaImg
  },
  {
    id: "atherosclerosis",
    name: "Xơ vữa động mạch",
    cause: "Cholesterol dư thừa lắng đọng ở thành mạch máu tạo thành mảng bám, làm hẹp lòng mạch và giảm tính đàn hồi.",
    symptoms: ["Đau thắt ngực (nhất là khi gắng sức)", "Tê bì tay chân", "Nguy cơ nhồi máu cơ tim, đột quỵ"],
    prevention: ["Hạn chế đồ chiên rán, mỡ động vật.", "Tăng cường rau xanh, trái cây.", "Không hút thuốc lá."],
    image: atherosclerosisImg
  }
];
