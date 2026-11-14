# Theo dõi khách mời bằng Google Sheets

1. Tạo Google Sheet, mở **Extensions → Apps Script**, rồi dán nội dung file `Code.gs` vào trình soạn thảo.
2. Đổi `ADMIN_TOKEN` trong `Code.gs` thành một chuỗi bí mật dài. Giữ đúng chuỗi này để điền vào `ADMIN_TOKEN` trong `index.html`.
3. Chọn **Deploy → New deployment → Web app**, chạy dưới tài khoản của bạn và cho phép truy cập **Anyone** để ghi nhận lượt xem. Deploy, cấp quyền khi Google hỏi, rồi sao chép URL kết thúc bằng `/exec`.
4. Trong `index.html`, dán URL vào `APPS_SCRIPT_URL` và điền cùng chuỗi bí mật vào `ADMIN_TOKEN`.
5. Đưa thư mục `guest-tracker` lên cùng website với thư mục `cd`. Mở trang quản lý để thêm khách và sao chép link riêng.

Khách cần mở link có dạng `cd/?guest=ID` để lượt xem được gắn đúng tên. Trang thiệp cũng cần có URL Apps Script trong đoạn theo dõi ở cuối `cd/index.html`.

Lưu ý: vì trang quản lý chạy ở trình duyệt, `ADMIN_TOKEN` nằm trong mã nguồn phía client. Chỉ chia sẻ URL trang quản lý với người tin cậy; nếu cần bảo mật mạnh hơn, cần đặt trang quản lý sau đăng nhập.
