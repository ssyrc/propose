import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Wavify from "react-wavify";

const Section = styled.section`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(180deg, #e0eafc, #fff, #f8bbd0);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const Quote = styled.h2`
  color: #333;
  font-size: 2rem;
  margin-top: 80px;
  font-family: 'Montserrat', 'Nanum Myeongjo', serif;
  text-align: center;
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
  line-height: 3.4;
  text-align: center;
  position: relative;
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

function WinterSection() {
  const quoteRef = useRef(null);
  const letterRef = useRef(null);
  const quoteVisible = useFadeInOnScroll(quoteRef);
  const letterVisible = useFadeInOnScroll(letterRef);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = canvas?.parentElement;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    const width = section.offsetWidth;
    const height = section.offsetHeight;
    canvas.width = width;
    canvas.height = height;
    // 눈송이
    const snowCount = 40;
    const snows = [];
    for (let i = 0; i < snowCount; i++) {
      snows.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.8,
        r: 3 + Math.random() * 5,
        speed: 0.5 + Math.random() * 1.5,
        alpha: 0.4 + Math.random() * 0.5
      });
    }
    function draw() {
      ctx.clearRect(0, 0, width, height);
      // 눈송이
      snows.forEach(snow => {
        ctx.save();
        ctx.globalAlpha = snow.alpha;
        ctx.beginPath();
        ctx.arc(snow.x, snow.y, snow.r, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.shadowColor = 'rgba(180,180,180,0.35)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetX = snow.r * 0.9;
        ctx.shadowOffsetY = snow.r * 0.9;
        ctx.fill();
        ctx.restore();
        snow.y += snow.speed;
        snow.x += Math.sin(snow.y / 40) * 0.8;
        if (snow.y > height * 0.92) {
          snow.y = -10;
          snow.x = Math.random() * width;
        }
      });
      requestAnimationFrame(draw);
    }
    draw();
  }, []);

  return (
    <Section>
      <canvas ref={canvasRef} style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%"}} />
      <FadeInUp ref={quoteRef} visible={quoteVisible}>
        <Quote>겨울, </Quote>
      </FadeInUp>
      <FadeInUp ref={letterRef} visible={letterVisible}>
        <Letter>
          당신의 순간들을 앞으로 함께 하게 되어 영광입니다.<br />
          여느 때와 같지만 조금은 더 특별한 날,<br />
          빛나는 당신과 함께여서 감사합니다.
        </Letter>
      </FadeInUp>
    </Section>
  );
}

export default WinterSection;
