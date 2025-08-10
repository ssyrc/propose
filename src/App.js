import React from 'react';
import './App.css';
import styled, { createGlobalStyle } from "styled-components";
import SpringSection from "./SpringSection";
import SummerSection from "./SummerSection";
import AutumnSection from "./AutumnSection";
import WinterSection from "./WinterSection";
import ProposalSection from "./ProposalSection";

const NightContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background: url(${process.env.PUBLIC_URL + '/sanghai.jpg'}) center center/cover no-repeat;
  overflow: hidden;
`;

const Title = styled.h1`
  margin-top: 56px;
  font-size: 4.2rem;
  font-family: 'Tangerine', cursive;
  color: #fff;
  text-shadow: 0 6px 32px #3a225c;
  letter-spacing: 2px;
  z-index: 10;
  text-align: center;
  animation: titleTwinkle 2.2s infinite ease-in-out;
  @media (max-width: 600px) {
    font-size: 2.2rem;
    margin-top: 18px;
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
      if (playing) audioRef.current.play();
    }
  }, [playing]);

  // 첫 화면 진입 시 자동재생 시도
  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.play().catch(() => {});
    }
  }, []);


  // 한글자씩 반짝임
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
  return (
    <>
      <GlobalStyle />
      <NightContainer>
        <Title style={{letterSpacing: "2px"}}>{titleSpans}</Title>
        <Stars>
          {stars}
        </Stars>
        <QuoteBox>
          <p style={{fontSize: '1.2rem', marginBottom: '12px', color: '#e0e0e0', fontFamily: 'Noto Sans KR, sans-serif'}}>
            밤의 고요함 속에서, 너와 나의 마음은 별처럼 반짝인다.<br />
            이 순간, 우리의 사랑은 도시의 불빛보다 더 빛나고 있어.<br />
            함께 걷는 이 밤, 우리의 꿈이 상하이의 야경을 밝힌다.<br />
          </p>
        </QuoteBox>
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
          <audio ref={audioRef} src="I've Never Been In Love Before.mp3" autoPlay loop style={{ display: 'none' }} />
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
