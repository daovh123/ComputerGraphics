import React from "react";
import LessonPlayerCompleteScreen from "../../../components/LessonPlayerCompleteScreen";

export default function Lesson33LearnComplete() {
  return (
    <LessonPlayerCompleteScreen
      title="Em đã đi hết mạch kiến thức chính của Bài 33"
      description="Từ đây em có thể quay lại xem từng phần chi tiết, làm quiz hoặc mở mô hình để quan sát sâu hơn."
      highlights={[
        {
          title: "Máu không chỉ có hồng cầu",
          description:
            "Máu gồm huyết tương và các tế bào máu, mỗi thành phần có một vai trò riêng.",
        },
        {
          title: "Miễn dịch giúp cơ thể tự bảo vệ",
          description:
            "Kháng nguyên kích thích cơ thể tạo kháng thể, còn vaccine giúp cơ thể chuẩn bị trước.",
        },
        {
          title: "Tim và mạch máu tạo thành một hệ kín",
          description:
            "Hai vòng tuần hoàn phối hợp để vận chuyển khí, chất dinh dưỡng và chất thải khắp cơ thể.",
        },
      ]}
      actions={[
        { label: "Làm quiz", path: "/lesson-33/quiz" },
        {
          label: "Quay về trang bài học",
          path: "/lesson-33",
          variant: "secondary",
        },
      ]}
    />
  );
}
