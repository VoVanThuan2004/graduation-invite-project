import type { GraduationInvitation } from "../../data/graduation";
import CardContent from "./CardContent";

interface CardInteriorProps {
  invitation: GraduationInvitation;
  isVisible: boolean;
  onClose: () => void;
}

export default function CardInterior({ invitation, isVisible, onClose }: CardInteriorProps) {
  return (
    <article className={`card-interior ${isVisible ? "card-interior--visible" : ""}`} aria-live="polite">
      <div className="interior-border">
        {isVisible && <CardContent invitation={invitation} onClose={onClose} />}
      </div>
    </article>
  );
}
