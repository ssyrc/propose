import React, { useState } from "react";
import logo from './logo.svg';
import './App.css';
import styled, { createGlobalStyle } from "styled-components";
import { FaHeart } from "react-icons/fa";
import SpringSection from "./SpringSection";
import SummerSection from "./SummerSection";
import AutumnSection from "./AutumnSection";
import WinterSection from "./WinterSection";

const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(135deg, #fff, #eaeaea, #f9f6f2);
    color: #222;
    font-family: 'Noto Sans KR', sans-serif;
    margin: 0;
    padding: 0;
  }
`;

const Container = styled.div`
  max-width: 700px;
  margin: 40px auto;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  padding: 40px;
  text-align: center;
  border: 2px solid #e0e0e0;
`;

const Title = styled.h1`
  color:rgb(243, 148, 177);
  font-size: 2.5rem;
  margin-bottom: 16px;
  font-family: 'Playfair Display', serif;
`;

const Letter = styled.p`
  font-size: 1.2rem;
  color: #333; /* 진한 회색 */
  margin: 32px 0;
  line-height: 1.7;
`;

const Gallery = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 32px;
`;

const Photo = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 16px;
  border: 2px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  cursor: pointer;
`;

const Music = styled.audio`
  margin-top: 24px;
  width: 100%;
`;

function App() {
  const [modalImg, setModalImg] = useState(null);
  return (
    <>
      <GlobalStyle />
      <Container>
        <Title>
          <FaHeart color="#ffb3b3" /> 우리의 사랑 이야기 <FaHeart color="#ffb3b3" />
        </Title>
        <Gallery>
          <Photo src="사진1.jpg" alt="우리사진1" onClick={() => setModalImg("사진1.jpg")} />
          <Photo src="사진2.jpg" alt="우리사진2" onClick={() => setModalImg("사진2.jpg")} />
          <Photo src="사진3.jpg" alt="우리사진3" onClick={() => setModalImg("사진3.jpg")} />
        </Gallery>
        {modalImg && (
          <div
            style={{
              position: "fixed",
              top: 0, left: 0, width: "100vw", height: "100vh",
              background: "rgba(0,0,0,0.7)", display: "flex",
              justifyContent: "center", alignItems: "center", zIndex: 999
            }}
            onClick={() => setModalImg(null)}
          >
            <img src={modalImg} alt="확대사진" style={{maxWidth: "80vw", maxHeight: "80vh", borderRadius: "24px"}} />
          </div>
        )}
        <Letter>
          사랑하는 예비 남편에게,<br /><br />
          너와 함께한 모든 순간이 소중하고, 앞으로의 모든 날도 함께하고 싶어.<br />
          나의 마음을 담아, 이 웹사이트로 프로포즈를 전해.<br /><br />
          영원히 너를 사랑할게. <br />- 너의 예비 신부가
        </Letter>
        <Music controls autoPlay loop>
          <source src="bgm.mp3" type="audio/mp3" />
          브라우저가 오디오를 지원하지 않습니다.
        </Music>
      </Container>
      <SpringSection />
      <SummerSection />
      <AutumnSection />
      <WinterSection />
    </>
  );
}

export default App;
