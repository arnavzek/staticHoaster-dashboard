import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/navBar";

import styled, { css } from "styled-components";

let Body = styled.div`
  padding: 55px;
`;

let LogoContainer = styled.div`
  padding: 55px;
`;

let LogoText = styled.div`
  padding: 55px;
`;

let Buttons = styled.div`
  padding: 55px;
`;

let Button = styled.button`
  padding: 55px;
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

function ManageApp(props) {
  let { appName } = useParams();
  let [U] = useState(new global.uponJS(props.appName, true));

  let [appData, updateAppData] = useState(null);

  useEffect(function () {
    U.query({ $searchApps: appName }).then(updateAppData);
  }, []);

  function mainUI() {
    if (appData.length < 1) return;
    let app = appData[0];
    let url = U.getLogoLink(app.logo, app.name);
    return (
      <div>
        <LogoContainer>
          <LogoImg image={url} /> <LogoText>{app.name}</LogoText>
        </LogoContainer>
        <Buttons>
          <Button onClick={U.host}>🐣 Publish</Button>
          <Button onClick={U.openBackendEditor}>🧊 Edit Backend</Button>
        </Buttons>
      </div>
    );
  }
  return (
    <Body>
      <NavBar showIcon={true} />
      {appData ? mainUI() : <h1>Loading..</h1>}
    </Body>
  );
}

export default ManageApp;
