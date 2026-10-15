import { useEffect, useRef, useState, useCallback } from "react";

interface LocationImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
}

export default function LocationImageModal({ isOpen, onClose, images }: LocationImageModalProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const isFirstOpenRef = useRef(true);

  const MIN_SCALE = 1;
  const MAX_SCALE = 4;
  const SCALE_STEP = 0.2;

  const resetTransform = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    if (isOpen && isFirstOpenRef.current) {
      isFirstOpenRef.current = false;
      resetTransform();
    } else if (!isOpen) {
      isFirstOpenRef.current = true;
    }
  }, [isOpen, resetTransform]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && images.length > 1) setCurrentIndex((i) => (i - 1 + images.length) % images.length);
      if (e.key === "ArrowRight" && images.length > 1) setCurrentIndex((i) => (i + 1) % images.length);
    };

    const handleWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      const delta = e.deltaY > 0 ? -SCALE_STEP : SCALE_STEP;
      setScale((s) => Math.min(Math.max(MIN_SCALE, s + delta), MAX_SCALE));
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("wheel", handleWheel, { passive: false });
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("wheel", handleWheel);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, images.length]);

  if (!isOpen) return null;

  const handleZoomIn = () => setScale((s) => Math.min(s + SCALE_STEP, MAX_SCALE));
  const handleZoomOut = () => setScale((s) => Math.max(s - SCALE_STEP, MIN_SCALE));
  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= MIN_SCALE) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || scale <= MIN_SCALE) return;
    setPosition({ x: e.clientX - dragStartRef.current.x, y: e.clientY - dragStartRef.current.y });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (scale <= MIN_SCALE) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.touches[0].clientX - position.x, y: e.touches[0].clientY - position.y };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || scale <= MIN_SCALE) return;
    e.preventDefault();
    setPosition({ x: e.touches[0].clientX - dragStartRef.current.x, y: e.touches[0].clientY - dragStartRef.current.y });
  };

  const handleTouchEnd = () => setIsDragging(false);

  const handleImageLoad = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const canZoomIn = scale < MAX_SCALE;
  const canZoomOut = scale > MIN_SCALE;

  return (
    <div
      className="image-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Xem ảnh địa điểm"
    >
      <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
        {images.length > 1 && (
          <>
            <button
              className="image-modal-nav image-modal-nav--prev"
              onClick={() => setCurrentIndex((i) => (i - 1 + images.length) % images.length)}
              aria-label="Ảnh trước"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              className="image-modal-nav image-modal-nav--next"
              onClick={() => setCurrentIndex((i) => (i + 1) % images.length)}
              aria-label="Ảnh sau"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </>
        )}

        <div
          className="image-modal-image-wrapper"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img
            ref={imageRef}
            src={images[currentIndex]}
            alt=""
            className="image-modal-image"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transformOrigin: "center center",
            }}
            onLoad={handleImageLoad}
            loading="lazy"
          />
        </div>

        <div className="image-modal-controls">
          <button className="image-modal-control" onClick={handleZoomIn} disabled={!canZoomIn} aria-label="Phóng to">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </button>
          <button className="image-modal-control" onClick={handleZoomOut} disabled={!canZoomOut} aria-label="Thu nhỏ">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </button>
          <button className="image-modal-control" onClick={handleReset} aria-label="Đặt lại">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1 4 1 10 7 10" />
              <polyline points="23 20 23 14 17 14" />
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
            </svg>
          </button>
          <button className="image-modal-close" onClick={onClose} aria-label="Đóng">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {images.length > 1 && (
          <div className="image-modal-counter" aria-hidden="true">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>
    </div>
  );
}