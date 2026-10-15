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
          <p className="class-year">{invitation.classYear}</p>
          <GraduationDetails invitation={invitation} />
          <p className="closing-message">{invitation.closingMessage}</p>

          {/* Nút xem hướng dẫn đường đi */}
          <Link
            to={guestId ? `/guide/?to=${guestId}` : "/guide"}
            className="inline-flex items-center gap-2 mt-12 px-5 py-2.5 text-sm font-medium text-white bg-[#a83242] border border-[#d8b66a] rounded-full hover:bg-[#742936] hover:border-[#d8b66a] focus:outline-none focus:ring-2 focus:ring-[#d8b66a] focus:ring-offset-2 focus:ring-offset-[#fff9f0] transition-all duration-200"
            aria-label={`Xem hướng dẫn đường đến ${invitation.locationName}`}
          >
            <svg
              className="w-4 h-4"
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
            Xem hướng dẫn đường đi
          </Link>
        </>
      )}

      <button className="close-card-button" type="button" onClick={onClose}>
        Đóng thiệp
      </button>
    </div>
  );
}
