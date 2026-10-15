import { useState } from "react";
import type { GraduationInvitation } from "../../data/graduation";
import LocationImageModal from "./LocationImageModal";

interface GraduationDetailsProps {
  invitation: GraduationInvitation;
}

export default function GraduationDetails({ invitation }: GraduationDetailsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <dl className="invitation-details">
        <div>
          <dt>{invitation.dateLabel}</dt>
          <dd>
            <span className="date-time">{invitation.dateTime}</span>
            <span className="date-date">{invitation.dateDate}</span>
          </dd>
        </div>
        <div>
          <dt>{invitation.locationLabel}</dt>
          <dd>
            <button
              type="button"
              className="location-name-button"
              onClick={openModal}
              aria-label={`Xem ảnh ${invitation.locationName}`}
            >
              <span className="location-name">{invitation.locationName}</span>
              <svg className="location-image-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </button>
            <a
              className="location-address-link"
              href={invitation.locationMapUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`Mở địa chỉ ${invitation.locationAddress} trên Google Maps`}
            >
              <span className="location-address">{invitation.locationAddress}</span>
              <svg className="location-map-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M10.5 13.5a4.5 4.5 0 0 0 6.36.14l2-2a4.5 4.5 0 0 0-6.36-6.36l-1.15 1.15" />
                <path d="M13.5 10.5a4.5 4.5 0 0 0-6.36-.14l-2 2a4.5 4.5 0 1 0 6.36 6.36l1.15-1.15" />
              </svg>
            </a>
          </dd>
        </div>
      </dl>
      <LocationImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        images={invitation.locationImages}
      />
    </>
  );
}
