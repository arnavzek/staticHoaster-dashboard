import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Overlay from "../components/overlay";
import UploadFiles from "../components/uploadFiles";
import Console from "../components/console";
import DatabaseRules from "../components/databaseRules";
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
  flex-wrap: wrap;
`;

let Button = styled.a`
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background: #fff;
  box-shadow: 1px 4px 13px #9999997a;
`;

const Input = styled.input`
  display: none;
`;

const Tabs = styled.div``;
const Tab = styled.button``;

let Label = styled.label`
  text-decoration: none;
  font-size: 14px;
  transition: all 0.25s ease-in 0s;
  width: auto;
  margin: 0px;
  background: rgb(0, 0, 0);
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 12px 20px;
  cursor: pointer;
  border: none;

  border-radius: 400px;
  color: rgb(255, 255, 255) !important;
  font-weight: 100 !important;
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
  let [currentTab, updateCurrentTab] = useState("console");
  let [appData, updateAppData] = useState(null);

  let [dialogData, setDialogData] = useState(null);
  useEffect(function () {
    let U = new global.uponJS({
      name: appName,
      local: false,
    });
    setU(U);
    mainU.query({ $searchApps: appName }).then(updateAppData);
  }, []);

  return (
    <div>
      <Overlay data={dialogData} setData={setDialogData}></Overlay>
      {appData ? mainUI() : <h1>Loading..</h1>}

      {U ? (
        <Buttons>
          <Label>
            <Input
              multiple
              type="file"
              onChange={(event) => {
                setDialogData({
                  message: "Host",
                  children: <UploadFiles U={U} event={event} type="homePage" />,
                });
              }}
            />
            + Files
          </Label>

          <Label>
            <Input
              multiple
              type="file"
              webkitdirectory
              onChange={(event) => {
                setDialogData({
                  message: "Host",
                  children: (
                    <UploadFiles U={U} event={event} type="BuildFolder" />
                  ),
                });
              }}
            />
            Upload Build Folder
          </Label>

          <Button href={U.info.serverUrl} target="_blank">
            🚪 Visit App
          </Button>
        </Buttons>
      ) : (
        []
      )}

      <Tabs>
        <Tab
          onClick={() => {
            updateCurrentTab("console");
          }}
        >
          Console
        </Tab>
        <Tab
          onClick={() => {
            updateCurrentTab("database rules");
          }}
        >
          Database Rules
        </Tab>
      </Tabs>
      <hr />
      {getMainComponent()}
    </div>
  );

  let promptUploadHostFiles = () => {
    U.ask([
      { h3: "🚀 Upload Files" },
      {
        p: `<upload-host-files appName="${U.configuration.name}"> </upload-host-files>`,
      },
    ]);
  };

  let openBackendEditor = () => {
    let loading = U.loading();
    return U.query({ $giveBackendConfig: "" }).then((data) => {
      if (!data) data = { backendCode: "" };
      loading.kill();
      U.configuration.backendCode = data.backendCode;
      U.ask([
        { h3: "Backend Editor" },
        {
          p: `<backend-editor appName="${U.configuration.name}"> </upload-host-files>`,
        },
      ]);
    });
  };

  let host = async () => {
    if (!localStorage.getItem("developer-cookie-localstorage")) {
      return U.login("developer").then(() => {
        promptUploadHostFiles();
      });
    } else {
      promptUploadHostFiles();
    }
  };

  let openAdminPanel = () => {
    if (!localStorage.getItem("developer-cookie-localstorage"))
      return U.login("developer").then(U.openAdminPanel);

    return U.ask([
      { h3: " ⚙️ Settings" },
      {
        p: `<admin-pannel appName="${U.configuration.name}"> </admin-pannel>`,
      },
    ]); //dont't create it, just add it to dom
  };

  function getMainComponent() {
    switch (currentTab) {
      case "console":
        return <Console></Console>;
      case "database rules":
        return <DatabaseRules></DatabaseRules>;
    }
  }

  function mainUI() {
    if (!U) return "";
    if (appData.length < 1) return;
    let app = appData[0];
    let url = U.getLogoLink(app.logo, app.name);
    return (
      <LogoContainer>
        <LogoImg image={url} />
        <LogoText>{app.name}</LogoText>
      </LogoContainer>
    );
  }
}

export default ManageApp;
