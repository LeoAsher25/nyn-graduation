# FTU Graduation Invitation

Landing page mời tốt nghiệp một trang, viết bằng HTML + CSS + JavaScript thuần.

## Chạy local

Có thể mở `index.html` trực tiếp, nhưng nên chạy qua local server để asset path hoạt động ổn định.

Ví dụ:

```bash
python3 -m http.server 8080
```

Sau đó mở:

```text
http://localhost:8080
```

## Thay nội dung

Mở `script.js`, sửa object `CONFIG` ở đầu file:

```js
const CONFIG = {
  fullName: "Nguyễn Minh Anh",
  firstName: "Minh Anh",
  year: "2026",
  date: "20.09.2026",
  time: "09:00 AM",
  venue: "Foreign Trade University · 91 Chùa Láng, Hà Nội",
  mapsUrl: "...",
  calendarUrl: "#",
};
```

## Thay ảnh

Trang đang mock các path sau:

```text
/images/anh-1.jpg
/images/anh-2.jpg
/images/anh-3.jpg
/images/anh-4.jpg
/images/anh-5.jpg
/images/anh-6.jpg
/images/anh-7.jpg
/images/anh-8.jpg
```

Gợi ý:

- `anh-1`: hero, nên là ảnh dọc hoặc ngang crop được tốt.
- `anh-2`: ảnh toàn thân dọc.
- `anh-3`: chân dung dọc.
- `anh-4` → `anh-7`: ảnh kỷ niệm, mix ngang + dọc.
- `anh-8`: ảnh ending, nên là ảnh ngang hoặc ảnh có nhiều negative space.

Không bắt buộc đúng tên `.jpg`; nếu dùng `.jpg/.webp` thì sửa lại `src` trong `index.html`.

## Nhạc nền

Nếu muốn bật nhạc:

```text
/audio/background.mp3
```

Tạo folder `audio`, thêm file trên. Nếu không thêm thì nút sound vẫn hoạt động nhưng sẽ không phát được.

## RSVP

Hiện tại RSVP/guest message chỉ là frontend demo:

- lựa chọn RSVP hiển thị toast;
- lời nhắn được lưu vào `localStorage`;
- chưa có backend/database.

Nếu sau này cần lưu thật, có thể nối Supabase/Firebase/Formspree rất dễ.

## Deploy

Có thể deploy trực tiếp lên:

- GitHub Pages
- Cloudflare Pages
- Vercel
- Netlify

Không cần build step.
