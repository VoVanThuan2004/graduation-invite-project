import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const overviewMaps = [
  {
    id: "overview-1",
    title: "Sơ đồ khu vực",
    image: "/images/guide/overview-map-1.jpg",
    alt: "Sơ đồ tổng quan khuôn viên trường",
  },
  {
    id: "overview-2",
    title: "Sơ đồ tổng quan",
    image: "/images/guide/overview-map-2.png",
    alt: "Sơ đồ các khu vực trong trường",
  },
];

const motorbikeSteps = [
  {
    id: 1,
    description: "Đến cổng 7, đường D6",
    hasImage: true,
    hasMap: true,
  },
  {
    id: 2,
    description:
      "Đi vào và thông báo với bảo vệ rằng bạn tham dự lễ tốt nghiệp. Nếu được hỏi thông tin, vui lòng đọc mã số sinh viên 52200133 hoặc xuất trình căn cước công dân.",
  },
  {
    id: 3,
    description: "Đi theo chỉ dẫn của bảo vệ, sau đó chạy thẳng.",
  },
  {
    id: 4,
    description:
      "Chạy thẳng đến cây cầu, quẹo phải lên cầu để qua khu vực để xe.",
  },
];

type TransportTap = "motorbike" | "ride-hailing";

// Thông tin đi xe công nghệ
const gate2Address =
  "19 Nguyễn Hữu Thọ, Phường Tân Hưng, Thành phố Hồ Chí Minh";

const gate2MapUrl =
  "https://www.google.com/maps/place/10%C2%B043'56.9%22N+106%C2%B041'59.5%22E/@10.7321163,106.699913,180m/data=!3m1!1e3!4m4!3m3!8m2!3d10.7324722!4d106.6998611?entry=ttu&g_ep=EgoyMDI2MTAxMi4wIKXMDSoASAFQAw%3D%3D";

