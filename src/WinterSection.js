import React from "react";
import Snowfall from "react-snowfall";
import styled from "styled-components";

const Section = styled.section`
  min-height: 100vh;
  background: linear-gradient(135deg, #e0eafc, #fff);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Quote = styled.h2`
  color: #333;
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

function WinterSection() {
  const snowflakeImg = new window.Image();
  snowflakeImg.src = process.env.PUBLIC_URL + "/snowflake.png";

  // 눈송이 크기 랜덤하게 크게 생성
  const snowflakeSizes = Array.from({ length: 80 }, () => 32 + Math.random() * 32); // 32~64px

  return (
    <Section>
      <Snowfall
        snowflakeCount={80}
        images={[snowflakeImg]}
        style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%"}}
        radius={snowflakeSizes}
      />
      <Quote>겨울, 눈이 내리는 우리의 약속<br />"차가운 계절에도 너와 함께라면 따뜻해."</Quote>
      <Letter>
        하얀 눈이 소복이 쌓이는 겨울밤,<br />
        당신과 함께라서 마음이 따뜻해져요.<br />
        언제나 내 곁에 있어줘서 고마워요.<br />
        앞으로도 함께 따뜻한 겨울을 보내고 싶어요.
      </Letter>
      <img src="winter.jpg" alt="겨울 사진" style={{width: "60%", borderRadius: "16px", marginTop: "32px"}} />
    </Section>
  );
}

export default WinterSection;
