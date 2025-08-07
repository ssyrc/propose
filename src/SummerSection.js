import React from "react";
import Wavify from "react-wavify";
import styled from "styled-components";

const Section = styled.section`
  min-height: 100vh;
  background: linear-gradient(135deg, #e0f7fa, #fffde4);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Quote = styled.h2`
  color: #0077be;
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

function SummerSection() {
  return (
    <Section>
      <Quote>여름, 파도가 치는 우리의 열정<br />"함께라면 어떤 바다도 두렵지 않아."</Quote>
      <Letter>
        뜨거운 햇살 아래, 파도 소리와 함께<br />
        당신과 나란히 걷던 그 여름을 기억해요.<br />
        언제나 당신이 내 곁에 있어 든든했어요.<br />
        앞으로도 함께 바다를 건너고 싶어요.
      </Letter>
      <img src="summer.jpg" alt="여름 사진" style={{width: "60%", borderRadius: "16px", marginTop: "32px"}} />
      <div style={{position: "absolute", bottom: 0, width: "100%"}}>
        <Wavify
          fill="#0077be"
          paused={false}
          options={{
            height: 40,
            amplitude: 30,
            speed: 0.25,
            points: 5
          }}
        />
      </div>
    </Section>
  );
}

export default SummerSection;
