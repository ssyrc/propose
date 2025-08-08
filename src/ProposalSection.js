// ✅ ProposalSection.js (패치된 버전)
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
  padding: 0 20px;
  @media (max-width: 600px) {
    min-height: 80vh;
    padding: 0 5px;
  }
`;

const Title = styled.h2`
  color: #fff;
  font-size: 2.3rem;
  font-family: 'Montserrat', 'Nanum Myeongjo', serif;
  margin-bottom: 32px;
  z-index: 2;
  @media (max-width: 600px) {
    font-size: 1.3rem;
    margin-bottom: 18px;
  }
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
  @media (max-width: 600px) {
    font-size: 1rem;
    margin: 0 0 16px 0;
  }
`;

const GrassAnim = keyframes`
  0% { transform: rotate(-5deg); }
  50% { transform: rotate(5deg); }
  100% { transform: rotate(-5deg); }
`;

const Grass = styled.div`
  position: absolute;
  width: 100vw;
  height: 80px;
  left: 0;
  bottom: 0;
  z-index: 3;
  @media (max-width: 600px) {
    height: 40px;
  }
`;

const GrassBlade = styled.div`
  position: absolute;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 60px solid ${props => props.color || '#3b7a2a'};
  animation: ${GrassAnim} 2.5s infinite ease-in-out;
  transform-origin: bottom center;
  opacity: ${props => props.opacity || 0.8};
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

    const stars = Array.from({ length: 80 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height * 0.7,
      r: 1 + Math.random() * 2,
      baseAlpha: 0.2 + Math.random() * 0.3,
      alpha: 0.2 + Math.random() * 0.3,
      twinkleSpeed: 0.8 + Math.random() * 1.2,
      twinkleOffset: Math.random() * Math.PI * 2,
      color: Math.random() > 0.7 ? "#b39ddb" : "#fff"
    }));

    let start = null;
    let animationId;

    function draw(ts) {
      if (!start) start = ts;
      const t = (ts - start) / 1000;
      ctx.clearRect(0, 0, width, height);

      stars.forEach(star => {
        // 더 강한 트윙클 효과
        const twinkle = Math.sin(t * star.twinkleSpeed + star.twinkleOffset);
        star.alpha = star.baseAlpha + 0.8 * Math.max(0, twinkle);
        ctx.save();
        ctx.globalAlpha = Math.max(0.15, Math.min(1, star.alpha));
        ctx.filter = `brightness(${0.7 + 0.7 * Math.max(0, twinkle)})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.shadowColor = star.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
      });

      animationId = requestAnimationFrame(draw);
    }

    animationId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1 }}
    />
  );
}

function ProposalSection() {
  const grassCount = 15;
  const positions = [];
  while (positions.length < grassCount) {
    const pos = Math.floor(Math.random() * 1000) / 1000;
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
        {positions.map((pos, i) => {
          const bladeHeight1 = 120 + Math.random() * 80;
          const bladeHeight2 = 80 + Math.random() * 60;
          return (
            <React.Fragment key={i}>
              <GrassBlade
                color="#3b7a2a"
                style={{ left: `${pos * 100}%`, height: `${bladeHeight1}px`, animationDelay: `${i * 0.2}s` }}
              />
              <GrassBlade
                color="#a3e635"
                opacity={0.6}
                style={{ left: `${pos * 100}%`, height: `${bladeHeight2}px`, animationDelay: `${i * 0.2 + 1}s` }}
              />
            </React.Fragment>
          );
        })}
      </Grass>
      {/* 별똥별 애니메이션 */}
      <ShootingStarCanvas />
    </Section>
  );
}

// 별똥별 캔버스 컴포넌트
function ShootingStarCanvas() {
  const canvasRef = React.useRef(null);
  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = window.innerWidth;
    const height = canvas.parentElement.offsetHeight;
    canvas.width = width;
    canvas.height = height;
    let shootingStars = [];
    let lastTime = 0;
    function spawnStar() {
      // x: width - 40, y: 40 대신 x, y를 top edge에서 랜덤하게
      const startX = 40 + Math.random() * (width - 80);
      const startY = 20 + Math.random() * 40;
      shootingStars.push({
        x: startX,
        y: startY,
        len: 220 + Math.random() * 60,
        speed: 13 + Math.random() * 5, // 더 빠르게
        alpha: 1,
        trail: []
      });
    }
    function draw(ts) {
      ctx.clearRect(0, 0, width, height);
      // 별똥별
      shootingStars.forEach(star => {
        // trail (얇은 실처럼)
        ctx.save();
        ctx.globalAlpha = star.alpha * 0.7;
        ctx.strokeStyle = '#fff';
        ctx.shadowColor = '#b39ddb';
        ctx.shadowBlur = 8;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(star.x - star.len * 0.7, star.y + star.len * 0.7);
        ctx.lineTo(star.x, star.y);
        ctx.stroke();
        ctx.restore();
        // head (작게, 왼쪽 끝)
        ctx.save();
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x - star.len * 0.7, star.y + star.len * 0.7, 1.7, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.shadowColor = '#b39ddb';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
        // move
        star.x -= star.speed;
        star.y += star.speed * 0.7;
        star.alpha -= 0.018;
      });
      shootingStars = shootingStars.filter(star => star.alpha > 0 && star.x > -40 && star.y < height + 40);
      // 랜덤하게 별똥별 생성
      if (Math.random() < 0.008 && ts - lastTime > 800) {
        spawnStar();
        lastTime = ts;
      }
      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
    return () => { shootingStars = []; };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}
    />
  );
}

export default ProposalSection;
