export interface GraduationInvitation {
  name: string;
  degree: string;
  university: string;
  classYear: string;
  eyebrow: string;
  pageTitle: string;
  intro: string;
  invitationTitle: string;
  invitationMessage: string;
  dateLabel: string;
  dateValue: string;
  dateTime: string;
  dateDate: string;
  locationLabel: string;
  locationName: string;
  locationAddress: string;
  locationMapUrl: string;
  locationImages: string[];
  closingMessage: string;
}

export const graduation: GraduationInvitation = {
  name: "Võ Văn Thuận",
  degree: "Cử nhân Kỹ thuật phần mềm",
  university: "Đại học Tôn Đức Thắng",
  classYear: "Class of 2026",
  eyebrow: "A NEW CHAPTER",
  pageTitle: "Graduation Day",
  intro: "Một hành trình khép lại, một chương mới bắt đầu.",
  invitationTitle: "Thư mời tham dự",
  invitationMessage:
    "LỄ TỐT NGHIỆP",
  dateLabel: "THỜI GIAN",
  dateValue: "10:00, 23/10/2026",
  dateTime: "9:30 - 10:30",
  dateDate: "23/10/2026",
  locationLabel: "ĐỊA ĐIỂM",
  locationName: "Sảnh A, Đại học Tôn Đức Thắng",
  locationAddress: "19 Nguyễn Hữu Thọ, Phường Tân Hưng, TP. Hồ Chí Minh",
  locationMapUrl:
    "https://www.google.com/maps/place/%C4%90%E1%BA%A1i+h%E1%BB%8Dc+T%C3%B4n+%C4%90%E1%BB%A9c+Th%E1%BA%AFng/@10.7319314,106.6993418,856m/data=!3m2!1e3!4b1!4m6!3m5!1s0x317528b2747a81a3:0x33c1813055acb613!8m2!3d10.7319314!4d106.6993418!16s%2Fm%2F02q2bz4?entry=ttu&g_ep=EgoyMDI2MTAxMS4wIKXMDSoASAFQAw%3D%3D",
  locationImages: ["/images/guide/overview-map-1.jpg", "/images/guide/overview-map-2.png"],
  closingMessage:
    "Sự hiện diện của bạn sẽ khiến ngày đặc biệt này trở nên ý nghĩa hơn.",
};
