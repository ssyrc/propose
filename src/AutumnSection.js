import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Section = styled.section`
  min-height: 100vh;
  background: linear-gradient(180deg, #ffe4b5 0%, #fffbe7 50%, #e0eafc 100%);
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
  color: #b8860b;
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

function AutumnSection() {
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
    section.style.width = '100vw';
    section.style.height = '100vh';
    section.style.overflow = 'hidden';
    canvas.width = width;
    canvas.height = height;
    const leafImg = new window.Image();
    leafImg.src = process.env.PUBLIC_URL + "/leaf.png";

    const leaves = [];
    for (let i = 0; i < 15; i++) {
      leaves.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 32 + Math.random() * 16,
        speed: 1 + Math.random() * 2,
        angle: Math.random() * Math.PI * 2,
        rotate: Math.random() * 360,
        alpha: 0.4 + Math.random() * 0.5 
      });
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      leaves.forEach(leaf => {
        ctx.save();
        ctx.globalAlpha = leaf.alpha;
        ctx.translate(leaf.x, leaf.y);
        ctx.rotate(leaf.rotate * Math.PI / 180);
        ctx.drawImage(leafImg, -leaf.r/2, -leaf.r/2, leaf.r, leaf.r);
        ctx.restore();
        leaf.y += leaf.speed;
        leaf.x += Math.sin(leaf.angle) * 2;
        leaf.angle += 0.01;
        leaf.rotate += 0.5;
        if (leaf.y > height) {
          leaf.y = -20;
          leaf.x = Math.random() * width;
          leaf.alpha = 0.4 + Math.random() * 0.5;
        }
      });
      requestAnimationFrame(draw);
    }
    leafImg.onload = draw;
  }, []);

  return (
  <Section ref={sectionRef} style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%"}} />
      <FadeInUp ref={quoteRef} visible={quoteVisible}><Quote>가을, </Quote></FadeInUp>
      <FadeInUp ref={letterRef} visible={letterVisible}>
        <Letter>
          그것이 사랑이라면 네, 당신을 사랑합니다.<br />
          그리고 감사합니다, 나에게 와주어서<br />
          잘 부탁드립니다, 당신의 내가 되겠습니다.
        </Letter>
      </FadeInUp>
    </Section>
  );
}

export default AutumnSection;
