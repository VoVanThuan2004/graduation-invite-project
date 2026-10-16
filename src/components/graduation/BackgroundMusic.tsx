import { useEffect, useRef, useState } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Không thể phát nhạc nền:", error);
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const startMusic = async () => {
      try {
        await audio.play();
        // Event "play" sẽ tự cập nhật isPlaying.
      } catch {
        // Trình duyệt có thể chặn autoplay.
        // Giữ trạng thái tắt để khách có thể nhấn nút bật nhạc.
        setIsPlaying(false);
      }
    };

    void startMusic();
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  return (
    <>
      <audio
        ref={audioRef}
        src="/videos/graduation_music.mp3"
        loop
        preload="metadata"
      />

      <button
        type="button"
        onClick={toggleMusic}
        aria-label={isPlaying ? "Tắt nhạc nền" : "Bật nhạc nền"}
        aria-pressed={isPlaying}
        title={isPlaying ? "Tắt nhạc nền" : "Bật nhạc nền"}
        className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[#d8b66a] bg-[#a83242] text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-[#742936] focus:outline-none focus:ring-2 focus:ring-[#d8b66a] focus:ring-offset-2 sm:bottom-6 sm:right-6"
      >
        {isPlaying ? (
          // Icon loa đang phát
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M11 5 6 9H3v6h3l5 4V5Z" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7" />
            <path d="M19 5a10 10 0 0 1 0 14" />
          </svg>
        ) : (
          // Icon loa tắt
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M11 5 6 9H3v6h3l5 4V5Z" />
            <path d="m17 9 5 6" />
            <path d="m22 9-5 6" />
          </svg>
        )}
      </button>
    </>
  );
}
