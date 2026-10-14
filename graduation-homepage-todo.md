# TODO --- Graduation Invitation Website (Home Page)

## 1. Mục tiêu

Xây dựng trang chính đầu tiên cho website thiệp mời tốt nghiệp bằng
ReactJS. Trải nghiệm trọng tâm là một tấm thiệp đang đóng ở giữa màn
hình; người dùng nhấn vào thiệp để mở bìa bằng hiệu ứng 3D và xem nội
dung bên trong.

Đây là phiên bản MVP chỉ tập trung vào **trang chính và tương tác
đóng/mở thiệp**. Chưa triển khai hướng dẫn vị trí, Google Maps, backend,
API, đăng nhập hoặc các trang phụ.

## 2. Công nghệ

-   React + TypeScript + Vite.
-   Tailwind CSS theo phiên bản đang có trong project; trước khi cài
    hoặc chỉnh cấu hình, hãy kiểm tra phiên bản và cách cấu hình hiện
    tại.
-   Motion for React (`motion/react`) cho animation.
-   Lucide React cho icon, nếu project đã có hoặc cần icon.
-   Không dùng `any` trong TypeScript.
-   Không cài thêm thư viện animation 3D hoặc thư viện UI lớn nếu CSS 3D
    và Motion đã đáp ứng được yêu cầu.
-   Không thay đổi package hoặc cấu hình hiện có một cách không cần
    thiết. Nếu project đã được khởi tạo, hãy đọc cấu trúc và tái sử dụng
    những gì phù hợp thay vì tạo lại project.

## 3. Hướng thiết kế

### Phong cách

-   Thanh lịch, ấm áp, mang tính cá nhân.
-   Nền kem sáng, bìa thiệp đỏ trầm, điểm nhấn vàng champagne.
-   Cảm giác giống một tấm thiệp giấy cao cấp, không giống dashboard
    hoặc landing page doanh nghiệp.
-   Bố cục tối giản, khoảng trắng thoáng, chi tiết trang trí vừa đủ.
-   Không dùng gradient rực rỡ, hiệu ứng neon, quá nhiều hạt bay, pháo
    hoa hoặc animation gây mất tập trung.

### Bảng màu

Dùng các CSS variables hoặc theme tokens để dễ điều chỉnh:

-   Nền chính: `#FFF9F0`.
-   Đỏ chủ đạo: `#A83242`.
-   Đỏ đậm cho chữ/điểm nhấn: `#742936`.
-   Vàng champagne: `#D8B66A`.
-   Hồng be phụ: `#F1DFD6`.
-   Màu chữ phụ: `#76665C`.

Không rải mã màu trực tiếp ở nhiều component; ưu tiên khai báo tập
trung.

### Typography

-   Tiêu đề trang và tên trên thiệp: serif thanh lịch, ưu tiên
    `Cormorant Garamond`.
-   Nội dung tiếng Việt và nhãn: sans-serif dễ đọc, ưu tiên
    `Be Vietnam Pro`.
-   Có fallback font hệ thống phù hợp nếu Google Fonts không tải được.
-   Không dùng quá ba font-family.
-   Không dùng cỡ chữ quá nhỏ để ép nội dung vừa khung.

## 4. Phạm vi trang chính

### Trạng thái A --- Thiệp đóng (`closed`)

Màn hình đầu tiên khi truy cập:

1.  Nền kem phủ toàn viewport, có thể thêm texture giấy rất nhẹ bằng CSS
    nếu không ảnh hưởng hiệu năng.
2.  Một header trang trí tối giản gồm nhãn `A NEW CHAPTER` và
    `CLASS OF 2026`; không tạo navbar, menu, sidebar hoặc footer lớn.
3.  Tiêu đề `Graduation Day`.
4.  Một câu giới thiệu ngắn, ấm áp, ví dụ:
    `Một hành trình khép lại, một chương mới bắt đầu.`
5.  Tấm thiệp đỏ trầm nằm chính giữa, có viền mảnh vàng champagne.
6.  Trên bìa thiệp có:
    -   Nhãn nhỏ `THE GRADUATION INVITATION`.
    -   Icon mũ tốt nghiệp đơn giản.
    -   Tiêu đề `You're Invited`.
    -   Dòng phụ `A special day, a new beginning.`
    -   Gợi ý thao tác `NHẤN ĐỂ MỞ THIỆP`.
7.  Bên dưới thiệp có lời nhắc tiếng Việt `Mở tấm thiệp của tôi`.
8.  Có thể thêm một dòng nhỏ ở cuối:
    `Một lời mời nhỏ dành cho những người đặc biệt.`

Nội dung phải được căn chỉnh có chủ đích, phân cấp thị giác rõ ràng và
có khoảng trắng. Không thêm các section khác vào trạng thái ban đầu.

