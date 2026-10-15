import GraduationCap from "./GraduationCap";

interface CardCoverProps {
  isOpen: boolean;
  isDisabled: boolean;
  onOpen: () => void;
  recipientName: string;
}

export default function CardCover({ isOpen, isDisabled, onOpen, recipientName }: CardCoverProps) {
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
        <span className="cover-eyebrow">THƯ MỜI LỄ TỐT NGHIỆP</span>
        <GraduationCap />
        <strong className="cover-title">Thân Mời</strong>
        <span className="cover-recipient">{recipientName}</span>
        <span className="cover-action">
          MỞ THIỆP
          <span aria-hidden="true">→</span>
        </span>
      </span>
    </button>
  );
}
