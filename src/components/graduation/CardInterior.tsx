import type { GraduationInvitation } from "../../data/graduation";
import CardContent from "./CardContent";

interface CardInteriorProps {
  invitation: GraduationInvitation;
  recipientName: string;
  isInvalidGuest: boolean;
  isVisible: boolean;
  onClose: () => void;
}

export default function CardInterior({
  invitation,
  recipientName,
  isInvalidGuest,
  isVisible,
  onClose,
}: CardInteriorProps) {
  return (
    <article className={`card-interior ${isVisible ? "card-interior--visible" : ""}`} aria-live="polite">
      <div className="interior-border">
        {isVisible && (
          <CardContent
            invitation={invitation}
            recipientName={recipientName}
            isInvalidGuest={isInvalidGuest}
            onClose={onClose}
          />
        )}
      </div>
    </article>
  );
}
