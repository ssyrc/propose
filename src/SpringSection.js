import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Section = styled.section`
  min-height: 100vh; 
  background: linear-gradient(180deg, #ffdafeff 0%, #fff0f6 50%, #caf1f7ff 100%);
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
  color: #e94f9b;
  font-size: 2rem;
  margin-top: 80px;
  font-family: 'Montserrat', 'Nanum Myeongjo', serif;
    text-align: left;
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
  text-align: left;
  position: relative;
  @media (max-width: 600px) {
    font-size: 0.95rem;
    margin: 12px 0 0 0;
  }
`;

function useFadeInOnScroll(ref) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
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

function SpringSection() {
  const sectionRef = useRef(null);
  const quoteRef = useRef(null);
  const letterRef = useRef(null);
  const quoteVisible = useFadeInOnScroll(quoteRef);
  const letterVisible = useFadeInOnScroll(letterRef);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    const ctx = canvas.getContext("2d");
    const width = window.innerWidth;
    const height = section.offsetHeight;
    canvas.width = width;
    canvas.height = height;
    const petalImg = new window.Image();
    petalImg.src = process.env.PUBLIC_URL + "/petal.png";
    const petals = [];
    for (let i = 0; i < 15; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 40 + Math.random() * 32,
        speed: 1 + Math.random() * 2,
        angle: Math.random() * Math.PI * 2,
        rotate: Math.random() * 360,
        alpha: 0.4 + Math.random() * 0.5
      });
    }
    function draw() {
      ctx.clearRect(0, 0, width, height);
      petals.forEach(petal => {
        ctx.save();
        ctx.globalAlpha = petal.alpha;
        ctx.translate(petal.x, petal.y);
        ctx.rotate(petal.rotate * Math.PI / 180);
        ctx.drawImage(petalImg, -petal.r/2, -petal.r/2, petal.r, petal.r);
        ctx.restore();
        petal.y += petal.speed;
        petal.x += Math.sin(petal.angle) * 2;
        petal.angle += 0.01;
        petal.rotate += 0.5;
        if (petal.y > height) {
          petal.y = -20;
          petal.x = Math.random() * width;
          petal.alpha = 0.4 + Math.random() * 0.5;
        }
      });
      requestAnimationFrame(draw);
    }
    petalImg.onload = draw;
  }, []);

  return (
  <Section ref={sectionRef} style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%"}} />
      <FadeInUp ref={quoteRef} visible={quoteVisible}><Quote>봄, </Quote></FadeInUp>
      <FadeInUp ref={letterRef} visible={letterVisible}>
        <Letter>
          우리는 조금 더 행복해지기 위한 선택을 했습니다.<br />
          복잡한 세상 속에서 우리는 우리를 위해 살길 바랍니다.<br />
          근본적인 서로의 행복을 위하여 말입니다.
        </Letter>
      </FadeInUp>
    </Section>
  );
}

export default SpringSection;
