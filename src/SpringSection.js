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
  color:rgb(212, 55, 115);
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
    const petalImg = new window.Image();
    petalImg.src = process.env.PUBLIC_URL + "/petal.png";

    for (let i = 0; i < 30; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 24 + Math.random() * 16,
        speed: 1 + Math.random() * 2,
        angle: Math.random() * Math.PI * 2,
        rotate: Math.random() * 360
      });
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      petals.forEach(petal => {
        ctx.save();
        ctx.globalAlpha = 0.8;
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
        }
      });
      requestAnimationFrame(draw);
    }
    petalImg.onload = draw;
  }, []);

  return (
    <Section>
      <canvas ref={canvasRef} style={{position: "absolute", top: 0, left: 0, width: "100%", height: "400px"}} />
      <Quote>봄, 벚꽃이 휘날리는 우리의 시작<br />"너와 함께라서 모든 순간이 꽃이 된다."</Quote>
      <Letter>
        사랑하는 당신에게,<br />
        봄의 벚꽃처럼 설레는 마음으로 이 편지를 전해요.<br />
        당신과 함께하는 모든 순간이 꽃길이었어요.<br />
        앞으로도 함께 걸어가고 싶어요.
      </Letter>
      <img src="spring.jpg" alt="봄 사진" style={{width: "60%", borderRadius: "16px", marginTop: "32px"}} />
    </Section>
  );
}

export default SpringSection;
