import React, { useState, useEffect } from "react";

import styled from "styled-components";
import theme from "../theme.js";
import loadingSVG from "../media/loading.svg";
let Div = styled.div``;

let Buttons = styled.div``;

let Button = styled.button``;

let FileDiv = styled.div``;

let FileName = styled.span``;

let Status = styled.button``;

function UploadFiles(props) {
  const [files, setFiles] = useState({});
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
    console.log(files);
    for (let fileName in files) {
      let item = files[fileName];
      toReturn.push(
        <FileDiv key={fileName}>
          <FileName>{fileName}</FileName>
          <Status>{item.uploadStatus ? "✓" : <img src={loadingSVG} />}</Status>
        </FileDiv>
      );
    }

    return toReturn;
  }

  function renderAndUpload(file, fileName) {
    if (!fileName) fileName = file.name;

    setFiles({
      ...files,
      [fileName]: { file: file, uploadStatus: false },
    });

    uploadHostFiles(file, fileName).then(() => {
      setFiles({
        ...files,
        [fileName]: { file: file, uploadStatus: true },
      });
    });
  }

  function upload(event, fileName) {
    let files = event.target.files;

    for (let file of files) {
      renderAndUpload(file, fileName);
    }
  }

  function uploadIndexFile(event) {
    upload(event, "index.html");
  }

  function uploadMainDirectory(event) {
    let files = event.target.files;

    function changeRelativePath(path) {
      let dirSplit = path.split("/");
      dirSplit.shift();
      return dirSplit.join("/");
    }

    for (let i = 0; i < files.length; i++) {
      renderAndUpload(
        files[i],
        changeRelativePath(files[i].webkitRelativePath)
      );
    }
  }

  return (
    <Div>
      {returnItems()}
      <Buttons>
        <Button> Visit App </Button>
      </Buttons>
    </Div>
  );
}

export default UploadFiles;
