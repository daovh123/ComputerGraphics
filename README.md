# ComputerGraphics

Ứng dụng React + Vite cho học liệu tương tác.

## Chạy local

1. Cài dependencies:
   `pnpm install`
2. Khởi động môi trường dev:
   `pnpm dev`
3. Build production:
   `pnpm build`

## Cấu trúc chính

```txt
src/
  components/      # giao diện dùng chung
  lessons/         # danh sách tổng hợp bài học
  subjects/        # danh sách tổng hợp môn học
  modules/
    lesson30/
    lesson31/
    lesson32/
    lesson33/
  views/           # trang tổng như trang chủ, thư viện, placeholder
  router/          # route toàn ứng dụng
```

## Nguyên tắc làm việc

- Mỗi người nên phụ trách một bài riêng.
- Nếu chỉ làm một bài, hãy cố gắng chỉ sửa trong folder của bài đó.
- Không đưa logic riêng của từng bài vào mã dùng chung.
- Ảnh, dữ liệu, nội dung của bài nào thì để trong bài đó.

## Một bài học gồm những gì

Ví dụ:

- [src/modules/lesson32](/home/thang/Dev/Web/ComputerGraphics/src/modules/lesson32)

Thông thường một bài sẽ có:

- `assets/`: ảnh, media chỉ bài đó dùng
- `data/`: nội dung, câu hỏi, dữ liệu mô phỏng, dữ liệu trang tổng quan
- `tabs/`: các màn tab như explorer, simulation, quiz
- `learn/`: các màn của lesson mode
- `Overview.tsx`, `Shell.tsx`, `LearnPlayer.tsx`: file entry của bài
- `manifest.ts`: cấu hình bài
- `routes.tsx`: route của bài

## Hai kiểu màn của một bài

Hiện tại một bài có thể có 2 kiểu màn:

### 1. Màn thường

- là các tab như tổng quan, explorer, simulation, quiz
- dùng để xem nhanh ý chính, tra cứu, nhảy nhanh tới phần cần xem

### 2. Lesson mode

- là chế độ học theo từng bước, có tiến độ và điều hướng bằng bàn phím
- dùng khi cần dẫn người học theo một nhịp rõ ràng và giải thích kỹ hơn

## Lesson mode nằm ở đâu

Phần dùng chung:

- [src/components/LessonPlayer.tsx](/home/thang/Dev/Web/ComputerGraphics/src/components/LessonPlayer.tsx)
- [src/components/LessonPlayerLayout.tsx](/home/thang/Dev/Web/ComputerGraphics/src/components/LessonPlayerLayout.tsx)
- [src/components/LessonPlayerCompleteScreen.tsx](/home/thang/Dev/Web/ComputerGraphics/src/components/LessonPlayerCompleteScreen.tsx)
- [src/components/lesson-player](/home/thang/Dev/Web/ComputerGraphics/src/components/lesson-player)

Phần riêng của bài:

- `src/modules/lessonXX/LearnPlayer.tsx`
- `src/modules/lessonXX/data/learnConfig.tsx`
- `src/modules/lessonXX/learn/*`

Quy ước đặt tên trong folder của từng bài:

- không cần thêm tiền tố `LessonXX` vào mọi file
- đặt theo vai trò thật của file như `Overview.tsx`, `Shell.tsx`, `LearnPlayer.tsx`, `learn/Cover.tsx`
- tên kiểu `LessonPlayer` chỉ nên dùng cho phần dùng chung ở `src/components/`

## Khi nào nên làm lesson mode

Nên dùng lesson mode khi bài có:

- tiến trình học rõ từng bước
- phần mở ra dần theo nhịp
- mô hình hoặc tương tác cần người học theo dõi theo thứ tự
- phần giải thích chi tiết hơn màn tab thường

Không cần dùng lesson mode nếu bài chỉ cần vài tab độc lập, xem nhanh mô hình hoặc đọc thông tin chính rồi làm quiz.

## Thêm step cho lesson mode

