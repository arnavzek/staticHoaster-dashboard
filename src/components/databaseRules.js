import React, { useState, useEffect } from "react";

import styled from "styled-components";
import theme from "../theme.js";
import AceEditor from "react-ace";
import "brace/mode/javascript";
import "brace/theme/monokai";
let EditorContainer = styled.div`
  background: #2f3129;
  border-radius: 5px;
  padding: 25px 0;
  margin: 25px 0;
`;

let Textarea = styled.textarea`
  width: 100%;
  border-radius: 10px;
  background: #fff;
  resize: none;
  box-sizing: border-box;
  background-color: rgb(0 0 0 / 8%);
  height: 60vh;
  border: none;
  margin: 30px 0;
  outline: none;
  padding: 20px;
`;

let Button = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  border: 2px solid #222;
  background: transparent;
  float: right;
`;

function BackendCodeEditor(props) {
  const [backendCode, setbBckendCode] = useState("");
  let U = props.U;
  console.log(U.configuration);
  useEffect(() => {
    refresh();
  }, []);

  return (
    <div>
      <EditorContainer>
        <AceEditor
          onChange={setbBckendCode}
          value={backendCode}
          mode="javascript"
          theme="monokai"
          width="auto"
          focus={true}
          showPrintMargin={false}
          style={{ background: "#2f3129" }}
        />
      </EditorContainer>
      <Button onClick={saveBackendCode}>Update Server</Button>
    </div>
  );

  function refresh() {
    U.query({ $readDBconfig: "" }).then((data) => {
      if (!data) return;
      console.log(data.app, U.configuration.name, U.info.serverUrl);
      setbBckendCode(data.backendCode);
    });
  }

  function saveBackendCode() {
    U.configuration.backendCode = backendCode;

    let loading = U.say("Updating Backend...");

    U.query({ $hostBackend: U.configuration }).then(() => {
      loading.kill();
      U.say("Backend Updated 😊");
    });
  }
}

export default BackendCodeEditor;
