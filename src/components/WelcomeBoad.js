import React from "react";

import grass from "../media/grass.svg";
import styled from "styled-components";
import theme from "../theme.js";
import { Link } from "react-router-dom";

let LoginButton = styled.button`
  border: none;
  background: transparent;
  padding: 10px 30px;
  color: #fff;
  font-weight: 900;
  font-family: roboto;
  font-size: 20px;
  cursor: pointer;
  border-radius: 5px;
  background: #000;
  box-shadow: 8px 7px 1px #28fd57;
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

let GrassImg = styled.img`
  height: 280px;
  margin-top: 100px;
  margin-bottom: -10px;
  width: 280px;
`;

let VisualBalanceContainer = styled.div`
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
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
            <LoginButton>Login/sign up</LoginButton>
          </Link>
        </IntroContainer>

        <VisualBalanceContainer>
          <GrassImg src={grass} className="App-logo" alt="logo" />
        </VisualBalanceContainer>
      </MainContainer>
    </div>
  );
}

export default WelcomeBoard;
