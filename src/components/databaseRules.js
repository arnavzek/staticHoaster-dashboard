import React, { useState, useEffect } from "react";

import styled from "styled-components";
import theme from "../theme.js";
import LoadingSVG from "../media/loading.svg";
let Div = styled.div`
  position: absolute;
  left: 19%;
  width: 62%;
  top: 50px;
`;

function UploadFiles(props) {
  const [files, setFiles] = useState();

  return <Div></Div>;
}

export default UploadFiles;
