import React from "react";
import styled from "styled-components";
import { FaRing } from "react-icons/fa";

const Section = styled.section`
  min-height: 100vh;
  background: linear-gradient(135deg, #fff, #f9f6f2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  color: #222;
  font-size: 2.3rem;
  font-family: 'Montserrat', 'Nanum Myeongjo', serif;
  margin-bottom: 32px;
`;

const RingIcon = styled(FaRing)`
  color: #d4af37;
  font-size: 5rem;
  margin-bottom: 24px;
`;

const Letter = styled.p`
  font-size: 1.3rem;
  color: #444;
  font-family: 'Nanum Myeongjo', 'Montserrat', sans-serif;
  margin: 0 0 32px 0;
  text-align: center;
`;

function ProposalSection() {
  return (
    <Section>
      <RingIcon />
      <Title>나랑 결혼해줄래?</Title>
      <Letter>
        우리의 모든 계절을 함께 걸어온 당신에게,<br />
        이제 내 마음을 담아 진심으로 청합니다.<br />
        앞으로의 모든 날도 함께해요.
      </Letter>
    </Section>
  );
}

export default ProposalSection;
