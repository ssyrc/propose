import React from 'react';
import './App.css';
import styled, { createGlobalStyle } from "styled-components";
import SpringSection from "./SpringSection";
import SummerSection from "./SummerSection";
import AutumnSection from "./AutumnSection";
import WinterSection from "./WinterSection";
import ProposalSection from "./ProposalSection";

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

// 이미지 원본 사이즈 및 화면 크기 기준 계산 (중복 제거)
const IMAGE_WIDTH = 3840; // sanghai_full.jpg의 실제 가로(px)
const IMAGE_HEIGHT = 6000; // sanghai_full.jpg의 실제 세로(px)
const vw = window.innerWidth;
const scale = vw / IMAGE_WIDTH;
const containerHeight = IMAGE_HEIGHT * scale;

function getImageContainerStyle() {
  return {
    width: `${vw}px`,
    height: `${containerHeight}px`,
    position: 'relative',
    overflow: 'hidden',
    background: `url(${process.env.PUBLIC_URL + '/sanghai_full.jpg'}) top center / ${vw}px ${containerHeight}px no-repeat`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  };
}

function App() {
  // 반짝이는 별 애니메이션
  const starCount = 80;
  const stars = Array.from({ length: starCount }, (_, i) => {
    const left = Math.random() * 100;
    const top = Math.random() * 100; // 전체 영역에 랜덤하게 생성
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
    ""
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


  // messageLines 위치 계산 (이미 계산된 값 재사용)
  const firstLineTop = containerHeight * 0.4;
  const lastLineBottom = containerHeight * 0.98;
  const lineCount = messageLines.length;
  const lineGap = (lastLineBottom - firstLineTop) / (lineCount - 1);

  return (
    <>
      <GlobalStyle />
      <div style={getImageContainerStyle()}>
        <Title style={{ letterSpacing: "2px" }}>{titleSpans}</Title>
        <Stars>
          {stars}
        </Stars>
        {messageLines.map((line, idx) => (
          <div
            key={idx}
            style={{
              position: "absolute",
              top: `${firstLineTop + lineGap * idx}px`,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 4,
              width: "100vw",
              fontSize: "1.35rem",
              color: "#fff",
              fontFamily: "Noto Sans KR, 'Tangerine', cursive",
              textShadow: "0 2px 16px #3a225c, 0 0 24px #fff",
              lineHeight: 2.2,
              opacity: visibleMsgLines > idx ? 1 : 0,
              transition: "opacity 0.8s",
              filter: line ? "brightness(1.5) drop-shadow(0 0 12px #fff)" : "none",
              textAlign: "center",
            }}
          >
            {line}
          </div>
        ))}
      </div>
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
