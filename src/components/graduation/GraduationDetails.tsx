import type { GraduationInvitation } from "../../data/graduation";

interface GraduationDetailsProps {
  invitation: GraduationInvitation;
}

export default function GraduationDetails({ invitation }: GraduationDetailsProps) {
  return (
    <dl className="invitation-details">
      <div>
        <dt>{invitation.dateLabel}</dt>
        <dd>{invitation.dateValue}</dd>
      </div>
      <div>
        <dt>{invitation.locationLabel}</dt>
        <dd>{invitation.locationValue}</dd>
      </div>
    </dl>
  );
}
