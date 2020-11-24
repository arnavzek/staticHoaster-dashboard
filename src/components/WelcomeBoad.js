import React from "react";
import logo from "../media/logo.svg";
import grass from "../media/grass.svg";
import styled from "styled-components";
import theme from "../theme.js";

let HeadRow = styled.div`
  flex-direction: row;
  justify-content: space-between;
  gap: 12px;
  flex: 1;
  display: flex;
  margin: 25px;
  @media (min-width: 768px) {
    justify-content: flex-end;
    gap: 45px;
  }
`;

let HeadRowButton = styled.button`
  border: none;
  background: transparent;
  font-weight: 900;
  font-family: ${theme.fontFamily};
`;

let DocumentationJump = styled.div`
  flex-direction: row;
  justify-content: space-between;
  gap: 12px;
  flex: 1;
  display: flex;
  margin: 25px;
  @media (min-width: 768px) {
    gap: 25px;
  }
`;

let Button = styled.button`
  border: none;
  background: transparent;
  font-weight: 900;
  font-family: ${theme.fontFamily};
`;

let MainContainer = styled.div`
  flex-direction: row;
  display: flex;
`;

let IntroContainer = styled.div`
  flex-direction: column;
  display: flex;
  @media (min-width: 768px) {
  }
`;

let IntroContainerText = styled.div`
  font-family: ${theme.fontFamily};
  margin: 25px;
  font-weight: 100;
  font-size: 25px;
  margin-bottom: 5px;
`;

let LogoContainer = styled.div`
  flex-direction: row;
  display: flex;
  justify-content: flex-start;
  margin: 25px;
  align-items: flex-end;
`;

let LogoText = styled.h3`
  display: flex;
  font-size: 30px;
  line-height: 0;
  margin: 20px;
  margin-left: -30px;
  font-family: ${theme.fontFamily};

  @media (min-width: 786px) {
    font-size: 50px;
  }
`;

let LogoImg = styled.img`
  height: 200px;
  display: flex;
  width: 200px;

  @media (min-width: 786px) {
    height: 300px;

    width: 300px;
  }
`;

let GrassImg = styled.img`
  height: 400px;
  margin-bottom: -80px;
  width: 400px;
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

let Body = styled.div`
  margin: 0;
  @media (min-width: 786px) {
    margin: 55px;
  }
`;
function WelcomeBoard() {
  return (
    <Body className="welcomeBoard">
      <HeadRow>
        <HeadRowButton>About Us</HeadRowButton>
        <HeadRowButton>Pricing</HeadRowButton>
        <HeadRowButton>Store</HeadRowButton>
        <HeadRowButton>Contact Us</HeadRowButton>
      </HeadRow>

      <MainContainer>
        <IntroContainer>
          <LogoContainer>
            <LogoImg src={logo} className="App-logo" alt="logo" />
            <LogoText>upon.one</LogoText>
          </LogoContainer>
          <IntroContainerText>
            A new way to create powerful web apps in minutes without any setup
          </IntroContainerText>
          <DocumentationJump>
            <Button>Hosting</Button>
            <Button>Database</Button>
            <Button>React App</Button>
            <Button>Binary upload</Button>
          </DocumentationJump>
        </IntroContainer>
        <VisualBalanceContainer>
          <GrassImg src={grass} className="App-logo" alt="logo" />
        </VisualBalanceContainer>
      </MainContainer>
    </Body>
  );
}

export default WelcomeBoard;
