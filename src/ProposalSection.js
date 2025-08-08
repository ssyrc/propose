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
      baseAlpha: 0.5 + Math.random() * 0.5,
      alpha: 0.5 + Math.random() * 0.5,
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
  const grassCount = 30;
  const positions = [];
  while (positions.length < grassCount) {
    const pos = Math.floor(Math.random() * 1000) / 1000;
    if (!positions.some(p => Math.abs(p - pos) < 0.02)) {
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
          <GrassBlade
            color={i % 4 === 0 ? '#6bbf59' : i % 3 === 0 ? '#4e9a3a' : '#3b7a2a'}
            style={{
              left: `${pos * 100}%`,
              height: `${80 + Math.random() * 60}px`, // 더 높게
              opacity: 0.7 + Math.random() * 0.3,
              transform: `rotate(${Math.random() * 30 - 15}deg) skewY(${Math.random() * 18 - 9}deg) scaleX(${0.8 + Math.random() * 0.4})`,
              borderRadius: `${6 + Math.random() * 12}px ${6 + Math.random() * 12}px 18px 18px`,
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
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
      shootingStars.push({
        x: width - 40,
        y: 40,
        len: 180 + Math.random() * 80,
        speed: 7 + Math.random() * 3,
        alpha: 1,
        trail: []
      });
    }
    function draw(ts) {
      ctx.clearRect(0, 0, width, height);
      // 별똥별
      shootingStars.forEach(star => {
        // trail
        star.trail.push({x: star.x, y: star.y});
        if (star.trail.length > 12) star.trail.shift();
        for (let i = 0; i < star.trail.length; i++) {
          ctx.save();
          ctx.globalAlpha = star.alpha * (i / star.trail.length) * 0.7;
          ctx.beginPath();
          ctx.arc(star.trail[i].x, star.trail[i].y, 2 + i * 0.7, 0, Math.PI * 2);
          ctx.fillStyle = '#fff';
          ctx.shadowColor = '#b39ddb';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.restore();
        }
        // head
        ctx.save();
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.shadowColor = '#b39ddb';
        ctx.shadowBlur = 16;
        ctx.fill();
        ctx.restore();
        // move
        star.x -= star.speed;
        star.y += star.speed * 0.7;
        star.alpha -= 0.012;
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
