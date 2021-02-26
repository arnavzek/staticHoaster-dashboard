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
  width: 200px;
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
  padding: 15px;

  @media (max-width: 800px) {
    display: none;
  }
`;

let LogoText = styled.h3`
  display: flex;
  font-size: 35px;
  margin: 0px;
  font-weight: 100;

  color: ${(props) => (props.loggedIn ? "#111" : "#fff")};
  font-family: Bebas Neue;
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
      <MobileOptions onClick={moreOptions}>
        <HiMenu size={"40px"} />{" "}
      </MobileOptions>

      <Link key={1} to="/">
        <LogoContainer>
          <LogoImg src={logo} className="App-logo" alt="logo" />
          <LogoText> UPON.ONE</LogoText>
        </LogoContainer>
      </Link>

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
