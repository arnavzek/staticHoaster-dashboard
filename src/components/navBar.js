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
  cursor: pointer;
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
  padding: 10px;
  flex-direction: row;
`;

function NavBar(props) {
  let U = props.U;

  return (
    <Div>
      <Link key={1} to="/">
        <LogoContainer>
          <LogoImg src={logo} className="App-logo" alt="logo" />
          <LogoText> upon.one</LogoText>
        </LogoContainer>
      </Link>
      <HeadRow>
        <HeadRowButton key={4}>
          <Link to="/dashboard">Dashboard</Link>
        </HeadRowButton>
        <HeadRowButton key={5}>
          <a target="_blank" href="https://discord.gg/T6KsYPaQ">
            Contact on Discord
          </a>
        </HeadRowButton>
      </HeadRow>
    </Div>
  );
}

export default NavBar;
