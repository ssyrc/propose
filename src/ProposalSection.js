import React, { useEffect, useRef, useState } from "react";
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
  position: relative;
  width: 100vw;
  height: 80px;
  left: 0;
  bottom: 0;
  z-index: 3;
  /* flex 제거, block으로 */
`;

const GrassBlade = styled.div`
  width: 0;
  height: 60px;
  margin: 0 2px;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 60px solid ${props => props.color || '#3b7a2a'};
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
        baseAlpha: 0.5 + Math.random() * 0.5,
        alpha: 0.5 + Math.random() * 0.5,
        twinkleSpeed: 0.8 + Math.random() * 1.2,
        twinkleOffset: Math.random() * Math.PI * 2,
        color: Math.random() > 0.7 ? "#b39ddb" : "#fff"
      });
    }
    let start = null;
    function draw(ts) {
      if (!start) start = ts;
      const t = (ts - start) / 1000;
      ctx.clearRect(0, 0, width, height);
      stars.forEach(star => {
        // Twinkle effect
        star.alpha = star.baseAlpha + 0.4 * Math.sin(t * star.twinkleSpeed + star.twinkleOffset);
        ctx.save();
        ctx.globalAlpha = Math.max(0.2, Math.min(1, star.alpha));
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
    requestAnimationFrame(draw);
  }, []);
  return <canvas ref={canvasRef} style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1}} />;
}

function ProposalSection() {
  // 풀을 섹션 전체에, 진한/연한 풀 겹쳐서 흔들리게, 랜덤 간격
  const grassCount = Math.floor(window.innerWidth / 20);
  // 랜덤 위치 생성 (중복 방지, 띄엄띄엄)
  const positions = [];
  while (positions.length < grassCount) {
    const pos = Math.floor(Math.random() * 1000) / 1000; // 0~1 사이 랜덤
    if (!positions.some(p => Math.abs(p - pos) < 0.03)) {
      positions.push(pos);
    }
  }
  positions.sort((a, b) => a - b);
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
        {positions.map((pos, i) => (
          <React.Fragment key={i}>
            <GrassBlade color="#3b7a2a" style={{left: `${pos * 100}%`, position: 'absolute', animationDelay: `${i * 0.2}s`}} />
            <GrassBlade color="#a3e635" style={{left: `${pos * 100}%`, position: 'absolute', animationDelay: `${i * 0.2 + 1}s`, opacity: 0.6}} />
          </React.Fragment>
        ))}
      </Grass>
    </Section>
  );
}

export default ProposalSection;
