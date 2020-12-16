import React, { useState, useEffect } from "react";

import styled from "styled-components";
import theme from "../theme.js";
import loadingSVG from "../media/loading.svg";
let Div = styled.div``;

let Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 25px;
`;

let Button = styled.a`
  padding: 10px 15px;
  border: none;
  margin: 0;
  border-radius: 5px;
  cursor: pointer;
  background: #222;
  color: #fff;
`;

let FileDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
  align-items: center;
`;

let LoadingIcon = styled.img`
  height: 35px;
`;

let FileName = styled.span`
  font-size: 18px;
`;

let Status = styled.div``;

function UploadFiles(props) {
  let [files, setFiles] = useState({});
  let U = props.U;

  useEffect(function () {
    if (props.type == "homePage") {
      uploadIndexFile(props.event);
    } else {
      uploadMainDirectory(props.event);
    }
  }, []);

  async function uploadHostFiles(file, fileName) {
    return await U.utility.upload(file, "hostingUpload", fileName); //upload and get the new link, newAttributes.href so that it can be overridden
  }

  function returnItems() {
    let toReturn = [];

    for (let fileName in files) {
      let item = files[fileName];
      toReturn.push(
        <FileDiv key={fileName}>
          <FileName>{fileName}</FileName>
          <Status>
            {item.uploadStatus ? "✓" : <LoadingIcon src={loadingSVG} />}
          </Status>
        </FileDiv>
      );
    }

    return toReturn;
  }

  function renderAndUpload(filesFromSelector, namingFunction) {
    function setFilesState(data) {
      files = data;
      setFiles(data);
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
        let newObject = {
          ...files,
          [fileName]: { file: file, uploadStatus: true },
        };
        setFilesState(newObject);
      });
    }
  }

  function uploadIndexFile(event) {
    let files = event.target.files;

    renderAndUpload(files, () => {
      return "index.html";
    });
  }

  function uploadMainDirectory(event) {
    let files = event.target.files;

    function changeRelativePath(file) {
      console.log(file);
      let path = file.webkitRelativePath;
      let dirSplit = path.split("/");
      dirSplit.shift();
      return dirSplit.join("/");
    }

    renderAndUpload(files, changeRelativePath);
  }

  return (
    <Div>
      {returnItems()}
      <Buttons>
        <Button href={U.info.serverUrl} target="_blank">
          Visit App
        </Button>
      </Buttons>
    </Div>
  );
}

export default UploadFiles;
