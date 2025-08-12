// src/BgmButton.js
import React, { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

export default function BgmButton({
  src = process.env.PUBLIC_URL + "/오르막길.mp3",
  title = "BGM"
}) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  // 재생/일시정지 상태 동기화
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    return () => {
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
    };
  }, []);

  // 첫 사용자 제스처에서 자동재생 시도
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    // 무한 반복
    a.loop = true;

    const tryPlay = async () => {
      if (!a.paused) return;
      try {
        a.muted = true;
        await a.play();
        a.muted = false;
      } catch {}
      detach();
    };

    const opts = { once: true, passive: true };
    const detach = () => {
      window.removeEventListener("scroll", tryPlay, opts);
      document.removeEventListener("click", tryPlay, opts);
      document.removeEventListener("pointerdown", tryPlay, opts);
      document.removeEventListener("touchstart", tryPlay, opts);
      document.removeEventListener("keydown", tryPlay, opts);
      document.removeEventListener("wheel", tryPlay, opts);
    };

    window.addEventListener("scroll", tryPlay, opts);
    document.addEventListener("click", tryPlay, opts);
    document.addEventListener("pointerdown", tryPlay, opts);
    document.addEventListener("touchstart", tryPlay, opts);
    document.addEventListener("keydown", tryPlay, opts);
    document.addEventListener("wheel", tryPlay, opts);

    return detach;
  }, []);

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      try {
        await a.play();
      } catch {
        a.muted = true;
        await a.play();
        a.muted = false;
      }
    } else {
      a.pause();
    }
  };

  return (
    <>
      <button
        onClick={toggle}
        aria-label={playing ? "Pause BGM" : "Play BGM"}
        title={title}
        style={{
          position: "fixed",
          top: "14px",
          right: "14px",
          width: "28px", // 작게 줄임
          height: "28px", // 작게 줄임
          padding: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          zIndex: 10000
        }}
      >
        <div
          style={{
            lineHeight: 0,
            filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.5))"
          }}
        >
          {playing ? (
            <FaPause size={18} color="#ffffff" /> // 아이콘도 축소
          ) : (
            <FaPlay size={18} color="#ffffff" />
          )}
        </div>
      </button>
      <audio ref={audioRef} src={src} preload="auto" playsInline />
    </>
  );
}
