import { useEffect, useState } from "react";
import type { GraduationInvitation } from "../../data/graduation";
import CardCover from "./CardCover";
import CardInterior from "./CardInterior";

type CardState = "closed" | "opening" | "open" | "closing";

interface GraduationCardProps {
  invitation: GraduationInvitation;
}

const OPEN_DURATION = 980;
const CLOSE_DURATION = 920;

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function GraduationCard({ invitation }: GraduationCardProps) {
  const [cardState, setCardState] = useState<CardState>("closed");
  const isOpen = cardState === "open";
  const isTransitioning = cardState === "opening" || cardState === "closing";

  useEffect(() => {
    if (!isTransitioning) return undefined;

    const duration = reducedMotion() ? 0 : cardState === "opening" ? OPEN_DURATION : CLOSE_DURATION;
    const timer = window.setTimeout(() => {
      setCardState(cardState === "opening" ? "open" : "closed");
    }, duration);

    return () => window.clearTimeout(timer);
  }, [cardState, isTransitioning]);

  const openCard = () => {
    if (cardState === "closed") setCardState("opening");
  };

  const closeCard = () => {
    if (cardState === "open") setCardState("closing");
  };

  return (
    <div className="card-wrap">
      <div className={`card-scene card-scene--${cardState}`}>
        <div className="invitation-paper">
          <CardInterior invitation={invitation} isVisible={isOpen} onClose={closeCard} />
          <CardCover isOpen={isOpen || cardState === "opening"} isDisabled={cardState !== "closed"} onOpen={openCard} />
        </div>
      </div>
      <p className="card-hint" aria-live="polite">
        {isOpen ? "Một ngày đáng nhớ bên những người mình quý mến." : "Mở tấm thiệp của tôi"}
      </p>
    </div>
  );
}