### Trạng thái B --- Đang mở (`opening`)

Khi người dùng nhấn vào thiệp hoặc nút mở thiệp:

1.  Chuyển trạng thái từ `closed` sang `opening`.
2.  Khóa thao tác nhấn lặp trong khi animation đang chạy.
3.  Bìa xoay quanh cạnh trái bằng CSS 3D:
    -   Dùng `perspective` ở scene/container.
    -   Dùng `transform-style: preserve-3d` ở lớp cần thiết.
    -   Dùng `transform-origin: left center` cho bìa.
    -   Dùng `backface-visibility: hidden` để xử lý mặt sau.
4.  Bìa mở sang trái để lộ mặt trong màu kem.
5.  Dùng shadow tinh tế để tạo chiều sâu; tránh làm thiệp trông như một
    khối 3D quá dày.
6.  Không để mặt bìa xuyên qua nội dung hoặc biến mất sai thời điểm.
7.  Tổng thời lượng chuyển động ban đầu khoảng 800--1200ms; có thể tinh
    chỉnh sau khi kiểm tra thực tế.

### Trạng thái C --- Thiệp mở (`open`)

Sau khi bìa mở:

1.  Hiển thị mặt trong màu kem, có viền vàng champagne mảnh.
2.  Nội dung xuất hiện nhẹ nhàng sau khi bìa đã mở đủ; tránh để chữ lộ
    xuyên qua bìa khi animation chưa kết thúc.
3.  Nội dung mặt trong gồm:
    -   Icon mũ tốt nghiệp hoặc họa tiết trang trí nhỏ.
    -   Nhãn `WITH JOY AND GRATITUDE`.
    -   Tiêu đề `Graduation Invitation`.
    -   Lời mời:
        `Trân trọng mời bạn cùng chia sẻ một dấu mốc đáng nhớ trong hành trình của tôi.`
    -   Tên `Võ Văn Thuận`.
    -   Ngành `Software Engineering`.
    -   Trường `Ton Duc Thang University`.
    -   Niên khóa `Class of 2026`.
    -   Hai vùng thông tin `DATE` và `LOCATION`, dùng placeholder dễ
        thay đổi cho đến khi có dữ liệu chính thức.
    -   Câu kết:
        `Sự hiện diện của bạn sẽ khiến ngày đặc biệt này trở nên ý nghĩa hơn.`
4.  Có thể có nút `Đóng thiệp` hoặc `Mở lại bìa` nhỏ, rõ ràng sau khi
    mở. Nếu triển khai, nút phải hoạt động đúng và không phá vỡ bố cục.
5.  Chưa triển khai nút xem hướng dẫn vị trí ở giai đoạn này. Có thể để
    phần vị trí là thông tin tĩnh/placeholder, nhưng không gắn link giả.

## 5. Yêu cầu animation và tương tác

-   Dùng một state rõ ràng, ví dụ `closed | opening | open`; không tạo
    nhiều state trùng lặp.
-   Có thể dùng Motion for React cho opacity/scale và CSS transform cho
    chuyển động 3D của bìa.
-   Không dùng animation tự chạy liên tục gây phân tán.
-   Trên desktop, hover có thể nghiêng thiệp rất nhẹ và thay đổi shadow;
    hover không được làm ảnh hưởng trạng thái mở.
-   Trên thiết bị cảm ứng, không phụ thuộc hover.
-   Toàn bộ vùng thiệp có thể nhấn để mở, nhưng phải có affordance rõ
    ràng.
-   Nút mở thiệp cần dùng được bằng bàn phím và có nhãn truy cập phù
    hợp.
-   Hỗ trợ `prefers-reduced-motion`: giảm hoặc bỏ chuyển động 3D mạnh,
    nhưng vẫn phải chuyển trạng thái và hiển thị nội dung đầy đủ.
-   Nếu có nút mở lại, bảo đảm trạng thái, nội dung và `aria-expanded`
    được cập nhật nhất quán.
-   Tránh layout shift lớn khi chuyển từ đóng sang mở.

## 6. Responsive

Thiết kế mobile-first và kiểm tra ít nhất các nhóm kích thước sau:

-   Mobile nhỏ: khoảng 320--375px.
-   Mobile phổ biến: khoảng 390--430px.
-   Tablet: khoảng 768px.
-   Desktop: từ 1024px trở lên.

### Mobile

-   Nội dung có lề an toàn khoảng 20--24px.
-   Thiệp không tràn ngang viewport.
-   Tấm thiệp đủ lớn để đọc nhưng vẫn có khoảng thở xung quanh.
-   Khi mở, cho phép trang cuộn dọc nếu nội dung cao hơn màn hình.
-   Không ép toàn bộ thiệp mở vào chiều cao cố định khiến chữ bị cắt.
-   Bảo đảm vùng tương tác đủ lớn cho thao tác chạm.

