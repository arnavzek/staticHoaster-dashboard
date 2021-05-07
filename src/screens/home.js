import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import ReactOverlay from "../lib/reactOverlay";
import Context from "../Context";
import initializeUploader from "../components/FileUploader";
import ProjectsArea from "../components/ProjectsArea";
import WhyUs from "../components/WhyUs";
import Examples from "../components/Examples";

let Button = styled.button`
  cursor: pointer;
  border-radius: 0;
  background: transparent;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  opacity: 0.9;
  width: 20vw;
  text-align: center;
  border: none;
  color: #28fd57;
  outline: none;
  font-size: 15px;
  padding: 20px 34px;
  border-right: ${({ primary }) => (primary ? `2px solid #ffffff63` : "")};
  @media (max-width: 800px) {
    width: 100%;
    border-right: none;
    border-bottom: ${({ primary }) => (primary ? `2px solid #ffffff63` : "")};
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
  font-size: 40px;
  font-weight: 100;
  opacity: 0.5;
  font-family: Sacramento;
  @media (max-width: 800px) {
    font-size: 7vw;
  }
`;

let Underlight = styled.div`
  opacity: 0.5;
  margin-left: 10px;
  font-size: 13px;
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
  padding: 0;
  gap: 0;
  border: 2px solid #ffffff63;
  box-shadow: 0px 20px 20px 20px #11111178;
  border-radius: 25px;
  margin-bottom: 100px;
  @media (min-width: 800px) {
    flex-direction: row;
    width: auto;
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
        <Heading>publish static sites easily</Heading>
        <Options>
          <Button onClick={hostingFuntion.homepage} primary={true}>
            + File <Underlight>( html )</Underlight>
          </Button>
          <Button onClick={hostingFuntion.folder}>
            + Project Folder <Underlight>(having index.html)</Underlight>
          </Button>
        </Options>
      </Center>
      <WhyUs />
      <Examples />
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
