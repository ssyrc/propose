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
`;

function WinterSection() {
  return (
    <Section>
      <Snowfall snowflakeCount={80} />
      <Quote>겨울, 눈이 내리는 우리의 약속<br />"차가운 계절에도 너와 함께라면 따뜻해."</Quote>
      <img src="winter.jpg" alt="겨울 사진" style={{width: "60%", borderRadius: "16px", marginTop: "32px"}} />
    </Section>
  );
}

export default WinterSection;
