// ✅ ProposalSection.js (패치된 버전)
import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { FaRing } from "react-icons/fa";

const Section = styled.section`
  min-height: 100vh;
  background: linear-gradient(180deg, #f8bbd0, #6a4fb6, #2d1a47);
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
  font-size: 4.6rem;
  font-family: 'Tangerine', cursive;
  margin-bottom: 32px;
  z-index: 2;
  text-shadow: 0 6px 32px #3a225c, 0 0 24px #fff;
  letter-spacing: 2px;
  text-align: center;
  filter: brightness(1.5) drop-shadow(0 0 12px #fff);
  @media (max-width: 600px) {
    font-size: 2.6rem;
    margin-bottom: 18px;
  }
`;

const RingIcon = styled(FaRing)`
  color: #fff;
  font-size: 5rem;
  margin-bottom: 24px;
  z-index: 2;
  filter: drop-shadow(0 0 16px #fff) brightness(2);
  animation: ringTwinkle 1.8s infinite ease-in-out;
  @keyframes ringTwinkle {
    0% { filter: drop-shadow(0 0 8px #fff) brightness(1.2); }
    40% { filter: drop-shadow(0 0 32px #fff) brightness(2.5); }
    60% { filter: drop-shadow(0 0 16px #fff) brightness(1.7); }
    100% { filter: drop-shadow(0 0 8px #fff) brightness(1.2); }
  }
`;

const Letter = styled.p`
  font-size: 1.1rem;
  color: #fff;
  font-family: 'Nanum Pen Script', 'Tangerine', cursive;
  margin: 24px 0 0 0;
  line-height: 3.4;
  text-align: center;
  position: relative;
  z-index: 2;
  @media (max-width: 600px) {
    font-size: 0.95rem;
    margin: 12px 0 0 0;
  }
  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 18px;
    margin-top: 8px;
    background: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/handwriting/line_wavy.png') repeat-x;
    background-size: contain;
    opacity: 0.7;
  }
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
  const titleText = "Will You Marry Me?";
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
    <Section>
      <StarsCanvas />
      <RingIcon />
      <Title>{titleSpans}</Title>
      <Letter>
        우리의 모든 계절이 아름답고 깊길 바랍니다.<br />
        당신의 반짝임과 나의 반짝임이 순간을 수놓길 바랍니다.<br />
        사랑하는 당신에게, 예림
      </Letter>
      {/* 별똥별 애니메이션 */}
      <ShootingStarCanvas />
      <style>{`
        @keyframes charTwinkle {
          0% { opacity: 0.7; filter: brightness(0.8); }
          40% { opacity: 1; filter: brightness(1.5); }
          60% { opacity: 0.8; filter: brightness(1.1); }
          100% { opacity: 0.7; filter: brightness(0.8); }
        }
      `}</style>
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
