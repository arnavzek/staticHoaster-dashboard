import React, { useState, useEffect, useContext, Fragment } from "react";
import logo from "../media/logo.svg";
import styled from "styled-components";
import theme from "../theme.js";
import { Link } from "react-router-dom";
import Context from "../Context";
import UserButton from "./UserButton";
let HeadRow = styled.div`
  flex-direction: row;
  justify-content: space-between;
  gap: 12px;
  flex: 1;
  display: flex;

  justify-content: flex-end;
  gap: 45px;
`;

let HeadRowButton = styled.button`
  border: none;
  background: transparent;
  text-decoration: none;
  font-weight: 100;
  cursor: pointer;
  color: #fff;
  font-size: 15px;
  font-family: ${theme.fontFamily};
`;

let LogoText = styled.h3`
  display: flex;
  font-size: 15px;
  margin: 0px;
  font-weight: 700;

  color: ${(props) => (props.loggedIn ? "#111" : "#fff")};
  font-family: ${theme.fontFamily};
`;

let LogoImg = styled.img`
  height: 20px;
  margin: 0px 10px 0px 30px;
  margin-left: 0;
  display: flex;
  width: 20px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #28fd57;
`;

let LogoContainer = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: row;
  height: 100%;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 40px;
  }
`;

let Div = styled.div`
  justify-content: space-between;
  display: flex;
  padding: 0;

  flex-direction: row;
  border-radius: 0;
  margin-bottom: 0;
`;

function NavBar(props) {
  let { U } = useContext(Context);

  let loggedIn = U.getUserCookie();

  return (
    <Div>
      <Link key={1} to="/">
        <LogoContainer>
          <LogoImg src={logo} className="App-logo" alt="logo" />
          <LogoText> UPON.ONE</LogoText>
        </LogoContainer>
      </Link>
      <HeadRow>
        <HeadRowButton key={3} loggedIn={loggedIn}>
          <a target="_blank" href="https://discord.gg/s8ZysABauT">
            Hangout on Discord
          </a>
        </HeadRowButton>
        {!loggedIn ? (
          <Fragment>
            <HeadRowButton key={3} loggedIn={loggedIn}>
              <a onClick={U.login}>Login / Sign up</a>
            </HeadRowButton>
          </Fragment>
        ) : (
          <Fragment>
            <UserButton></UserButton>
          </Fragment>
        )}
      </HeadRow>
    </Div>
  );
}

export default NavBar;
