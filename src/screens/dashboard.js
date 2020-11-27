import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { useHistory } from "react-router-dom";

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
  display: flex;
  background-color: #00000000;
  background-size: contain;
  width: 40px;
  position: relative;
  background-repeat: no-repeat;
  background-image: url("${(props) => props.image}");

  &:after {
    display: ${(props) => (props.image ? "none" : "block")};
    font-size: 30px;
    content: "🌵";

    position: absolute;
    top: 0;
    left: 0;
  }
`;

function Dashboadrd(props) {
  let U = props.U;
  let history = useHistory();
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
        <Link to={"/dashboard/" + app.name}>
          <Button key={index}>
            <LogoImg image={U.getLogoLink(app.logo, app.name)} />
            <Span>{app.name}</Span>
          </Button>
        </Link>
      );
    });
  }

  function createApp() {
    let form;
    let submited = (event, data) => {
      console.log(data);
      history.push("/dashboard/" + data.name);
      form.kill();
    };

    form = U.ask([
      { h3: "What's its name?" },
      { input: { placeholder: "name", name: "name" } },
      { button: { innerHTML: "create", onclick: submited } },
    ]);
  }
  return (
    <div className="App">
      <Body>
        <br />
        <br />
        <br />
        <Button onClick={createApp} style={{ padding: "20px 50px" }}>
          + App
        </Button>
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
