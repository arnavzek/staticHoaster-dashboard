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
  display: flex;
  justify-content: flex-end;
  gap: 25px;
  align-items: center;
  flex-wrap: wrap;
`;

let Intro = styled.div`
  display: flex;
  justify-content: center;
  gap: 25px;
  margin: 50px 200px;
  color: #888;
  align-items: center;
  flex-wrap: wrap;
`;

let Button = styled.label`
  padding: 10px 25px;
  border: none;
  border-radius: 5px;
  color: #000;
  cursor: pointer;
  font-size: 13px;
  background: #fff;
  border: 0.1px solid #10101078;
  box-shadow: 1px 4px 13px #9999998a;
`;

const Input = styled.input`
  display: none;
`;

const Hr = styled.hr`
  border: none;
  height: 1px;
  margin: 0;
  background: #00000045;
`;
const Tabs = styled.div``;

const Tab = styled.button`
  position: relative;
  display: inline-block;
  padding: 16px 12px;
  text-decoration: none;
  border: none;
  font-size: 14px;
  font-weight: 400;
  transition: color 0.2s ease;
  outline: none;
  cursor: pointer;
  margin-bottom: -1px;
  border-bottom: 1px solid;
  background: transparent;

  border-bottom: ${(props) => {
    return props.currentTab == props.id ? "1px solid" : "none";
  }};

  color: ${(props) => {
    return props.currentTab == props.id ? "#000" : "#777";
  }};
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

let TopDiv = styled.div`
  flex-direction: row;
  display: flex;
  align-items: center;
  padding: 55px 0;
  padding-bottom: 25px;
  justify-content: space-between;
`;

function ManageApp(props) {
  let mainU = props.U;
  let { appName } = useParams();
  let [U, setU] = useState(null);
  let [currentTab, updateCurrentTab] = useState("overview");
  let [appData, updateAppData] = useState(null);
  let [indexStatus, setIndexStatus] = useState("loading");
  let [dialogData, setDialogData] = useState(null);
  useEffect(function () {
    let U = new global.uponJS({
      name: appName,
      local: false,
      disableGoogleAnalytics: true,
    });

    fetch(U.info.serverUrl).then((data) => {
      try {
        data
          .json()
          .then((data2) => {
            if (data2.error) setIndexStatus("not found");
          })
          .catch((e) => {
            setIndexStatus("uploaded");
          });
      } catch (e) {}
    });

    setU(U);
    mainU.query({ $searchApps: appName }).then(updateAppData);
  }, []);

  let mainButtons = [
    <Button key={1}>
      <Input
        multiple
        type="file"
        onChange={(event) => {
          if (event.target.files.length == 0) return;
          setDialogData({
            message: "🚀 Host",
            children: <UploadFiles U={U} event={event} type="homePage" />,
          });
        }}
      />
      📃 Upload Home Page
    </Button>,

    <Button key={2}>
      <input
        type="file"
        multiple
        directory=""
        webkitdirectory
        className="invisibleInput"
        webkitdirectory=""
        onChange={(event) => {
          if (event.target.files.length == 0) return;
          setDialogData({
            message: "🚀 Host",
            children: <UploadFiles U={U} event={event} type="BuildFolder" />,
          });
        }}
      />
      📁 Upload Build Folder
    </Button>,
  ];

  return (
    <div>
      <Overlay data={dialogData} setData={setDialogData}></Overlay>
      <TopDiv>
        {appData ? mainUI() : <LogoContainer>Loading..</LogoContainer>}

        {U ? (
          <Buttons>
            {mainButtons}
            <Button key={3}>
              <a href={U.info.serverUrl} target="_blank">
                🚪 Visit App
              </a>
            </Button>
          </Buttons>
        ) : (
          []
        )}
      </TopDiv>
      <Tabs>
        <Tab onClick={setTab} currentTab={currentTab} id={"overview"}>
          Overview
        </Tab>
        <Tab id={"databaseRules"} currentTab={currentTab} onClick={setTab}>
          Database Rules
        </Tab>
      </Tabs>
      <Hr />
      {getMainComponent()}
    </div>
  );

  function setTab(event) {
    updateCurrentTab(event.target.getAttribute("id"));
  }

  function getMainComponent() {
    switch (currentTab) {
      case "overview":
        if (indexStatus == "uploaded") return <Console U={U}></Console>;
        return (
          <div>
            {indexStatus == "not found" ? (
              <Intro>
                You can simply upload any HTML file by selecting the above
                "upload home page" button or if you are using react or vue use
                the "Upload Build Folder" Button
              </Intro>
            ) : (
              "loading..."
            )}
          </div>
        );
      case "databaseRules":
        return <DatabaseRules U={U}></DatabaseRules>;
    }
  }

  function mainUI() {
    if (!U) return "";
    if (appData.length < 1) return;
    let app = appData[0];
    let url = app.logo ? U.getSubAppUrl(app.name) + "/" + app.logo : "";
    return (
      <LogoContainer>
        <LogoImg image={url} />
        <LogoText>{U.caps(app.name)}</LogoText>
      </LogoContainer>
    );
  }
}

export default ManageApp;
