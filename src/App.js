import React from 'react';
import './App.css';
import styled, { createGlobalStyle } from "styled-components";
import SpringSection from "./SpringSection";
import SummerSection from "./SummerSection";
import AutumnSection from "./AutumnSection";
import WinterSection from "./WinterSection";
import ProposalSection from "./ProposalSection";

const NightContainer = styled.div`
  min-height: 120vh;
  width: 100vw;
  position: relative;
  background: url(${process.env.PUBLIC_URL + '/sanghai_full.jpg'}) center center/contain no-repeat;
  overflow: hidden;
`;

const Title = styled.h1`
  position: absolute;
  top: 56px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 4.2rem;
  font-family: 'Tangerine', cursive;
  color: #fff;
  text-shadow: 0 6px 32px #3a225c, 0 0 24px #fff;
  letter-spacing: 2px;
  z-index: 10;
  text-align: center;
  animation: titleTwinkle 2.2s infinite ease-in-out;
  filter: brightness(1.5) drop-shadow(0 0 12px #fff);
  @media (max-width: 600px) {
    font-size: 2.2rem;
    top: 18px;
  }
`;

const Stars = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2;
  pointer-events: none;
`;

const QuoteBox = styled.div`
  position: relative;
  z-index: 3;
  background: rgba(0,0,0,0.5);
  border-radius: 24px;
  padding: 32px 24px;
  margin-top: 80px;
  max-width: 600px;
  text-align: center;
  color: #fff;
  box-shadow: 0 8px 32px rgba(0,0,0,0.32);
  @media (max-width: 600px) {
    padding: 16px 8px;
    margin-top: 32px;
    border-radius: 12px;
  }
`;

const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(135deg, #fff, #eaeaea, #f9f6f2);
    color: #222;
    font-family: 'Noto Sans KR', sans-serif;
    margin: 0;
    padding: 0;
  }
`;

const MusicBox = styled.div`
  position: absolute;
  top: 24px;
  right: 32px;
  z-index: 20;
  background: rgba(30, 20, 40, 0.18);
  border-radius: 18px;
  padding: 8px 12px;
  box-shadow: 0 2px 12px rgba(30,20,40,0.18);
  display: flex;
  align-items: center;
`;

