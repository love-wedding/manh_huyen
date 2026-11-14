# Theo dõi khách mời bằng Google Sheets

## Cài đặt một lần

1. Tạo Google Sheet, mở **Extensions → Apps Script**, rồi dán nội dung `Code.gs` vào `Code.gs`.
2. Đổi `ADMIN_TOKEN` trong Apps Script thành một mã bí mật dài.
3. Chọn **Deploy → New deployment → Web app**. Chạy dưới tài khoản của bạn và cho phép truy cập **Anyone** để khách có thể gửi lượt xem. Sao chép URL Web app.
4. Thay `PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE` trong `cd/index.html` bằng URL Web app vừa tạo.
5. Mở `guest-tracker/index.html` trên trang web đã xuất bản, nhập URL và mã quản trị. Sau đó thêm tên khách.

Mỗi khách được lưu vào tab `Khach moi`. Trang quản lý tạo link riêng dạng `cd/?guest=ID`; khách cần dùng link đó để lượt xem được gắn đúng tên. Trang quản lý chỉ tải danh sách khi có mã quản trị. Giữ bí mật mã quản trị và không chia sẻ cho khách.

Mỗi lần mở link sẽ tăng bộ đếm. Nếu trang đang được lưu ở thư mục con khác, điều chỉnh URL link thiệp trong `index.html` của trang quản lý cho đúng.
