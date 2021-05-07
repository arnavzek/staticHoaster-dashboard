import React, { useState, useEffect, useContext, Fragment } from "react";
import logo from "../media/logo.svg";
import styled from "styled-components";
import theme from "../theme.js";
import { Link } from "react-router-dom";
import Context from "../Context";
import UserButton from "./UserButton";
import { HiMenu } from "react-icons/hi";
import overlay from "../lib/overlay";

let MobileOptions = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  opacity: 0.8;
  justify-content: flex-start;
`;

let HeadRowButton = styled.button`
  border: none;
  background: #00000069;
  width: 200px;
  text-decoration: none;
  font-weight: 300;
  cursor: pointer;
  color: #fff;
  font-size: 15px;
  border-radius: 5px;
  font-family: roboto;
  padding: 10px;

  @media (max-width: 800px) {
    display: none;
  }
`;

let Row = styled.div`
  display: flex;
  flex-direction: row;
  grid-column-gap: 25px;
  justify-content: flex-end;
  background-color: transparent;
`;

let LogoText = styled.h3`
  display: flex;
  font-size: 25px;
  margin: 0px;
  font-weight: 100;

  color: ${(props) => (props.loggedIn ? "#111" : "#fff")};
  font-family: Bebas Neue;
`;

let LogoImg = styled.img`
  height: 13px;
  margin: 0px 10px 0px 30px;
  margin-left: 0;
  display: flex;
  width: 13px;
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
`;

let Div = styled.div`
  justify-content: space-between;
  display: flex;
  padding: 0;
  margin-top: 15px;
  flex-direction: row;
  border-radius: 0;
  margin-bottom: 100px;
`;

function NavBar() {
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

      <Row>
        {!loggedIn ? (
          <Fragment>
            <HeadRowButton key={3} loggedIn={loggedIn}>
              <a onClick={U.login}>Register / Login</a>
            </HeadRowButton>
          </Fragment>
        ) : (
          <Fragment>
            <UserButton showUserOptions={showUserOptions}></UserButton>
          </Fragment>
        )}

        <MobileOptions onClick={moreOptions}>
          <HiMenu size={"30px"} />{" "}
        </MobileOptions>
      </Row>
    </Div>
  );

  function redirectAudience() {
    window.location = "https://arnav.upon.one";
  }

  function showUserOptions() {
    let elements = [
      { h3: "Options" },
      { button: { innerHTML: "About Developer", onclick: redirectAudience } },
      {
        button: {
          innerHTML: "Change Profile Picture",
          onclick: U.changeProfilePicture,
        },
      },
      {
        button: {
          innerHTML: "Logout",
          onclick: U.logout,
        },
      },
    ];

    overlay.form(elements);
  }

  function openDiscord() {
    window.open("https://discord.gg/s8ZysABauT");
  }

  function moreOptions() {
    let elements = [
      { h3: "Options" },
      { button: { innerHTML: "Open Discord", onclick: openDiscord } },
    ];

    if (!loggedIn) {
      elements.push({
        button: { innerHTML: "Login / Sign up", onclick: U.login },
      });
    } else {
      elements.push({
        button: { innerHTML: "More", onclick: showUserOptions },
      });
    }

    overlay.form(elements);
  }
}

export default NavBar;
