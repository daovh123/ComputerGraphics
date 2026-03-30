# ComputerGraphics

Ứng dụng React + Vite cho học liệu tương tác.

## Chạy local

1. Cài dependencies:
   `npm install`
2. Khởi động môi trường dev:
   `npm run dev`
3. Build production:
   `npm run build`

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
- các file giao diện của bài
- `manifest.ts`: cấu hình bài
- `routes.tsx`: route của bài

## Nên sửa ở đâu

### Nếu cần sửa nội dung một bài

Sửa trong:

- `src/modules/lessonXX/data/*`

Ví dụ:

- dữ liệu tổng quan
- dữ liệu trắc nghiệm
- dữ liệu mô hình
- nội dung placeholder nếu bài chưa làm xong

### Nếu cần sửa giao diện một bài

Sửa trong:

- `src/modules/lessonXX/*.tsx`

### Nếu cần sửa tab hoặc menu bên trái của một bài

Sửa trong:

- `src/modules/lessonXX/manifest.ts`

Ở đây thường có:

- tên bài
- đường dẫn chính
- thẻ bài học ở trang chủ
- tab của bài
- các mục con ở menu bên trái

### Nếu cần sửa ảnh của một bài

Sửa hoặc thêm trong:

- `src/modules/lessonXX/assets/*`

Ví dụ:

- [src/modules/lesson33/assets](/home/thang/Dev/Web/ComputerGraphics/src/modules/lesson33/assets)

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

### Danh sách bài học

- [src/lessons/registry.ts](/home/thang/Dev/Web/ComputerGraphics/src/lessons/registry.ts)

File này tự quét các folder `src/modules/lesson*/`.

Nghĩa là:

- bài nào có `manifest.ts` và `routes.tsx` đúng chuẩn thì sẽ được nhận
- không cần thêm `import` thủ công cho từng bài nữa

### Kiểu dữ liệu của bài học

- [src/lessons/types.ts](/home/thang/Dev/Web/ComputerGraphics/src/lessons/types.ts)

Nếu cần biết `manifest.ts` có thể khai báo những gì, xem file này.

### Danh sách môn học

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