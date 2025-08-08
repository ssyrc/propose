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
  background: url("/sanghai.jpg") center center/cover no-repeat;
  overflow: hidden;
`;

const FloatingTitle = styled.h1`
  position: absolute;
  top: 48px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 4.2rem;
  font-family: 'Tangerine', cursive;
  color: #fff;
  text-shadow: 0 6px 32px #3a225c, 0 2px 8px #e94f9b;
  letter-spacing: 2px;
  z-index: 10;
  display: flex;
  align-items: center;
  animation: floating 2.5s infinite ease-in-out;
  @media (max-width: 600px) {
    font-size: 2.2rem;
    top: 18px;
  }
  @keyframes floating {
    0% { transform: translateX(-50%) translateY(0); }
    50% { transform: translateX(-50%) translateY(-18px); }
    100% { transform: translateX(-50%) translateY(0); }
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
    const size = 1 + Math.random() * 2;
    const opacity = 0.5 + Math.random() * 0.5;
    const twinkle = Math.random() * 2 + 1;
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
          opacity: opacity,
          boxShadow: '0 0 8px #fff',
          animation: `twinkle ${twinkle}s infinite ease-in-out`,
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

  return (
    <>
      <GlobalStyle />
      <NightContainer>
        <FloatingTitle>
          Happy Birthday, my lover
        </FloatingTitle>
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
          <audio ref={audioRef} src="bgm.mp3" autoPlay loop style={{ display: 'none' }} />
        </MusicBox>
      </NightContainer>
      <SpringSection />
      <SummerSection />
      <AutumnSection />
      <WinterSection />
      <ProposalSection />
      <style>{`
        @keyframes twinkle {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }
      `}</style>
    </>
  );
}

export default App;
