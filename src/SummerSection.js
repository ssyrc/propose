import React, { useRef, useState } from "react";
import Wavify from "react-wavify";
import styled from "styled-components";

const Section = styled.section`
  min-height: 100vh;
  background: linear-gradient(180deg, #e0f7fa 60%, #ffe4b5 100%); /* 연한 파랑 -> 모래색 */
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
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
  height: 60px; /* 기존 120px에서 60px로 줄임 */
  background: linear-gradient(180deg, #ffe4b5 80%, #f9d99a 100%);
  z-index: 1;
`;

const Waves = styled.div`
  position: absolute;
  bottom: 60px; /* sand 높이와 맞춤 */
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
`;

const Letter = styled.p`
  font-size: 1.1rem;
  color: #444;
  font-family: 'Nanum Myeongjo', 'Montserrat', sans-serif;
  margin: 24px 0 0 0;
  line-height: 1.7;
  text-align: center;
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
        <Quote>여름, 파도가 치는 우리의 열정<br />"함께라면 어떤 바다도 두렵지 않아."</Quote>
      </FadeInUp>
      <FadeInUp ref={letterRef} visible={letterVisible}>
        <Letter>
          뜨거운 햇살 아래, 파도 소리와 함께<br />
          당신과 나란히 걷던 그 여름을 기억해요.<br />
          언제나 당신이 내 곁에 있어 든든했어요.<br />
          앞으로도 함께 바다를 건너고 싶어요.
        </Letter>
      </FadeInUp>
    </Section>
  );
}

export default SummerSection;
