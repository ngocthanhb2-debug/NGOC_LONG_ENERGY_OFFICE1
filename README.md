# NL Hợp Đồng — Ngọc Long Energy

Cùng bộ giao diện với NL Office (màu, phông Inter, biểu tượng FontAwesome 6.4, màn hình chính dạng ô chức năng).

Ứng dụng soạn hồ sơ dự án điện mặt trời (một file HTML, chạy hoàn toàn trên trình duyệt):
Hợp đồng · Khai báo điện lực (Mẫu 01/02) · Biên bản nghiệm thu 001/002 · Đề xuất vay vốn · Phiếu đặt hàng nội bộ (BM 07) · Đóng gói hồ sơ.

## Dùng
Mở link GitHub Pages bằng Chrome/Safari. Trên điện thoại: “Thêm vào màn hình chính”.

## Thanh nút dưới cùng
- Nút lớn: **Xem trước** (trang A4) và **Gửi Zalo**.
- Nút nhỏ: **PDF**, **Word**, **In**, **Copy**.
- Tab Đóng gói: **Đóng gói thư mục** và **Gửi cả bộ**.

## Gửi Zalo
- Chọn **PDF** (khách xem ngay) hoặc **Word** (để sửa).
- Điện thoại: nút **💬 Gửi Zalo** → “Chọn Zalo để gửi file” → chọn người nhận.
- Máy tính: app tải file về và mở Zalo, kéo file vào khung chat.
- Tab Đóng gói: **Gửi cả bộ hồ sơ qua Zalo**.
- Mở link từ trong Zalo thì bấm ⋯ → “Mở bằng trình duyệt” trước.

## Hồ sơ & dữ liệu
- **Tự lưu** sau mỗi lần nhập; **📁 Hồ sơ** để tìm / mở / nhân bản / xoá từng khách.
- File CO, CQ, sơ đồ, PDF đối tác được lưu cùng hồ sơ.
- Không có máy chủ: dữ liệu nằm trong trình duyệt của từng máy (IndexedDB).
- **🗄 Sao lưu** tạo 1 file .json (hồ sơ + mẫu + file đính kèm) — gửi vào Zalo “Cloud của tôi”; đổi máy thì **Khôi phục**.

## Văn bản
- **Kiểm tra chặn**: còn thiếu/sai thông tin thì không In, Tải Word, Gửi Zalo, Copy hay Đóng gói được.
- **PDF tạo ngay trong app** (không cần mạng); **👁 Xem trước** hiển thị đúng trang A4.
- **🔢 Cấp số** hợp đồng theo quy tắc cấu hình được; chặn trùng số giữa các hồ sơ.

## Cập nhật
Thay file `index.html` trong repo (Add file → Upload files → Commit).
