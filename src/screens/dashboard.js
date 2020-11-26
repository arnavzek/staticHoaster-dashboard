import React, { useState, useEffect } from "react";
import NavBar from "../components/navBar";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

let Button = styled.button`
  border: 1px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  padding: 10px 25px;
  cursor: pointer;
  display: flex;
`;

let AppCollection = styled.div`
  margin: 50px 0;
  display: flex;
  gap: 20px;
  flex-direction: row;
  flex-wrap: wrap;
`;

let Body = styled.div`
  padding: 55px;
`;

let Span = styled.span`
  border: 1px;
  padding: 10px 25px;
`;

let LogoImg = styled.div`
  height: 40px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  background-color: #00000000;
  background-size: cover;
  width: 40px;
  background-repeat: no-repeat;

  background-image: url("${(props) => props.image}");
`;

function Dashboadrd(props) {
  let U = props.U;

  const [user, setUser] = useState(null);
  const [apps, updateApps] = useState(null);

  useEffect(function () {
    U.readUser("developer").then((data) => {
      if (!data) return window.U.login("developer");
      setUser(data);
      U.query({ $searchApps: { owner: data.id } }).then(updateApps);
    });
  }, []);

  let appsRender = [];

  if (apps) {
    apps.map((app, index) => {
      appsRender.push(
        <Button key={index}>
          <Link to={"/dashboard/" + app.name}>
            <LogoImg image={U.getLogoLink(app.logo, app.name)} />
            <Span>{app.name}</Span>
          </Link>
        </Button>
      );
    });
  }

  return (
    <div className="App">
      <Body>
        <NavBar showIcon={true} />
        <br />
        <br />
        <br />
        <Button style={{ padding: "20px 50px" }}>+ App</Button>
        <br />
        <br />
        <br />
        {appsRender ? (
          <AppCollection>{appsRender}</AppCollection>
        ) : (
          <h1>Loading...</h1>
        )}
      </Body>
    </div>
  );
}

export default Dashboadrd;