### Desktop

-   Thiệp nằm chính giữa với khoảng trắng hai bên.
-   Kích thước thiệp đóng tham khảo khoảng 320--400px chiều rộng; điều
    chỉnh theo thiết kế thực tế.
-   Hiệu ứng 3D không bị cắt bởi container có `overflow: hidden`.
-   Nội dung mở cân đối, không kéo giãn quá rộng.

## 7. Cấu trúc project đề xuất

Trước khi tạo file, hãy kiểm tra cấu trúc project hiện tại. Nếu project
đã có quy ước riêng, ưu tiên giữ quy ước hiện có. Nếu đang bắt đầu từ
project trống, dùng cấu trúc sau:

``` text
src/
├── assets/
│   ├── images/
│   └── fonts/
├── components/
│   └── graduation/
│       ├── GraduationCard.tsx
│       ├── CardCover.tsx
│       ├── CardInterior.tsx
│       ├── CardContent.tsx
│       └── GraduationDetails.tsx
├── data/
│   └── graduation.ts
├── pages/
│   └── GraduationPage/
│       └── index.tsx
├── styles/
│   └── graduation.css
├── App.tsx
└── main.tsx
```

### Trách nhiệm từng file

-   `pages/GraduationPage/index.tsx`
    -   Tạo layout tổng thể của màn hình đầu tiên.
    -   Hiển thị header tối giản, tiêu đề, mô tả và component thiệp.
    -   Không chứa toàn bộ logic animation chi tiết.
-   `components/graduation/GraduationCard.tsx`
    -   Quản lý state `closed`, `opening`, `open`.
    -   Điều phối việc mở/đóng thiệp và callback hoàn tất animation.
    -   Là component kết hợp `CardCover` và `CardInterior`.
-   `components/graduation/CardCover.tsx`
    -   Chịu trách nhiệm giao diện bìa đỏ.
    -   Chứa nhãn, icon, tiêu đề và hướng dẫn nhấn mở.
    -   Nhận props/callback cần thiết; không tự quản lý state trùng với
        `GraduationCard`.
-   `components/graduation/CardInterior.tsx`
    -   Chịu trách nhiệm lớp giấy bên trong màu kem và viền vàng.
    -   Quản lý cấu trúc hình ảnh của mặt trong, không chứa dữ liệu cá
        nhân hard-code nếu dữ liệu đã nằm trong config.
-   `components/graduation/CardContent.tsx`
    -   Hiển thị lời mời, tên, ngành, trường và niên khóa.
    -   Có thể tách animation xuất hiện nội dung khỏi animation xoay
        bìa.
-   `components/graduation/GraduationDetails.tsx`
    -   Hiển thị thông tin ngày và địa điểm.
    -   Chỉ là thông tin tĩnh ở MVP; chưa triển khai bản đồ hoặc điều
        hướng.
-   `data/graduation.ts`
    -   Chứa dữ liệu có thể thay đổi: tên, ngành, trường, niên khóa, lời
        mời, ngày và địa điểm.
    -   Dùng TypeScript type/interface phù hợp.
    -   Không dùng `any`.
-   `styles/graduation.css`
    -   Chứa các quy tắc CSS đặc thù cho scene 3D, bìa, mặt sau và các
        hiệu ứng không phù hợp để viết bằng utility class.
    -   Tránh đặt CSS global không cần thiết.
-   `App.tsx`
    -   Render `GraduationPage`.
    -   Không tạo router nếu MVP chỉ có một trang và project chưa cần
        routing.
-   `main.tsx`
    -   Điểm khởi chạy React; giữ đúng chuẩn Vite hiện tại.

Không bắt buộc phải tạo mọi file nếu không cần thiết. Ưu tiên component
nhỏ có trách nhiệm rõ ràng, tránh tách component quá mức chỉ để tăng số
file.

## 8. Dữ liệu mẫu

Tạo một object cấu hình có type rõ ràng. Các component đọc dữ liệu từ
cấu hình này thay vì lặp lại chuỗi nội dung ở nhiều nơi.

Các trường dữ liệu đề xuất:

-   `name`
-   `degree`
-   `university`
-   `classYear`
-   `eyebrow`
-   `pageTitle`
-   `intro`
-   `invitationTitle`
-   `invitationMessage`
-   `dateLabel`
-   `dateValue`
-   `locationLabel`
-   `locationValue`
-   `closingMessage`

Ngày và địa điểm chưa được xác nhận thì dùng placeholder hiển thị rõ
ràng trong code, không tự bịa dữ liệu chính thức.