export default function GuidePage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TransportTap>("motorbike");
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const phoneNumber = "0935148429";
  const [isPhoneCopied, setIsPhoneCopied] = useState(false);
  const phoneCopyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const guestId = searchParams.get("to");

  // Clean up nếu unmount
  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(gate2Address);

      setIsCopied(true);

      // Xóa timeout trước đó nếu người dùng nhấn lại
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }

      // Trở về trạng thái ban đầu sau 3 giây
      copyTimeoutRef.current = setTimeout(() => {
        setIsCopied(false);
        copyTimeoutRef.current = null;
      }, 3000);
    } catch {
      setIsCopied(false);
      alert("Không thể sao chép địa chỉ. Vui lòng thử lại.");
    }
  };

  const handleBack = () => {
    if (guestId) {
      navigate(`/?to=${guestId}`);
    } else {
      navigate("/");
    }
  };

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(phoneNumber);

      setIsPhoneCopied(true);

      if (phoneCopyTimeoutRef.current) {
        clearTimeout(phoneCopyTimeoutRef.current);
      }

      phoneCopyTimeoutRef.current = setTimeout(() => {
        setIsPhoneCopied(false);
        phoneCopyTimeoutRef.current = null;
      }, 3000);
    } catch {
      alert("Không thể sao chép số điện thoại. Vui lòng thử lại.");
    }
  };

  return (
    <main className="relative min-h-[100svh] overflow-x-hidden bg-[#fff9f0] bg-[radial-gradient(rgba(116,41,54,0.045)_0.45px,transparent_0.55px)] bg-[size:7px_7px] px-4 py-8 sm:px-6 sm:py-12">
      {/* Nội dung trang */}
      <div className="relative z-10 mx-auto w-full max-w-3xl">
        {/* Nút back */}
        <button
          className="cursor-pointer inline-flex items-center gap-1.5 mb-4 text-sm font-medium text-[#a83242] hover:text-[#742936] transition-colors border-b border-transparent hover:border-b-[currentColor] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#d8b66a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fff9f0] rounded-sm"
          onClick={handleBack}
          aria-label="Quay lại thiệp mời"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 flex-shrink-0"
            aria-hidden="true"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Quay trở lại thiệp mời
        </button>

        {/* Khung giấy */}
        <div className="bg-[#fff9f0] p-2 shadow-[0_18px_40px_rgba(116,41,54,0.12)] sm:p-3">
          <div className="border border-[#d8b66a] p-4 sm:p-7 md:p-9">
            {/* Tiêu đề */}
            <header className="mb-7 text-center sm:mb-9">
              <p className="mb-2 text-xs uppercase tracking-[0.3em] text-[#a83242] sm:text-sm">
                Hướng dẫn điểm đến & gửi xe
              </p>

              <h1 className="text-2xl font-extrabold tracking-wide text-[#742936] sm:text-3xl md:text-4xl">
                Sơ đồ tổng quan
              </h1>

              <div className="mx-auto mt-4 flex items-center justify-center gap-3">
                <span className="h-px w-10 bg-[#d8b66a]" />
                <span className="h-2 w-2 rotate-45 border border-[#d8b66a]" />
                <span className="h-px w-10 bg-[#d8b66a]" />
              </div>

              <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#76665c] sm:text-base">
                Bản đồ tổng quan khuôn viên trường giúp bạn dễ dàng xác định vị
                trí và lựa chọn lộ trình di chuyển phù hợp.
              </p>
            </header>
            {/* Danh sách bản đồ */}
            <section aria-label="Các sơ đồ khuôn viên trường">
              <div className="space-y-6">
                {overviewMaps.map((map, index) => (
                  <article key={map.id} className="min-w-0">
                    <h2 className="mb-3 flex items-center gap-3 text-sm font-semibold text-[#742936] sm:text-base">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-[#d8b66a] text-xs text-[#a83242]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      {map.title}
                    </h2>

                    <button
                      type="button"
                      onClick={() => setSelectedImage(map.image)}
                      className="group block w-full overflow-hidden border border-[#d8b66a]/70 bg-white p-2 text-left transition-shadow duration-300 hover:shadow-[0_8px_24px_rgba(116,41,54,0.12)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a83242]"
                      aria-label={`Phóng to hình ảnh: ${map.title}`}
                    >
                      <img
                        src={map.image}
                        alt={map.alt}
                        loading="lazy"
                        className="mx-auto max-h-[520px] w-full object-contain transition-transform duration-300 group-hover:scale-[1.01]"
                      />
                    </button>

                    <p className="mt-2 text-center text-xs italic text-[#76665c]">
                      Nhấn vào hình ảnh để xem kích thước lớn hơn
                    </p>
                  </article>
                ))}
              </div>
            </section>
            {/* Phần tabs sẽ được bổ sung ở bước tiếp theo */}
            {/* Tabs phương tiện di chuyển */}
            <section className="mt-10 border-t border-[#d8b66a]/60 pt-7 sm:mt-12 sm:pt-9">
              <header className="mb-6 text-center">
                <h2 className="font-serif text-2xl font-semibold text-[#742936] sm:text-3xl">
                  Hướng dẫn di chuyển
                </h2>

                <p className="mt-3 text-sm leading-6 text-[#76665c]">
                  Chọn phương tiện để xem hướng dẫn phù hợp.
                </p>
              </header>

              {/* Tab buttons */}
              <div
                role="tablist"
                aria-label="Phương tiện di chuyển"
                className="grid grid-cols-2 gap-2 rounded-xl border border-[#d8b66a]/60 bg-[#f1dfd6]/50 p-1.5"
              >
                <button
                  id="tab-motorbike"
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "motorbike"}
                  aria-controls="panel-motorbike"
                  onClick={() => setActiveTab("motorbike")}
                  className={`flex min-h-12 items-center justify-center gap-2 rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200 sm:text-base ${
                    activeTab === "motorbike"
                      ? "bg-[#a83242] text-[#fff9f0] shadow-md"
                      : "text-[#742936] hover:bg-[#fff9f0] hover:text-[#a83242]"
                  }`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 shrink-0"
                    aria-hidden="true"
                  >
                    <circle cx="5.5" cy="17.5" r="3.5" />
                    <circle cx="18.5" cy="17.5" r="3.5" />
                    <path d="M15 6h2l2 3" />
                    <path d="m5.5 17.5 4-7h4l5 7" />
                    <path d="M9.5 10.5 12 7h3" />
                    <path d="M7.5 7.5h3" />
                  </svg>
                  <span>Xe máy</span>
                </button>

                <button
                  id="tab-ride-hailing"
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "ride-hailing"}
                  aria-controls="panel-ride-hailing"
                  onClick={() => setActiveTab("ride-hailing")}
                  className={`flex min-h-12 items-center justify-center gap-2 rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200 sm:text-base ${
                    activeTab === "ride-hailing"
                      ? "bg-[#a83242] text-[#fff9f0] shadow-md"
                      : "text-[#742936] hover:bg-[#fff9f0] hover:text-[#a83242]"
                  }`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 shrink-0"
                    aria-hidden="true"
                  >
                    <path d="M5 11 7 5.5A2 2 0 0 1 8.9 4h6.2A2 2 0 0 1 17 5.5l2 5.5" />
                    <path d="M3 11h18v7H3z" />
                    <path d="M3 14h3M18 14h3" />
                    <circle cx="7" cy="18" r="1.5" />
                    <circle cx="17" cy="18" r="1.5" />
                  </svg>
                  <span>Xe công nghệ</span>
                </button>
              </div>

              {/* Tab content */}
              <div className="mt-6">
                {activeTab === "motorbike" ? (
                  <div
                    id="panel-motorbike"
                    role="tabpanel"
                    aria-labelledby="tab-motorbike"
                    className="space-y-6"
                  >
                    {/* Các bước hướng dẫn */}
                    <div className="rounded-xl border border-[#d8b66a]/60 bg-white/40 p-4 sm:p-6">
                      <div className="mb-6 text-center">
                        <h3 className="font-serif text-xl font-semibold text-[#742936] sm:text-2xl">
                          Hướng dẫn đường đi
                        </h3>
                        <p className="mt-2 text-sm text-[#76665c]">
                          Vui lòng làm theo các bước dưới đây để đến khu vực gửi
                          xe.
                        </p>
                      </div>

                      <div className="space-y-0">
                        {motorbikeSteps.map((step) => (
                          <div
                            key={step.id}
                            className="relative flex gap-4 pb-7 last:pb-0"
                          >
                            {/* Số thứ tự */}
                            <div className="relative flex shrink-0 flex-col items-center">
                              <span className="z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[#d8b66a] bg-[#fff9f0] font-serif text-base font-semibold text-[#a83242]">
                                {step.id}
                              </span>
                            </div>

                            {/* Nội dung bước */}
                            <div className="min-w-0 flex-1 pt-1">
                              <div className="flex flex-wrap items-start justify-between gap-3">
                                <p className="flex-1 text-sm leading-7 text-[#51443f] sm:text-base">
                                  {step.description}
                                </p>

                                {step.hasImage && step.hasMap && (
                                  <div className="flex shrink-0 items-center gap-2">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setSelectedImage(
                                          "/images/guide/cong-7.jpg",
                                        );
                                      }}
                                      aria-label="Xem ảnh cổng 7"
                                      title="Xem ảnh cổng 7"
                                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#d8b66a] bg-[#fff9f0] text-[#a83242] transition hover:bg-[#f1dfd6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a83242]"
                                    >
                                      <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      >
                                        <rect
                                          x="3"
                                          y="3"
                                          width="18"
                                          height="18"
                                          rx="2"
                                        />
                                        <circle cx="8.5" cy="8.5" r="1.5" />
                                        <path d="m21 15-5-5L5 21" />
                                      </svg>
                                    </button>

                                    <a
                                      href="https://www.google.com/maps/place/10%C2%B044'00.3%22N+106%C2%B041'47.0%22E/@10.7334974,106.6964206,15z/data=!4m11!1m6!3m5!2zMTDCsDQ0JzAwLjMiTiAxMDbCsDQxJzQ3LjAiRQ!8m2!3d10.7334167!4d106.6963889!10e5!3m3!8m2!3d10.7334167!4d106.6963889?entry=ttu&g_ep=EgoyMDI2MTAxMi4wIKXMDSoASAFQAw%3D%3D"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      aria-label="Mở Google Maps đến cổng 7"
                                      title="Google Maps"
                                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#d8b66a] bg-[#fff9f0] text-[#a83242] transition hover:bg-[#f1dfd6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a83242]"
                                    >
                                      <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      >
                                        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                                        <circle cx="12" cy="10" r="2.5" />
                                      </svg>
                                    </a>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Video hướng dẫn */}
                    <div className="rounded-xl border border-[#d8b66a]/60 bg-white/40 p-4 sm:p-6">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f1dfd6] text-[#a83242]">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                            aria-hidden="true"
                          >
                            <rect x="3" y="5" width="18" height="14" rx="2" />
                            <path d="m10 9 5 3-5 3z" />
                          </svg>
                        </div>

                        <div>
                          <h3 className="font-serif text-lg font-semibold text-[#742936] sm:text-xl">
                            Video hướng dẫn đường đi
                          </h3>
                          <p className="mt-1 text-xs text-[#76665c] sm:text-sm">
                            Xem trước lộ trình đến khu vực gửi xe.
                          </p>
                        </div>
                      </div>

                      {/* Video giữ nguyên tỷ lệ gốc */}
                      <div className="flex justify-center overflow-hidden rounded-lg border border-[#d8b66a]/60 bg-black">
                        <video
                          controls
                          playsInline
                          preload="metadata"
                          className="block h-auto w-full max-w-[320px] object-contain sm:max-w-[360px]"
                        >
                          <source
                            src="/videos/video_huong_dan.mp4"
                            type="video/mp4"
                          />
                          Trình duyệt của bạn không hỗ trợ phát video.
                        </video>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Giữ nguyên nội dung tab Xe công nghệ */
                  <div
                    id="panel-ride-hailing"
                    role="tabpanel"
                    aria-labelledby="tab-ride-hailing"
                  >
                    {/* Các bước hướng dẫn */}
                    <div className="rounded-xl border border-[#d8b66a]/60 bg-white/40 p-4 sm:p-6">
                      <div className="mb-6 text-center">
                        <h3 className="font-serif text-xl font-semibold text-[#742936] sm:text-2xl">
                          Hướng dẫn đi xe công nghệ
                        </h3>
                      </div>

                      {/* Các bước hướng dẫn */}
                      <div className="space-y-0">
                        {[
                          {
                            id: 1,
                            description:
                              "Đặt xe đến Cổng 1 hoặc Cổng 2 trên đường Nguyễn Hữu Thọ. Bạn có thể tham khảo địa chỉ và vị trí Cổng 2 bên dưới.",
                          },
                          {
                            id: 2,
                            description:
                              "Sau khi xuống xe, đi thẳng vào sảnh A đối diện.",
                          },
                        ].map((step) => (
                          <div
                            key={step.id}
                            className="relative flex gap-4 pb-7 last:pb-0"
                          >
                            <div className="flex shrink-0 flex-col items-center">
                              <span className="z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[#d8b66a] bg-[#fff9f0] font-serif text-base font-semibold text-[#a83242]">
                                {step.id}
                              </span>
                            </div>

                            <div className="min-w-0 flex-1 pt-1">
                              <p className="text-sm leading-7 text-[#51443f] sm:text-base">
                                {step.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Địa chỉ tham khảo Cổng 2 */}
                      <div className="mt-7 rounded-xl border border-[#d8b66a]/70 bg-[#fff9f0] p-4 sm:p-5">
                        <div className="flex flex-col gap-3 sm:flex-row">
                          <a
                            href={gate2MapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-[#a83242] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#742936] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a83242]"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-5 w-5"
                              aria-hidden="true"
                            >
                              <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                              <circle cx="12" cy="10" r="2.5" />
                            </svg>
                            Mở Google Maps
                          </a>

                          <button
                            type="button"
                            onClick={handleCopyAddress}
                            className={`inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a83242] ${
                              isCopied
                                ? "border-green-600 bg-green-50 text-green-700"
                                : "border-[#d8b66a] bg-white text-[#a83242] hover:bg-[#f1dfd6]"
                            }`}
                          >
                            {isCopied ? (
                              <>
                                <svg
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                >
                                  <path d="m5 12 4 4L19 6" />
                                </svg>
                                Đã sao chép
                              </>
                            ) : (
                              <>
                                <svg
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.8"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                >
                                  <rect
                                    x="8"
                                    y="8"
                                    width="12"
                                    height="12"
                                    rx="2"
                                  />
                                  <path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" />
                                </svg>
                                Sao chép địa chỉ
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Thông tin liên lạc */}
            <section className="mt-10 border-t border-[#d8b66a]/60 pt-7 sm:mt-12 sm:pt-9">
              <header className="mb-6 text-center">
                <h2 className="mt-1 font-serif text-2xl font-semibold text-[#742936] sm:text-3xl">
                  Thông tin liên lạc
                </h2>

                <p className="mt-3 text-sm leading-6 text-[#76665c]">
                  Nếu cần hỗ trợ trong quá trình di chuyển, bạn có thể liên hệ
                  với mình.
                </p>
              </header>

              <div className="mx-auto max-w-md rounded-xl border border-[#d8b66a]/70 bg-white/40 p-5 sm:p-6">
                <div className="flex flex-col items-center text-center">
                  {/* Icon điện thoại */}
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#d8b66a]/70 bg-[#f1dfd6] text-[#a83242]">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                      aria-hidden="true"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.19 18a19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.09 3.18 2 2 0 0 1 4.08 1h3a2 2 0 0 1 2 1.72c.12.96.35 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.05 8.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.84.57 2.8.69a2 2 0 0 1 1.77 2.05Z" />
                    </svg>
                  </div>

                  <p className="mt-4 text-sm text-[#76665c]">Số điện thoại</p>

                  {/* Nhấn số để gọi */}
                  <a
                    href={`tel:${phoneNumber}`}
                    className="mt-1 rounded-md font-extrabold text-2xl tracking-wide text-[#a83242] transition hover:text-[#762835] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a83242] sm:text-3xl"
                    aria-label={`Gọi số điện thoại ${phoneNumber}`}
                  >
                    {phoneNumber}
                  </a>

                  <p className="mt-2 text-xs text-[#76665c]">
                    Nhấn vào số điện thoại để gọi trực tiếp.
                  </p>

                  {/* Nút sao chép */}
                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    className={`mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a83242] ${
                      isPhoneCopied
                        ? "border-green-600 bg-green-50 text-green-700"
                        : "border-[#d8b66a] bg-[#fff9f0] text-[#a83242] hover:bg-[#f1dfd6]"
                    }`}
                  >
                    {isPhoneCopied ? (
                      <>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                          aria-hidden="true"
                        >
                          <path d="m5 12 4 4L19 6" />
                        </svg>
                        Đã sao chép số điện thoại
                      </>
                    ) : (
                      <>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                          aria-hidden="true"
                        >
                          <rect x="8" y="8" width="12" height="12" rx="2" />
                          <path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" />
                        </svg>
                        Sao chép số điện thoại
                      </>
                    )}
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Modal phóng to ảnh */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#2b171a]/90 p-3 backdrop-blur-sm sm:p-6"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Xem sơ đồ phóng to"
        >
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center border border-white/40 bg-[#fff9f0] text-2xl text-[#742936] transition hover:bg-[#f1dfd6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label="Đóng hình ảnh"
          >
            &times;
          </button>

          <img
            src={selectedImage}
            alt="Sơ đồ khuôn viên trường được phóng to"
            onClick={(event) => event.stopPropagation()}
            className="max-h-[90svh] max-w-full object-contain"
          />
        </div>
      )}
    </main>
  );
}
