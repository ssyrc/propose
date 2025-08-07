import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Section = styled.section`
  min-height: 100vh;
  background: linear-gradient(135deg, #fff0f6, #f9f6f2);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Quote = styled.h2`
  color: #d4af37;
  font-size: 2rem;
  margin-top: 80px;
`;

function SpringSection() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const petals = [];
    const width = window.innerWidth;
    const height = 400;
    canvas.width = width;
    canvas.height = height;

    for (let i = 0; i < 30; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 8 + Math.random() * 8,
        color: "#ffb7c5",
        speed: 1 + Math.random() * 2,
        angle: Math.random() * Math.PI * 2
      });
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      petals.forEach(petal => {
        ctx.beginPath();
        ctx.arc(petal.x, petal.y, petal.r, 0, Math.PI * 2);
        ctx.fillStyle = petal.color;
        ctx.globalAlpha = 0.7;
        ctx.fill();
        petal.y += petal.speed;
        petal.x += Math.sin(petal.angle) * 2;
        petal.angle += 0.01;
        if (petal.y > height) {
          petal.y = -20;
          petal.x = Math.random() * width;
        }
      });
      requestAnimationFrame(draw);
    }
    draw();
  }, []);

  return (
    <Section>
      <canvas ref={canvasRef} style={{position: "absolute", top: 0, left: 0, width: "100%", height: "400px"}} />
      <Quote>봄, 벚꽃이 휘날리는 우리의 시작<br />"너와 함께라서 모든 순간이 꽃이 된다."</Quote>
      <img src="spring.jpg" alt="봄 사진" style={{width: "60%", borderRadius: "16px", marginTop: "32px"}} />
    </Section>
  );
}

export default SpringSection;