function App() {
  // 반짝이는 별 애니메이션
  const starCount = 80;
  const stars = Array.from({ length: starCount }, (_, i) => {
    const left = Math.random() * 100;
    const top = Math.random() * 60;
    const size = 2 + Math.random() * 5; // 더 크게
    const baseOpacity = 0.3 + Math.random() * 0.4;
    const twinkle = Math.random() * 2 + 1.2;
    return (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: left + '%',
          top: top + '%',
          width: size,
          height: size,
          borderRadius: '50%',
          background: '#fff',
          opacity: baseOpacity,
          boxShadow: '0 0 16px #b39ddb',
          animation: `starTwinkle ${twinkle}s infinite ease-in-out`,
        }}
      />
    );
  });

  const [playing, setPlaying] = React.useState(true);
  const audioRef = React.useRef(null);
  const handleToggle = () => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setPlaying(!playing);
    }
  };

  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.volume = 0.99;
      if (playing) {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [playing]);

  // 첫 화면 진입 시 자동재생 시도
  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.volume = 0.99;
      audioRef.current.autoplay = true;
      audioRef.current.play().catch(() => {});
      setTimeout(() => {
        audioRef.current.play().catch(() => {});
      }, 500);
    }
  }, []);


  // 원래 Title 반짝임 복원
  const titleText = "Happy Birthday, my lover";
  const titleSpans = titleText.split("").map((char, idx) => (
    <span
      key={idx}
      style={{
        display: "inline-block",
        animation: `charTwinkle 1.6s ${0.12 * idx}s infinite ease-in-out`,
        textShadow: "0 6px 32px #3a225c, 0 0 24px #fff",
      }}
    >{char === " " ? "\u00A0" : char}</span>
  ));

  // 아래 문장들 한 줄씩 나타나는 애니메이션
  const messageLines = [
    "우리의 시간선이 같은 방향을 보고 출발하여",
    "같은 속도로 흘러간다는 것이",
    "어찌나 아름답고 편안한지 모릅니다",
    "",
    "미래의 시간선이 항상 행복으로 가득차 있지는 않겠지만",
    "그것마저 인생의 아름다움으로 포함되길 원합니다",
    "당신과 궁극적인 아름다움을 함께 하게 되어 감사합니다",
    "",
    "우리의 시간이 느리게 천천히 ",
    "그리고 깊게 흘러가길 바랍니다",
    "하루하루를 충분히 헤엄치길 바랍니다",
    "",
    "우리는 조금 더 행복해지기 위한 선택을 했습니다",
    "복잡한 세상 속에서 우리는 우리를 위해 살길 바랍니다",
    "근본적인 서로의 행복을 위하여 말입니다",
    "",
    "사랑의 정의를 아직도 말로써 내리지는 못했지만",
    "우리의 눈동자가, 따뜻했던 시간들과,",
    "마음 한 켠을 아릿하게 채우는 그것이 ",
    "사랑이라면 사랑이겠지요",
    "",
    "그것이 사랑이라면 네, 당신을 사랑합니다",
    "그리고 감사합니다, 나에게 와주어서",
    "잘 부탁드립니다, 당신의 내가 되겠습니다",
    "",
    "당신의 순간들을 앞으로 함께 하게 되어 영광입니다",
    "여느 때와 같지만 조금은 더 특별한 날",
    "빛나는 당신과 함께여서 감사합니다"
  ];
  const [visibleMsgLines, setVisibleMsgLines] = React.useState(0);
  React.useEffect(() => {
    function onScroll() {
      const scrollY = window.scrollY;
      // 한 줄씩 60px마다 추가로 나타남
      setVisibleMsgLines(Math.min(messageLines.length, Math.floor(scrollY / 60) + 1));
    }
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <GlobalStyle />
      <NightContainer>
        <Title style={{letterSpacing: "2px"}}>{titleSpans}</Title>
        <Stars>
          {stars}
        </Stars>
        <div style={{
          position: "relative",
          zIndex: 4,
          marginTop: "120px",
          maxWidth: "700px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          textAlign: "center",
          fontSize: "1.35rem",
          color: "#fff",
          fontFamily: "Noto Sans KR, 'Tangerine', cursive",
          textShadow: "0 2px 16px #3a225c, 0 0 24px #fff",
          lineHeight: 2.2,
          padding: "0 12px"
        }}>
          {messageLines.map((line, idx) => (
            <div
              key={idx}
              style={{
                opacity: visibleMsgLines > idx ? 1 : 0,
                transition: "opacity 0.8s",
                filter: line ? "brightness(1.5) drop-shadow(0 0 12px #fff)" : "none",
                marginBottom: line ? "12px" : "32px",
                width: "100%",
                textAlign: "center"
              }}
            >{line}</div>
          ))}
        </div>
        <MusicBox>
          <button
            onClick={handleToggle}
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: 'none',
              borderRadius: '50%',
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(30,20,40,0.18)',
              marginRight: 0
            }}
            aria-label={playing ? 'Pause music' : 'Play music'}
          >
            {playing ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="3" y="3" width="4" height="12" rx="2" fill="#fff"/><rect x="11" y="3" width="4" height="12" rx="2" fill="#fff"/></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><polygon points="4,3 15,9 4,15" fill="#fff"/></svg>
            )}
          </button>
          <audio id="myAudio" ref={audioRef} src="I've Never Been In Love Before.mp3" autoPlay loop playsInline preload="auto" style={{ display: 'none' }} />
        </MusicBox>
      </NightContainer>
      <SpringSection />
      <SummerSection />
      <AutumnSection />
      <WinterSection />
      <ProposalSection />
      <style>{`
        @keyframes charTwinkle {
          0% { opacity: 0.7; filter: brightness(0.8); }
          40% { opacity: 1; filter: brightness(1.5); }
          60% { opacity: 0.8; filter: brightness(1.1); }
          100% { opacity: 0.7; filter: brightness(0.8); }
        }
        @keyframes starTwinkle {
          0% { opacity: 0.2; filter: brightness(0.7); }
          40% { opacity: 1; filter: brightness(1.3); }
          60% { opacity: 0.7; filter: brightness(1.1); }
          100% { opacity: 0.2; filter: brightness(0.7); }
        }
      `}</style>
    </>
  );
}

export default App;
