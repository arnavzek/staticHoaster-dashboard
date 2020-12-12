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
  font-weight: 500;
  cursor: pointer;
  color: #444;
  font-size: 15px;
  font-family: ${theme.fontFamily};
`;

let LogoText = styled.h3`
  display: flex;
  font-size: 25px;
  margin: 0;
  font-weight: 700;

  font-family: ${theme.fontFamily};
`;

let LogoImg = styled.img`
  height: 30px;
  margin: 0;
  margin-left: 30px;
  margin-right: 10px;

  display: flex;

  width: 30px;
`;

let LogoContainer = styled.div`
  justify-content: center;
  display: flex;
  height: 100%;
  align-items: center;
`;

let Div = styled.div`
  justify-content: space-between;
  display: flex;
  padding: 10px;
  background: #9999991c;
  flex-direction: row;
  border-radius: 20px;
  margin-bottom: 20px;
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
          <Link to="/docs">Docs</Link>
        </HeadRowButton>
        <HeadRowButton key={4}>
          <Link to="/dashboard">Dashboard</Link>
        </HeadRowButton>
        <HeadRowButton key={5}>
          <a target="_blank" href="https://discord.gg/s8ZysABauT">
            Contact on Discord
          </a>
        </HeadRowButton>
      </HeadRow>
    </Div>
  );
}

export default NavBar;
