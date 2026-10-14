import type { GraduationInvitation } from "../../data/graduation";
import GraduationCap from "./GraduationCap";
import GraduationDetails from "./GraduationDetails";

interface CardContentProps {
  invitation: GraduationInvitation;
  onClose: () => void;
}

export default function CardContent({ invitation, onClose }: CardContentProps) {
  return (
    <div className="card-content">
      <GraduationCap />
      <p className="interior-eyebrow">WITH JOY AND GRATITUDE</p>
      <h2>{invitation.invitationTitle}</h2>
      <p className="invitation-message">{invitation.invitationMessage}</p>
      <p className="graduate-name">{invitation.name}</p>
      <p className="graduate-degree">{invitation.degree}</p>
      <p className="graduate-school">{invitation.university}</p>
      <p className="class-year">{invitation.classYear}</p>
      <GraduationDetails invitation={invitation} />
      <p className="closing-message">{invitation.closingMessage}</p>
      <button className="close-card-button" type="button" onClick={onClose}>
        Đóng thiệp
      </button>
    </div>
  );
}
