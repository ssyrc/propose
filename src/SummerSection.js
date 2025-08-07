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
`;

function SummerSection() {
  return (
    <Section>
      <Quote>여름, 파도가 치는 우리의 열정<br />"함께라면 어떤 바다도 두렵지 않아."</Quote>
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
