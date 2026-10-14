import GraduationCap from "./GraduationCap";

interface CardCoverProps {
  isOpen: boolean;
  isDisabled: boolean;
  onOpen: () => void;
}

export default function CardCover({ isOpen, isDisabled, onOpen }: CardCoverProps) {
  return (
    <button
      className="card-cover"
      type="button"
      onClick={onOpen}
      disabled={isDisabled}
      aria-label="Mở thiệp mời tốt nghiệp"
      aria-expanded={isOpen}
    >
      <span className="cover-border">
        <span className="cover-corner cover-corner--top-left" aria-hidden="true" />
        <span className="cover-corner cover-corner--top-right" aria-hidden="true" />
        <span className="cover-corner cover-corner--bottom-left" aria-hidden="true" />
        <span className="cover-corner cover-corner--bottom-right" aria-hidden="true" />
        <span className="cover-eyebrow">THE GRADUATION INVITATION</span>
        <GraduationCap />
        <strong className="cover-title">You&apos;re Invited</strong>
        <span className="cover-subtitle">A special day, a new beginning.</span>
        <span className="cover-action">NHẤN ĐỂ MỞ THIỆP</span>
      </span>
    </button>
  );
}
