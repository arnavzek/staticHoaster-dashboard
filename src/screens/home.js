import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import ReactOverlay from "../lib/reactOverlay";
import Context from "../Context";
import initializeUploader from "../components/FileUploader";
import ProjectsArea from "../components/ProjectsArea";
import WhyUs from "../components/WhyUs";
let PrimaryButon = styled.button`
  cursor: pointer;
  border-radius: 200px;
  background: linear-gradient(45deg, #ffeb3b, #28fd57);
  border: none;
  font-size: 15px;
  width: 45%;

  text-align: center;
  padding: 15px 34px;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

let Button = styled.button`
  cursor: pointer;
  border-radius: 200px;
  background: transparent;
  opacity: 0.9;
  width: 45%;
  text-align: center;
  border: 1px solid;
  color: #28fd57;
  font-size: 15px;
  padding: 15px 34px;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

let Body = styled.div``;

let Center = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

let Heading = styled.h1`
  font-size: 34px;
  font-weight: 100;
  opacity: 0.5;
  font-family: Sacramento;
  @media (max-width: 800px) {
    font-size: 8vw;
  }
`;

let Options = styled.div`
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  background: rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  padding: 40px;
  gap: 40px;
  border: 2px solid #ffffff63;
  box-shadow: 0px 20px 20px 20px #111111ba;
  border-radius: 25px;
  margin-bottom: 100px;
  @media (min-width: 800px) {
    flex-direction: row;

    width: 28%;
  }
`;

function Dashboadrd() {
  let { U, Upon } = useContext(Context);
  let [dialogData, setDialogData] = useState(null);
  const [apps, updateApps] = useState(null);

  let hostingFuntion = {
    homepage: () => {
      host("homePage").then(refresh);
    },
    folder: () => {
      host("buildFolder").then(refresh);
    },
  };

  useEffect(refresh, []);

  return (
    <Body>
      <ReactOverlay data={dialogData} setData={setDialogData}></ReactOverlay>
      <Center>
        <Heading>Web Dev Platform</Heading>
        <Options>
          <PrimaryButon onClick={hostingFuntion.homepage} primary="true">
            Design
          </PrimaryButon>
          <Button onClick={hostingFuntion.folder}>Host HTML file</Button>
          <Button onClick={hostingFuntion.folder}>Host Static Site</Button>
          <Button onClick={hostingFuntion.folder}>Build Database</Button>
        </Options>
      </Center>
      <WhyUs />
      <ProjectsArea refresh={refresh} apps={apps} host={host} />
    </Body>
  );

  function refresh() {
    U.getLoggedInUser().then((data) => {
      if (!data) return;
      U.api.get("apps/?owner=" + data.id).then(updateApps);
    });
  }

  async function host(type, appName) {
    if (!U.getUserCookie()) return U.login();

    await initializeUploader({ setDialogData, Upon, type, appName, U });
  }
}

export default Dashboadrd;
