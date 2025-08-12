// src/BgmButton.js
import React, { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

export default function BgmButton({
  src = process.env.PUBLIC_URL + "/오르막길.mp3"
}) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  // 첫 스크롤/클릭 시 자동 재생
  useEffect(() => {
    const tryPlay = () => {
      if (!audioRef.current || playing) return;
      audioRef.current.play()
        .then(() => setPlaying(true))
        .catch(() => {});
      window.removeEventListener("scroll", tryPlay);
      window.removeEventListener("click", tryPlay);
      window.removeEventListener("touchstart", tryPlay);
    };
    window.addEventListener("scroll", tryPlay, { once: true });
    window.addEventListener("click", tryPlay, { once: true });
    window.addEventListener("touchstart", tryPlay, { once: true });
    return () => {
      window.removeEventListener("scroll", tryPlay);
      window.removeEventListener("click", tryPlay);
      window.removeEventListener("touchstart", tryPlay);
    };
  }, [playing]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setPlaying(true))
        .catch(() => {});
    }
  };

  return (
    <>
      <button
        onClick={togglePlay}
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          border: "none",
          background: "rgba(255,255,255,0.85)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 10000
        }}
        aria-label={playing ? "Pause BGM" : "Play BGM"}
      >
        {playing ? (
          <FaPause size={20} color="#333" />
        ) : (
          <FaPlay size={20} color="#333" />
        )}
      </button>
      <audio ref={audioRef} src={src} preload="auto" />
    </>
  );
}
