import React, { useState, useEffect } from "react";

import styled from "styled-components";

let Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

let Percentage = styled.h3``;

let A = styled.a`
  padding: 10px 30px;
  border: none;
  margin: 0;
  border-radius: 5px;
  cursor: pointer;
  border-radius: 500px;
  background: #222;
  color: #fff;
`;

function FileUploader({ U, filesFromSelector, type }) {
  let [files, setFiles] = useState({});
  let [errorMessage, setErrorMessage] = useState(null);
  useEffect(function () {
    if (type == "homePage") {
      uploadIndexFile();
    } else if (type == "files") {
      uploadFiles();
    } else if (type == "buildFolder") {
      uploadMainDirectory();
    } else {
      throw Error("Invalid Type " + type);
    }
  }, []);

  async function uploadHostFiles(file, fileName) {
    try {
      return await U.utility.upload(file, "hostingUpload", fileName);
    } catch (e) {
      setErrorMessage(e.message);
    }
  }

  function analyze() {
    let totalFiles = Object.values(files).length;
    let filesUploaded = 0;

    for (let fileName in files) {
      let item = files[fileName];
      if (item.uploadStatus) filesUploaded++;
    }

    console.log(totalFiles, filesUploaded);
    return { totalFiles, filesUploaded };
  }

  function renderAndUpload(namingFunction) {
    function setFilesState(data) {
      files = data;
      setFiles({ ...data });
    }

    let firstPayload = {};
    for (let file of filesFromSelector) {
      let fileName = namingFunction(file);
      firstPayload[fileName] = { file: file, uploadStatus: false };
    }

    setFilesState(firstPayload);

    for (let file of filesFromSelector) {
      let fileName = namingFunction(file);
      uploadHostFiles(file, fileName).then(() => {
        console.log("file uploaded");
        let newObject = {
          ...files,
          [fileName]: { file: file, uploadStatus: true },
        };
        setFilesState(newObject);
      });
    }
  }

  function uploadIndexFile() {
    renderAndUpload(() => {
      return "index.html";
    });
  }

  function uploadMainDirectory() {
    function changeRelativePath(file) {
      let path = file.webkitRelativePath;
      let dirSplit = path.split("/");
      dirSplit.shift();
      return dirSplit.join("/");
    }

    renderAndUpload(changeRelativePath);
  }

  function uploadFiles() {
    function giveName(file) {
      return file.name;
    }

    renderAndUpload(giveName);
  }

  let { totalFiles, filesUploaded } = analyze();
  if (totalFiles == 0) return [];
  if (errorMessage) return <Div>{errorMessage}</Div>;
  return (
    <Div>
      {totalFiles == filesUploaded ? (
        <A href={U.info.serverUrl} target="_blank">
          Visit Site
        </A>
      ) : (
        <Percentage>
          {Math.round((filesUploaded / totalFiles) * 100) + "%"}
        </Percentage>
      )}
    </Div>
  );
}

function initializeUploader({ setDialogData, Upon, type, appName, U }) {
  let fileInput = document.createElement("input");
  fileInput.setAttribute("type", "file");
  fileInput.addEventListener("change", doUpload);
  fileInput.setAttribute("multiple", true);
  if (type == "buildFolder") fileInput.setAttribute("webkitdirectory", true);

  fileInput.click();

  function doUpload(event) {
    let filesFromSelector = event.target.files;

    if (!appName) return createApp().then(engageUpload);
    engageUpload(appName);
    function engageUpload(appName) {
      let newU = new Upon({
        name: appName,
        local: true,
        disableGoogleAnalytics: true,
      });

      setDialogData({
        message: "🚀 Host",
        children: (
          <FileUploader
            filesFromSelector={filesFromSelector}
            U={newU}
            type={type}
          />
        ),
      });
    }
  }

  function createApp() {
    return new Promise((resolve) => {
      U.api
        .post("app")
        .then((data) => {
          resolve(data.appName);
        })
        .catch(console.error);
    });
  }
}

export default initializeUploader;
