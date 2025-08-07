import React, { useRef, useState } from "react";
import Snowfall from "react-snowfall";
import styled from "styled-components";

const Section = styled.section`
  min-height: 100vh;
  background: linear-gradient(135deg, #e0eafc, #fff);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FadeInUp = styled.div`
  opacity: ${props => props.visible ? 1 : 0};
  transform: ${props => props.visible ? "translateY(0)" : "translateY(40px)"};
  transition: opacity 0.8s, transform 0.8s;
`;

const Quote = styled.h2`
  color: #333;
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

function WinterSection() {
  const quoteRef = useRef(null);
  const letterRef = useRef(null);
  const quoteVisible = useFadeInOnScroll(quoteRef);
  const letterVisible = useFadeInOnScroll(letterRef);

  const snowflakeImg = new window.Image();
  snowflakeImg.src = process.env.PUBLIC_URL + "/snowflake.png";
  const snowflakeCount = 15;
  // 눈송이 크기를 60%로 줄임 (19~38)
  const snowflakeSizes = Array.from({ length: snowflakeCount }, () => 19 + Math.random() * 19);
  const snowflakeAlphas = Array.from({ length: snowflakeCount }, () => 0.4 + Math.random() * 0.5);

  return (
    <Section>
      <Snowfall
        snowflakeCount={snowflakeCount}
        images={[snowflakeImg]}
        style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%"}}
        radius={snowflakeSizes}
        alpha={snowflakeAlphas}
      />
      <FadeInUp ref={quoteRef} visible={quoteVisible}>
        <Quote>겨울, 눈이 내리는 우리의 약속<br />"차가운 계절에도 너와 함께라면 따뜻해."</Quote>
      </FadeInUp>
      <FadeInUp ref={letterRef} visible={letterVisible}>
        <Letter>
          하얀 눈이 소복이 쌓이는 겨울밤,<br />
          당신과 함께라서 마음이 따뜻해져요.<br />
          언제나 내 곁에 있어줘서 고마워요.<br />
          앞으로도 함께 따뜻한 겨울을 보내고 싶어요.
        </Letter>
      </FadeInUp>
    </Section>
  );
}

export default WinterSection;
