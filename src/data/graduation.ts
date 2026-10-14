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
  locationLabel: string;
  locationValue: string;
  closingMessage: string;
}

export const graduation: GraduationInvitation = {
  name: "Võ Văn Thuận",
  degree: "Software Engineering",
  university: "Ton Duc Thang University",
  classYear: "Class of 2026",
  eyebrow: "A NEW CHAPTER",
  pageTitle: "Graduation Day",
  intro: "Một hành trình khép lại, một chương mới bắt đầu.",
  invitationTitle: "Graduation Invitation",
  invitationMessage:
    "Trân trọng mời bạn cùng chia sẻ dấu mốc đáng nhớ trong hành trình của mình.",
  dateLabel: "DATE",
  dateValue: "To be announced",
  locationLabel: "LOCATION",
  locationValue: "To be announced",
  closingMessage:
    "Sự hiện diện của bạn sẽ khiến ngày đặc biệt này trở nên ý nghĩa hơn.",
};
