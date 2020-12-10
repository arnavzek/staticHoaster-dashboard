import React, { useState, useEffect } from "react";
import imageCompression from "browser-image-compression";
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

let DashboardOptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 25px;
`;

let DashboardOption = styled.button`
  border: 1px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  padding: 10px 25px;
  cursor: pointer;
  display: flex;
  font-size: 18px;
  padding: 13px 40px;
  background: #fff;
  box-shadow: 1px 1px 19px #99999991;
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

  let compressImage = async (file, options) => {
    if (!options)
      options = {
        maxSizeMB: 0.5,
        useWebWorker: true,
        fileType: "jpeg",
      };

    let newFIle = await imageCompression(file, options);
    return newFIle;
  };

  let changeProfilePicture = async (type) => {
    return new Promise((resolve) => {
      if (!type) type = "user";

      let inputFileElement = document.createElement("input");
      inputFileElement.setAttribute("type", "file");
      inputFileElement.addEventListener("change", setProfilePicture);
      let prompt;

      function giveImage(user) {
        return `<img style="      
          background: #000000;
          border-radius: 20px;
          height: 150px;
          width: 150px;
          margin-top:30px;
          object-fit: cover;
          padding: 10px;" src="${U.profilePictureLink(user.id)}">`;
      }

      prompt = U.ask([
        {
          h3: "Change Profile Picture",
          p: {
            id: "imageContainer",
            innerHTML: U.loadingSVG,
            style: "display:flex; justify-content:center; align-items:center;",
          },
        },
        { button: { innerHTML: "Change", onclick: chooseProfilePicture } },
        {
          button: {
            innerHTML: "✓",
            onclick: () => {
              prompt.kill();
              resolve();
            },
          },
        },
      ]);

      U.query("$" + type).then((user) => {
        if (!user) return U.ask([{ h1: "You need to login First" }]);
        prompt.dom.querySelector("#imageContainer").innerHTML = giveImage(user);
      });

      async function setProfilePicture(event) {
        let loading = U.loading("Uploading Profile");
        let file = event.target.files[0];
        let options = {
          maxSizeMB: 1, // (default: Number.POSITIVE_INFINITY)
          maxWidthOrHeight: 200, // compressedFile will scale down by ratio to a point that width or height is smaller than maxWidthOrHeight (default: undefined)
          //  onProgress: Function,       // optional, a function takes one progress argument (percentage from 0 to 100)
          useWebWorker: true, // optional, use multi-thread web worker, fallback to run in main-thread (default: true)

          // following options are for advanced user
          // maxIteration: number,       // optional, max number of iteration to compress the image (default: 10)
          // exifOrientation: number,    // optional, see https://stackoverflow.com/a/32490603/10395024
          fileType: "jpg", // optional, fileType override
          // initialQuality: number      // optional, initial quality value between 0 and 1 (default: 1)
        };

        let newFile = await compressImage(file, options);
        await U.utility.upload(newFile, "profilePicture", null, {
          profilePictureOf: type,
        });
        loading.kill();
        U.changeProfilePicture(type).then(resolve);
      }

      function chooseProfilePicture() {
        inputFileElement.click();
      }
    });
  };

  function createApp() {
    let form;
    let submited = (event, data) => {
      let loading = U.loading("Creating " + data.name);
      U.query({ $createApp: data.name }).then(() => {
        console.log(data);
        loading.kill();
        history.push("/dashboard/" + data.name);
        form.kill();
      });
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
        <DashboardOptionContainer>
          <DashboardOption onClick={createApp}> 👩‍🍳 Create App</DashboardOption>
          {/* <DashboardOption onClick={changeProfilePicture}>
            Change Profile Picture
          </DashboardOption> */}
        </DashboardOptionContainer>
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
