import React, { useRef, useState } from "react";
import Wavify from "react-wavify";
import styled from "styled-components";

const Section = styled.section`
  min-height: 100vh;
  background: linear-gradient(180deg, #caf1f7ff 0%, #e7f5f7ff 50%, #fffbe7 100%);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 0 20px;
  @media (max-width: 600px) {
    min-height: 80vh;
    padding: 0 5px;
  }
`;

const FadeInUp = styled.div`
  opacity: ${props => props.visible ? 1 : 0};
  transform: ${props => props.visible ? "translateY(0)" : "translateY(40px)"};
  transition: opacity 0.8s, transform 0.8s;
`;

const Sand = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40px; /* 기존 120px에서 60px로 줄임 */
  background: linear-gradient(180deg, #fffbe7 0%, #ffe4b5 100%);
  z-index: 1;
`;

const Waves = styled.div`
  position: absolute;
  bottom: 40px; /* sand 높이와 맞춤 */
  left: 0;
  width: 100%;
  height: 60px;
  z-index: 2;
  pointer-events: none;
`;

const Quote = styled.h2`
  color: #0077be;
  font-size: 2rem;
  margin-top: 80px;
  font-family: 'Montserrat', 'Nanum Myeongjo', serif;
    @media (max-width: 600px) {
      font-size: 1.2rem;
      margin-top: 40px;
    }
`;

const Letter = styled.p`
  font-size: 1.1rem;
  color: #444;
  font-family: 'Nanum Myeongjo', 'Montserrat', sans-serif;
  margin: 24px 0 0 0;
  line-height: 1.7;
  text-align: center;
    @media (max-width: 600px) {
      font-size: 0.95rem;
      margin: 12px 0 0 0;
    }
`;

function useFadeInOnScroll(ref) {
  const [visible, setVisible] = useState(false);
  React.useEffect(() => {
    function onScroll() {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setVisible(rect.top < window.innerHeight - 80);
    }
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [ref]);
  return visible;
}

function SummerSection() {
  const quoteRef = useRef(null);
  const letterRef = useRef(null);
  const quoteVisible = useFadeInOnScroll(quoteRef);
  const letterVisible = useFadeInOnScroll(letterRef);

  return (
    <Section>
      <Waves>
        <Wavify
          fill="#b3e0f7"
          paused={false}
          options={{ height: 40, amplitude: 30, speed: 0.22, points: 5 }}
          style={{ position: "absolute", bottom: 0, left: 0, width: "100%" }}
        />
        <Wavify
          fill="#81d4fa"
          paused={false}
          options={{ height: 60, amplitude: 40, speed: 0.18, points: 7 }}
          style={{ position: "absolute", bottom: 0, left: 0, width: "100%" }}
        />
        <Wavify
          fill="#4fc3f7"
          paused={false}
          options={{ height: 80, amplitude: 50, speed: 0.15, points: 6 }}
          style={{ position: "absolute", bottom: 0, left: 0, width: "100%" }}
        />
      </Waves>
      <Sand />
      <FadeInUp ref={quoteRef} visible={quoteVisible}>
        <Quote>여름, </Quote>
      </FadeInUp>
      <FadeInUp ref={letterRef} visible={letterVisible}>
        <Letter>
          사랑의 정의를 아직도 말로써 내리지는 못했지만<br />
          우리의 눈동자가, 따뜻했던 시간들과,<br />
          마음 한 켠을 아릿하게 채우는 그것이<br />
          사랑이라면 사랑이겠지요,
        </Letter>
      </FadeInUp>
    </Section>
  );
}

export default SummerSection;
