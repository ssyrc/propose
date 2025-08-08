import React, { useState } from "react";
import logo from './logo.svg';
import './App.css';
import styled, { createGlobalStyle } from "styled-components";

const NightContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background: linear-gradient(90deg, #000 0%, rgba(0,0,0,0.85) 10%, rgba(0,0,0,0.6) 20%, transparent 30%, transparent 70%, rgba(0,0,0,0.6) 80%, rgba(0,0,0,0.85) 90%, #000 100%);
  overflow: hidden;
`;

const ShanghaiImage = styled.img`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: auto;
  height: 100vh;
  object-fit: contain;
  z-index: 1;
  pointer-events: none;
  user-select: none;
`;

const Stars = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2;
  pointer-events: none;
`;

const QuoteBox = styled.div`
  position: relative;
  z-index: 3;
  background: rgba(0,0,0,0.5);
  border-radius: 24px;
  padding: 32px 24px;
  margin-top: 80px;
  max-width: 600px;
  text-align: center;
  color: #fff;
  box-shadow: 0 8px 32px rgba(0,0,0,0.32);
  @media (max-width: 600px) {
    padding: 16px 8px;
    margin-top: 32px;
    border-radius: 12px;
  }
`;
import { FaHeart } from "react-icons/fa";
import SpringSection from "./SpringSection";
import SummerSection from "./SummerSection";
import AutumnSection from "./AutumnSection";
import WinterSection from "./WinterSection";
import ProposalSection from "./ProposalSection";

const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(135deg, #fff, #eaeaea, #f9f6f2);
    color: #222;
    font-family: 'Noto Sans KR', sans-serif;
    margin: 0;
    padding: 0;
  }
`;

// ...기존 Container 제거...

const Title = styled.h1`
  color:rgb(0, 0, 0);
  font-size: 2.5rem;
  margin-bottom: 16px;
  font-family: 'Playfair Display', serif;
  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

const Letter = styled.p`
  font-size: 1.2rem;
  color: #333; /* 진한 회색 */
  margin: 32px 0;
  line-height: 1.7;
  @media (max-width: 600px) {
    font-size: 1rem;
    margin: 16px 0;
  }
`;

const Music = styled.audio`
  margin-top: 24px;
  width: 100%;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <NightContainer>
        <ShanghaiImage src={process.env.PUBLIC_URL + "/sanghai.png"} alt="Shanghai Night" />
        <Stars>
          {[...Array(80)].map((_, i) => {
            const left = Math.random() * 100;
            const top = Math.random() * 60;
            const size = 1 + Math.random() * 2;
            const opacity = 0.5 + Math.random() * 0.5;
            return (
              <div key={i} style={{
                position: 'absolute',
                left: left + '%',
                top: top + '%',
                width: size,
                height: size,
                borderRadius: '50%',
                background: '#fff',
                opacity: opacity,
                boxShadow: '0 0 8px #fff'
              }} />
            );
          })}
        </Stars>
        <QuoteBox>
          <h1 style={{
            fontFamily: 'Dancing Script, Playfair Display, cursive',
            fontSize: '2.6rem',
            marginBottom: '18px',
            color: '#fff',
            fontWeight: 400,
            letterSpacing: '1px'
          }}>
            Happy Birthday, my lover
          </h1>
          <p style={{fontSize: '1.2rem', marginBottom: '12px', color: '#e0e0e0', fontFamily: 'Noto Sans KR, sans-serif'}}>
            밤의 고요함 속에서, 너와 나의 마음은 별처럼 반짝인다.<br />
            이 순간, 우리의 사랑은 도시의 불빛보다 더 빛나고 있어.<br />
            함께 걷는 이 밤, 우리의 꿈이 상하이의 야경을 밝힌다.<br />
          </p>
        </QuoteBox>
        <Music controls autoPlay loop style={{zIndex: 4, marginTop: '32px', width: '100%', maxWidth: '400px'}}>
          <source src="bgm.mp3" type="audio/mp3" />
          브라우저가 오디오를 지원하지 않습니다.
        </Music>
      </NightContainer>
      <SpringSection />
      <SummerSection />
      <AutumnSection />
      <WinterSection />
      <ProposalSection />
    </>
  );
}

export default App;
