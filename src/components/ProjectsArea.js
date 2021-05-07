import React, { useContext, useState, useEffect } from "react";
import Context from "../Context";
import Styled from "styled-components";
import Overlay from "../lib/overlay";
import ProjectLogo from "./ProjectLogo.js";

let Button = Styled.button`
    border-radius: 500px;
    border: none;
    cursor:pointer;
    padding: 5px 20px;
    background:#222;
    color:#fff;

    :hover{
      background:#fff;
      color:#111;
    }
`;

let Div = Styled.div`

`;

let AppName = Styled.div`
  justify-content:center;
  align-items:center;
  font-weight:900;
  cursor:pointer;
  font-size:24px;
  :hover{
    text-decoration: underline;
  }
`;

let Buttons = Styled.div`
  flex-direction:row;
  margin-top:12px;
  gap:10px;
  display:flex;
  cursor:pointer;
`;

let H1 = Styled.h1`
    font-weight: 100;
    color: #999;
    @media (max-width:800px){
      margin:0;
    }
`;

let Header = Styled.div`
  display:flex;
  flex:1;
  flex-direction:row;
  justify-content:space-between;
  @media (max-width:800px){
    margin:0;
    flex-direction:column;
  }
`;

let Data = Styled.div`
  display:flex;
  flex-direction:row;
  opacity:0.5;
  gap:15px;
  align-items:center;

  @media (max-width:800px){
      margin-top:10px;
      margin-bottom:50px;
  }
`;

let Span = Styled.div`
  @media (max-width:800px){
    font-size:10px;
  }
`;

let Content = Styled.div`
  flex-direction:row;
  flex-wrap: wrap;
  display:flex;

  grid-column-gap: 6.5%;
  grid-row-gap: 6.5%;

  @media (max-width: 800px) {
    gap: 0%;
    }
  
  @media (max-width: 1500px) {
    grid-column-gap: 19%;
    grid-row-gap: 19%;
    }
`;

let ProjectContainer = Styled.div`
    background: #ffffff0d;
    border: none;
    padding: 15px;
    width: 18%;
    flex-direction: row;
    display: flex;
    border-radius: 20px;
    margin-bottom: 50px;
    color: #fff;

    @media (max-width: 800px) {
      width: 100% !important;
    }

    @media (max-width: 1500px) {
      width: 36%;
    }



`;

let Interactable = Styled.div`
  margin-left:25px;
`;

function convertBytesToMB(bytes) {
  return Math.round((bytes / (1000 * 1024)) * 100) / 100;
}

function ProjectsArea({ apps, host, refresh }) {
  let { U, Upon } = useContext(Context);
  useEffect(() => {
    if (U.getUserCookie()) {
      U.api.get("bandwidth-usage").then(setBandwidthUsed);
      U.api.get("storage-usage").then(setSpaceUsed);
    }
  }, []);

  let [spaceUsed, setSpaceUsed] = useState(0);
  let [bandWidthUsed, setBandwidthUsed] = useState(0);

  if (!apps) return [];
  if (!apps.length) return [];
  if (!U.getUserCookie()) return [];

  return (
    <Div>
      <Header>
        <H1>Projects</H1>
        <Data>
          <Span>Space Used {convertBytesToMB(spaceUsed)}/100MB</Span>
          <Span>Bandwidth Used {convertBytesToMB(bandWidthUsed)}/200MB</Span>
        </Data>
      </Header>

      <Content>{filterProjects()}</Content>
    </Div>
  );

  function filterProjects() {
    if (!apps) return apps;
    let appsRender = [];
    console.log(apps);
    apps.map((app, index) => {
      function hostProject() {
        let elements = [
          { h3: app.emojiIcon + " " + U.caps(app.appName) },
          { button: { innerHTML: "Upload Folder", onclick: uploadFolder } },
          { button: { innerHTML: "Upload Files", onclick: uploadFiles } },
          {
            button: { innerHTML: "Upload Home Page", onclick: uploadHomePage },
          },
        ];

        function uploadFolder() {
          Overlay.kill("form");
          host("buildFolder", app.appName);
        }

        function uploadHomePage() {
          Overlay.kill("form");
          host("homePage", app.appName);
        }

        function uploadFiles() {
          Overlay.kill("form");
          host("files", app.appName);
        }

        Overlay.form(elements);
      }

      function gotoApp() {
        window.open(U.getAppUrl(app.appName));
      }

      function changeName() {
        let elements = [
          { h3: "Change Name" },
          { input: { placeholder: "New Name", name: "newName" } },
          { button: { innerHTML: "submit", onclick: makeRequest } },
        ];

        Overlay.form(elements);

        function makeRequest(event, data) {
          Overlay.loading();
          U.api
            .post("change-app-name", {
              appName: app.appName,
              newAppName: data.newName,
            })
            .then(() => {
              Overlay.kill("form");
              refresh();
              Overlay.alert("App Name changed");
            })
            .catch((e) => {
              Overlay.alert(e.message);
            });
        }
      }

      function deleteApp() {
        Overlay.loading();

        let newU = new Upon({
          name: app.appName,
          local: U.configuration.local,
          disableGoogleAnalytics: true,
        });

        newU.api
          .post("delete-app")
          .then((data) => {
            Overlay.kill("form");
            Overlay.alert("Deleted " + data.filesDeleted + " files");
            refresh();
          })
          .catch((e) => {
            Overlay.alert(e.message);
          });
      }

      function openOptions() {
        let elements = [
          { h3: "Setting" },

          { button: { innerHTML: "Visit", onclick: gotoApp } },
          { button: { innerHTML: "Delete App", onclick: deleteApp } },
          { button: { innerHTML: "Change Name", onclick: changeName } },
        ];

        Overlay.form(elements);
      }

      appsRender.push(
        <ProjectContainer key={index}>
          <ProjectLogo emojiIcon={app.emojiIcon} image={app.logo} />
          <Interactable>
            <AppName onClick={gotoApp}>{U.caps(app.appName)}</AppName>
            <Buttons>
              <Button onClick={hostProject}>Host</Button>
              <Button onClick={openOptions}>⚙️</Button>
            </Buttons>
          </Interactable>
        </ProjectContainer>
      );
    });

    return appsRender;
  }
}

export default ProjectsArea;
