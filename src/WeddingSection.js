import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { FaRing } from "react-icons/fa";

const Section = styled.section`
  min-height: 100vh;
  background: radial-gradient(ellipse at top, #6a4fb6 0%, #2d1a47 100%);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Title = styled.h2`
  color: #fff;
  font-size: 2.3rem;
  font-family: 'Montserrat', 'Nanum Myeongjo', serif;
  margin-bottom: 32px;
  z-index: 2;
`;

const RingIcon = styled(FaRing)`
  color: #d4af37;
  font-size: 5rem;
  margin-bottom: 24px;
  z-index: 2;
`;

const Letter = styled.p`
  font-size: 1.3rem;
  color: #fff;
  font-family: 'Nanum Myeongjo', 'Montserrat', sans-serif;
  margin: 0 0 32px 0;
  text-align: center;
  z-index: 2;
`;

const GrassAnim = keyframes`
  0% { transform: rotate(-5deg); }
  50% { transform: rotate(5deg); }
  100% { transform: rotate(-5deg); }
`;

const Grass = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 3;
`;

const GrassBlade = styled.div`
  width: 8px;
  height: 60px;
  margin: 0 4px;
  background: linear-gradient(180deg, #a3e635 0%, #3b7a2a 100%);
  border-radius: 0 0 8px 8px;
  animation: ${GrassAnim} 2.5s infinite ease-in-out;
  transform-origin: bottom center;
  opacity: 0.8;
`;

function StarsCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = window.innerWidth;
    const height = canvas.parentElement.offsetHeight;
    canvas.width = width;
    canvas.height = height;
    const stars = [];
    for (let i = 0; i < 80; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.7,
        r: 1 + Math.random() * 2,
        alpha: 0.5 + Math.random() * 0.5,
        color: Math.random() > 0.7 ? "#b39ddb" : "#fff"
      });
    }
    function draw() {
      ctx.clearRect(0, 0, width, height);
      stars.forEach(star => {
        ctx.save();
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.shadowColor = star.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      });
      requestAnimationFrame(draw);
    }
    draw();
  }, []);
  return <canvas ref={canvasRef} style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1}} />;
}

function WeddingSection() {
  return (
    <Section>
      <StarsCanvas />
      <RingIcon />
      <Title>나랑 결혼해줄래?</Title>
      <Letter>
        우리의 모든 계절을 함께 걸어온 당신에게,<br />
        이제 내 마음을 담아 진심으로 청합니다.<br />
        앞으로의 모든 날도 함께해요.
      </Letter>
      <Grass>
        {Array.from({ length: 18 }).map((_, i) => (
          <GrassBlade key={i} style={{animationDelay: `${i * 0.2}s`}} />
        ))}
      </Grass>
    </Section>
  );
}

export default WeddingSection;
