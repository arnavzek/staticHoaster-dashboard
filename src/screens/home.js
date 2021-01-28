import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import ReactOverlay from "../lib/reactOverlay";
import Context from "../Context";
import initializeUploader from "../components/FileUploader";
import ProjectsArea from "../components/ProjectsArea";
let PrimaryButon = styled.button`
  cursor: pointer;
  border-radius: 200px;
  background: linear-gradient(45deg, #ffeb3b, #28fd57);
  border: none;
  font-size: 15px;
  padding: 15px 34px;
`;

let Button = styled.button`
  cursor: pointer;
  border-radius: 200px;
  background: transparent;
  border: 1px solid;
  color: #28fd57;
  font-size: 15px;
  padding: 15px 34px;
`;

let Body = styled.div``;

let Center = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 58vh;
`;

let Span = styled.span`
  color: #999;
`;

let Heading = styled.h1`
  font-size: 64px;
  font-weight: 100;
`;

let Options = styled.div`
  display: flex;
  flex-direction: row;
  gap: 25px;
  justify-content: center;
  align-items: center;
`;

function Dashboadrd() {
  let { U, Upon } = useContext(Context);
  let [dialogData, setDialogData] = useState(null);
  const [apps, updateApps] = useState(null);

  let hostingFuntion = {
    homepage: () => {
      host("homePage");
    },
    folder: () => {
      host("buildFolder");
    },
  };

  useEffect(refresh, []);

  return (
    <Body>
      <ReactOverlay data={dialogData} setData={setDialogData}></ReactOverlay>
      <Center>
        <Heading>Hosting made easy</Heading>
        <Options>
          <PrimaryButon onClick={hostingFuntion.homepage} primary="true">
            Host homepage (HTML file)
          </PrimaryButon>
          <Span>OR</Span>
          <Button onClick={hostingFuntion.folder}>Host project folder</Button>
        </Options>
      </Center>

      <ProjectsArea apps={apps} host={host} />
    </Body>
  );

  function refresh() {
    U.getLoggedInUser().then((data) => {
      if (!data) return;
      U.api.get("apps/?owner=" + data.id).then(updateApps);
    });
  }

  function host(type, appName) {
    if (!U.getUserCookie()) return U.login();

    initializeUploader({ setDialogData, Upon, type, appName, U });
  }
}

export default Dashboadrd;
