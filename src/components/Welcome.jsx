import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import animasi from "../coding.gif";

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  border-radius: 20px;
  background: #f5f5f5;
  width: 100%;
  height: 100%;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5;
  color: tomato;
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  font-weight: normal;
`;

const Animation = styled.img`
  width: auto;
  height: 400px;
  margin: 0px 50px;
  margin-bottom: 50px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 30px;
`;

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <WelcomeContainer>
      <Animation src={animasi} alt="loading..." />
      <strong>
        <Title>SIMPLE DASHBOARD APP</Title>
      </strong>
      <Subtitle>Present to PT.Tjakrabiwara Teknologi Indonesia</Subtitle>
      <Subtitle>
        Welcome <strong style={{ color: "black" }}>{user && user.name}</strong>
      </Subtitle>
    </WelcomeContainer>
  );
};

export default Welcome;