Ví dụ với Bài 33:

- [src/modules/lesson33/data/learnConfig.tsx](/home/thang/Dev/Web/ComputerGraphics/src/modules/lesson33/data/learnConfig.tsx)

Muốn thêm một step mới:

1. Tạo component mới trong `src/modules/lessonXX/learn/`
2. Thêm step vào `learnConfig.tsx`
3. Dùng `createLessonStepPath(...)` để tạo path cho step

Một step thường có:

- `id`
- `title`
- `path`
- `width`
- `content`

## Step tương tác hoạt động ra sao

Nếu một step có nhiều trạng thái bên trong, step đó có thể tự điều khiển:

- `Enter`: đi tiếp trong chính step đó trước
- `←`: lùi trong chính step đó trước

Hook dùng cho việc này là:

- [src/components/lesson-player/useLessonStepEnterAction.ts](/home/thang/Dev/Web/ComputerGraphics/src/components/lesson-player/useLessonStepEnterAction.ts)

Thông thường nên dùng:

- `useLessonStepProgression(...)`

Hook này cho step tự khai báo:

- khi nào còn bước tương tác bên trong
- bấm tiếp thì làm gì
- bấm lùi thì làm gì

Khi step đã hết tương tác bên trong, lesson player mới chuyển sang step khác hoặc sang màn hoàn thành.

## Nên sửa ở đâu

### Nếu cần sửa nội dung một bài

- `src/modules/lessonXX/data/*`

### Nếu cần sửa giao diện một bài

- `src/modules/lessonXX/*.tsx`
- `src/modules/lessonXX/tabs/*.tsx`
- `src/modules/lessonXX/learn/*.tsx`

### Nếu cần sửa tab hoặc menu bên trái của một bài

- `src/modules/lessonXX/manifest.ts`

### Nếu cần sửa ảnh của một bài

- `src/modules/lessonXX/assets/*`

## Không nên sửa ở đâu nếu chỉ làm một bài

Trừ khi thật sự cần thiết, đừng sửa các file sau chỉ để phục vụ một bài:

- [src/components/Layout.tsx](/home/thang/Dev/Web/ComputerGraphics/src/components/Layout.tsx)
- [src/views/Dashboard.tsx](/home/thang/Dev/Web/ComputerGraphics/src/views/Dashboard.tsx)
- [src/views/Library.tsx](/home/thang/Dev/Web/ComputerGraphics/src/views/Library.tsx)
- [src/router/AppRoutes.tsx](/home/thang/Dev/Web/ComputerGraphics/src/router/AppRoutes.tsx)

Nếu thấy mình sắp sửa một trong các file trên, hãy tự hỏi:

1. Việc này có thật sự áp dụng cho nhiều bài không?
2. Nếu chỉ áp dụng cho một bài, có thể đưa nó về `manifest.ts`, `data/` hoặc component của bài đó không?

## Danh sách file tổng hợp quan trọng

### Bài học

- [src/lessons/registry.ts](/home/thang/Dev/Web/ComputerGraphics/src/lessons/registry.ts): tự quét các folder `src/modules/lesson*/`
- [src/lessons/types.ts](/home/thang/Dev/Web/ComputerGraphics/src/lessons/types.ts): kiểu dữ liệu của `manifest.ts` và route bài học

### Môn học

- [src/subjects/registry.ts](/home/thang/Dev/Web/ComputerGraphics/src/subjects/registry.ts)
- [src/subjects/types.ts](/home/thang/Dev/Web/ComputerGraphics/src/subjects/types.ts)

## Môn học hoạt động ra sao

Mỗi môn có thể tự khai báo:

- tên môn
- màu
- icon
- danh sách thẻ bài học
- có hiện danh sách bài ở menu trái hay không
- có hiện ở trang chủ hay không

Hiện tại phần này nằm trong:

- [src/subjects/registry.ts](/home/thang/Dev/Web/ComputerGraphics/src/subjects/registry.ts)
