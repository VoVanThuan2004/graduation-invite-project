import { Link, useSearchParams } from "react-router-dom";
import type { GraduationInvitation } from "../../data/graduation";
import GraduationCap from "./GraduationCap";
import GraduationDetails from "./GraduationDetails";

interface CardContentProps {
  invitation: GraduationInvitation;
  recipientName: string;
  isInvalidGuest: boolean;
  onClose: () => void;
}

export default function CardContent({
  invitation,
  isInvalidGuest,
  onClose,
}: CardContentProps) {
  const [searchParams] = useSearchParams();
  const guestId = searchParams.get("to");

  return (
    <div className="card-content">
      {isInvalidGuest ? (
        <>
          <GraduationCap />
          <p className="interior-eyebrow">THƯ MỜI TỐT NGHIỆP</p>
          <h2>Liên kết không hợp lệ</h2>
          <p className="invitation-message">
            Mã khách mời trong đường dẫn không tồn tại. Vui lòng kiểm tra lại
            liên kết hoặc liên hệ người gửi.
          </p>
        </>
      ) : (
        <>
          <GraduationCap />
          <p className="interior-eyebrow">WITH JOY AND GRATITUDE</p>
          <h2>{invitation.invitationTitle}</h2>
          <p className="invitation-message">{invitation.invitationMessage}</p>
          <p className="graduate-name">{invitation.name}</p>
          <p className="graduate-degree">{invitation.degree}</p>
          <p className="graduate-school">{invitation.university}</p>
          <GraduationDetails invitation={invitation} />
          <p className="closing-message">{invitation.closingMessage}</p>

          {/* Nút xem hướng dẫn đường đi */}
          <Link
            to={guestId ? `/guide/?to=${guestId}` : "/guide"}
            className="mx-auto mt-4 flex w-fit max-w-full items-center justify-center gap-2 rounded-full border border-[#d8b66a] bg-[#a83242] px-4 py-2 text-center text-xs font-medium text-white transition-all duration-200 hover:border-[#d8b66a] hover:bg-[#742936] focus:outline-none focus:ring-2 focus:ring-[#d8b66a] focus:ring-offset-2 focus:ring-offset-[#fff9f0] sm:px-5 sm:text-sm"
            aria-label={`Xem hướng dẫn đường đến ${invitation.locationName}`}
          >
            <svg
              className="h-4 w-4 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>

            <span className="min-w-0 whitespace-normal break-words">
              Xem hướng dẫn đường đi
            </span>
          </Link>
        </>
      )}

      <button className="close-card-button" type="button" onClick={onClose}>
        Đóng thiệp
      </button>
    </div>
  );
}
