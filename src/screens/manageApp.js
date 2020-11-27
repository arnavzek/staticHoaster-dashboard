import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import styled from "styled-components";

let Body = styled.div`
  padding: 55px;
`;

let LogoContainer = styled.div`
  padding: 55px 0;
  display: flex;
  /* justify-content: center; */
  align-items: center;
`;

let LogoText = styled.div`
  font-size: 40px;
  margin-left: 15px;

  font-weight: 900;
`;

let Buttons = styled.div`
  padding: 25px 0;
  display: flex;
  gap: 25px;
`;

let Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background: #fff;
  box-shadow: 1px 4px 13px #9999997a;
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
    font-size: 35px;
    content: "🌵";

    position: absolute;
    top: 0;
    left: 0;
  }
`;

function ManageApp(props) {
  let mainU = props.U;
  let { appName } = useParams();
  let [U, setU] = useState(null);

  let [appData, updateAppData] = useState(null);

  useEffect(function () {
    let U = new global.uponJS({
      name: appName,
      disableOverLayButton: true,
      local: true,
    });
    setU(U);
    mainU.query({ $searchApps: appName }).then(updateAppData);
  }, []);

  function mainUI() {
    if (!U) return "";
    if (appData.length < 1) return;
    let app = appData[0];
    let url = U.getLogoLink(app.logo, app.name);
    return (
      <div>
        <LogoContainer>
          <LogoImg image={url} />
          <LogoText>{app.name}</LogoText>
        </LogoContainer>
      </div>
    );
  }
  return (
    <div>
      {appData ? mainUI() : <h1>Loading..</h1>}

      {U ? (
        <Buttons>
          <Button onClick={U.host}>🐣 Publish</Button>
          <Button onClick={U.openBackendEditor}>🧊 Edit Backend</Button>
        </Buttons>
      ) : (
        []
      )}
    </div>
  );
}

export default ManageApp;
