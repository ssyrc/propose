import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Section = styled.section`
  min-height: 100vh;
  background: linear-gradient(135deg, #fffbe7, #ffe4b5);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Quote = styled.h2`
  color: #b8860b;
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

function AutumnSection() {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    const ctx = canvas.getContext("2d");
    const leaves = [];
    const width = window.innerWidth;
    const height = section.offsetHeight;
    canvas.width = width;
    canvas.height = height;
    const leafImg = new window.Image();
    leafImg.src = process.env.PUBLIC_URL + "/leaf.png";

    for (let i = 0; i < 30; i++) {
      leaves.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 32 + Math.random() * 16,
        speed: 1 + Math.random() * 2,
        angle: Math.random() * Math.PI * 2,
        rotate: Math.random() * 360
      });
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      leaves.forEach(leaf => {
        ctx.save();
        ctx.globalAlpha = 0.8;
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
        }
      });
      requestAnimationFrame(draw);
    }
    leafImg.onload = draw;
  }, []);

  return (
    <Section ref={sectionRef}>
      <canvas ref={canvasRef} style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%"}} />
      <Quote>가을, 낙엽이 내리는 우리의 깊이<br />"함께 쌓아온 추억이 낙엽처럼 아름답게 내려앉는다."</Quote>
      <Letter>
        노란 낙엽이 바람에 흩날릴 때마다<br />
        우리 함께한 시간들이 소중하게 떠올라요.<br />
        당신과 쌓아온 추억이 낙엽처럼 아름답게 내려앉아요.<br />
        앞으로도 함께 따뜻한 계절을 맞이하고 싶어요.
      </Letter>
      <img src="autumn.jpg" alt="가을 사진" style={{width: "60%", borderRadius: "16px", marginTop: "32px"}} />
    </Section>
  );
}

export default AutumnSection;
