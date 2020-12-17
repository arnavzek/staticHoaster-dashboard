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
  justify-content: flex-end;
  gap: 45px;

  @media (max-width: 768px) {
    margin: 20px 5px;
    justify-content: space-between;
    gap: 0;
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

  @media (max-width: 768px) {
    /* padding: 20px 0; */
    margin-left: 15px;
  }
`;

let LogoContainer = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: row;
  height: 100%;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    /* padding: 20px 0; */

    margin-bottom: 40px;
  }
`;

let Div = styled.div`
  justify-content: space-between;
  display: flex;
  padding: 0;
  background: #9999991c;
  flex-direction: row;
  border-radius: 5px;
  margin-bottom: 20px;
  padding: 0 110px;
  @media (max-width: 768px) {
    background: transparent;
    flex-wrap: wrap;
  }
`;

function NavBar(props) {
  let U = props.U;

  return (
    <Div>
      <Link key={1} to="/">
        <LogoContainer>
          <LogoImg src={logo} className="App-logo" alt="logo" />
          <LogoText> upon.one</LogoText>{" "}
        </LogoContainer>
      </Link>
      <HeadRow>
        <HeadRowButton key={1}>
          <Link to="/docs">Docs</Link>
        </HeadRowButton>
        <HeadRowButton key={2}>
          <Link to="/dashboard">Dashboard</Link>
        </HeadRowButton>
        <HeadRowButton key={3}>
          <a target="_blank" href="https://discord.gg/s8ZysABauT">
            Contact on Discord
          </a>
        </HeadRowButton>
      </HeadRow>
    </Div>
  );
}

export default NavBar;
