import React from "react";

import grass from "../media/blob.svg";
import styled from "styled-components";
import theme from "../theme.js";
import { Link } from "react-router-dom";

let LoginButton = styled.button`
  border: none;
  background: transparent;
  padding: 10px 30px;
  color: #fff;
  font-weight: 400;
  font-family: roboto;
  font-size: 20px;
  cursor: pointer;
  padding: 20px 30px;
  border-radius: 10px;
  background: #000;

  margin-top: 20px;
`;

let MainContainer = styled.div`
  flex-direction: row;
  display: flex;
`;

let IntroContainer = styled.div`
  flex-direction: column;
  display: flex;
  margin-top: 50px;
  padding: 25px;
  @media (min-width: 768px) {
  }
`;

let IntroContainerText = styled.div`
  font-family: ${theme.fontFamily};
  font-weight: 900;
  font-size: 45px;
  color: #1b1b1b;

  margin-bottom: 5px;
`;

let GrassImg1 = styled.img`
  height: 450px;
  margin-top: 10px;
  margin-bottom: -112px;
  margin-right: 30px;
  width: 450px;
`;
let GrassImg2 = styled.img`
  height: 280px;
  margin-top: 100px;
  margin-bottom: -30px;
  width: 280px;
`;
let GrassImg3 = styled.img`
  height: 280px;
  margin-top: 100px;
  margin-bottom: -10px;
  width: 280px;
`;

let VisualBalanceContainer = styled.div`
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
  display: none;
  @media (min-width: 768px) {
    display: flex;
    flex: 1;
  }
`;

function WelcomeBoard() {
  return (
    <div>
      <MainContainer>
        <IntroContainer>
          <IntroContainerText>Platform for creating web app</IntroContainerText>

          <Link to="/dashboard">
            <LoginButton>Get Started</LoginButton>
          </Link>
        </IntroContainer>

        <VisualBalanceContainer>
          <GrassImg1 src={grass} className="App-logo" alt="logo" />
        </VisualBalanceContainer>
      </MainContainer>
    </div>
  );
}

export default WelcomeBoard;