## 9. Accessibility và chất lượng

-   Dùng semantic HTML hợp lý: `main`, `section`, `h1`, `h2`, `button`.
-   Không dùng `div` làm nút bấm nếu có thể dùng `button`.
-   Icon trang trí cần được ẩn khỏi screen reader; icon truyền tải ý
    nghĩa phải có nhãn phù hợp.
-   Đảm bảo độ tương phản văn bản đủ đọc.
-   Không để animation là cách duy nhất để người dùng tiếp cận nội dung.
-   Không có lỗi TypeScript, lỗi console hoặc key warning.
-   Không có thanh cuộn ngang ở các viewport mục tiêu.
-   Không dùng ảnh nền lớn không cần thiết; ưu tiên CSS và icon vector.
-   Không dùng `any`, không thêm dependency trùng chức năng.

## 10. Những việc không làm trong MVP

-   Không làm trang hướng dẫn vị trí hoặc tích hợp Google Maps.
-   Không làm backend, database, API, đăng nhập hoặc hệ thống quản trị.
-   Không làm navbar, dashboard hoặc các trang giới thiệu khác.
-   Không thêm nhạc tự phát.
-   Không thêm hiệu ứng pháo hoa, confetti hoặc hạt bay dày đặc.
-   Không triển khai gallery ảnh nếu chưa có ảnh thật.
-   Không tự ý đổi bảng màu, typography hoặc hướng thiết kế.
-   Không thay toàn bộ cấu hình Vite/Tailwind nếu project hiện tại đã
    hoạt động.

## 11. Checklist nghiệm thu

### UI

-   [ ] Nền kem, đỏ trầm và vàng champagne được sử dụng nhất quán.
-   [ ] Màn hình đầu tiên có bố cục tối giản, thiệp là tâm điểm.
-   [ ] Bìa thiệp có viền và chi tiết trang trí tinh tế.
-   [ ] Typography có phân cấp rõ ràng, nội dung tiếng Việt đọc tốt.
-   [ ] Mặt trong có đủ thông tin theo phạm vi MVP.

### Interaction

-   [ ] Nhấn thiệp hoặc nút mở sẽ chạy animation.
-   [ ] Không thể kích hoạt nhiều lần khi animation đang chạy.
-   [ ] Bìa xoay quanh cạnh trái đúng hướng.
-   [ ] Không thấy chữ xuyên qua bìa trong lúc chuyển động.
-   [ ] Nội dung mặt trong xuất hiện đúng thời điểm.
-   [ ] Nếu có nút đóng/mở lại, nút hoạt động chính xác.
-   [ ] `prefers-reduced-motion` được xử lý.

### Responsive

-   [ ] Không tràn ngang ở màn hình mobile nhỏ.
-   [ ] Thiệp không bị cắt trong trạng thái đóng.
-   [ ] Nội dung có thể cuộn khi thiệp mở trên điện thoại.
-   [ ] Animation không bị cắt bởi container.
-   [ ] Layout cân đối trên tablet và desktop.

### Code

-   [ ] Đã kiểm tra cấu trúc và dependency hiện tại trước khi sửa.
-   [ ] Component và dữ liệu được phân tách hợp lý.
-   [ ] TypeScript không có lỗi và không dùng `any`.
-   [ ] Không có lỗi console.
-   [ ] Chạy được lệnh dev/build theo cấu hình project hiện tại.
-   [ ] Không thêm chức năng ngoài phạm vi MVP.

## 12. Hướng dẫn thực hiện cho Codex

1.  Đọc project hiện tại và kiểm tra `package.json`, cấu trúc `src`, cấu
    hình Tailwind và cách chạy ứng dụng.
2.  Tóm tắt ngắn những gì đang có trước khi thay đổi.
3.  Triển khai trang chính theo concept và cấu trúc đã mô tả.
4.  Ưu tiên hoàn thiện bố cục tĩnh trước, sau đó triển khai animation
    3D.
5.  Kiểm tra responsive và xử lý accessibility.
6.  Chạy TypeScript/build hoặc các script kiểm tra hiện có; sửa lỗi do
    thay đổi gây ra.
7.  Không chỉ tạo mockup tĩnh: thao tác mở thiệp phải hoạt động thật.
8.  Không triển khai các mục nằm ngoài phạm vi MVP.
9.  Cuối cùng, báo cáo các file đã tạo/sửa, cách chạy project và các
    phần còn dùng placeholder.

**Tiêu chí hoàn thành:** người dùng mở trang web sẽ thấy một tấm thiệp
tốt nghiệp thanh lịch ở giữa màn hình; có thể nhấn để mở bìa 3D mượt mà;
nội dung bên trong hiển thị đầy đủ, dễ đọc trên cả desktop và mobile.
