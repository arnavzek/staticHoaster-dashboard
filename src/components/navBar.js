import React from "react";
import logo from "../media/logo.svg";
import styled from "styled-components";
import theme from "../theme.js";
import { Link } from "react-router-dom";
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
  text-decoration: none;
  font-weight: 900;
  font-size: 15px;
  font-family: ${theme.fontFamily};
`;

let LogoText = styled.h3`
  display: flex;
  font-size: 20px;

  font-weight: 900;
  font-family: ${theme.fontFamily};
`;

let LogoImg = styled.img`
  height: 40px;
  margin-top: -10px;
  display: flex;

  width: 40px;
`;

let LogoContainer = styled.div`
  justify-content: center;
  display: flex;
  align-items: center;
`;

let Div = styled.div`
  justify-content: space-between;
  display: flex;

  flex-direction: row;
`;

function NavBar(props) {
  let icon = [];
  if (props.showIcon)
    icon.push(
      <Link key={1} to="/">
        <LogoContainer>
          <LogoImg src={logo} className="App-logo" alt="logo" />
          <LogoText> upon.one</LogoText>
        </LogoContainer>
      </Link>
    );
  return (
    <Div>
      {icon}
      <HeadRow>
        <HeadRowButton key={2}>About Us</HeadRowButton>
        <HeadRowButton key={3}>Pricing</HeadRowButton>
        <HeadRowButton key={4}>
          <Link to="/dashboard">Dashboard</Link>
        </HeadRowButton>
        <HeadRowButton key={5}>Contact Us</HeadRowButton>
      </HeadRow>
    </Div>
  );
}

export default NavBar;
