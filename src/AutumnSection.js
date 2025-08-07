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
`;

function AutumnSection() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const leaves = [];
    const leafColors = ["#b8860b", "#d2691e", "#ffb347", "#ff7f50"];
    const width = window.innerWidth;
    const height = 400;
    canvas.width = width;
    canvas.height = height;

    for (let i = 0; i < 30; i++) {
      leaves.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 10 + Math.random() * 10,
        color: leafColors[Math.floor(Math.random() * leafColors.length)],
        speed: 1 + Math.random() * 2,
        angle: Math.random() * Math.PI * 2
      });
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      leaves.forEach(leaf => {
        ctx.beginPath();
        ctx.arc(leaf.x, leaf.y, leaf.r, 0, Math.PI * 2);
        ctx.fillStyle = leaf.color;
        ctx.fill();
        leaf.y += leaf.speed;
        leaf.x += Math.sin(leaf.angle) * 2;
        leaf.angle += 0.01;
        if (leaf.y > height) {
          leaf.y = -20;
          leaf.x = Math.random() * width;
        }
      });
      requestAnimationFrame(draw);
    }
    draw();
  }, []);

  return (
    <Section>
      <canvas ref={canvasRef} style={{position: "absolute", top: 0, left: 0, width: "100%", height: "400px"}} />
      <Quote>가을, 낙엽이 내리는 우리의 깊이<br />"함께 쌓아온 추억이 낙엽처럼 아름답게 내려앉는다."</Quote>
      <img src="autumn.jpg" alt="가을 사진" style={{width: "60%", borderRadius: "16px", marginTop: "32px"}} />
    </Section>
  );
}

export default AutumnSection;
