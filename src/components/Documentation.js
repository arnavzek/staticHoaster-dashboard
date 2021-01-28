import React, { useState, useEffect } from "react";
import overlay from "../lib/overlay";
import styled from "styled-components";
import theme from "../theme.js";
import AceEditor from "react-ace";
import "brace/mode/javascript";
import "brace/theme/monokai";
import copy from "copy-to-clipboard";
let H1 = styled.h1`
  text-align: left;

  font-family: ${theme.fontFamily};
  font-size: 35px;
  @media (min-width: 786px) {
    font-size: 35px;
  }
`;

let Div = styled.div`
  font-weight: 400;
  font-size: 20px;
  line-height: 1.5;
`;

let DocBody = styled.div`
  padding: 50px 0;
  background: transparent;
  color: rgb(0, 0, 0);
  margin: 0px;
  border-radius: 0;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  gap: 50px;
  flex-direction: column;
  font-family: roboto;
`;
let EditorContainer = styled.div`
  background: #2f3129;
  border-radius: 5px;
  padding: 0px 0;
  position: relative;
  margin: 25px 0;
`;

let CopyButton = styled.button`
  position: absolute;
  right: 5px;
  top: 5px;
  cursor: pointer;
  background: #fff;
  padding: 2px 10px;
  border: none;
  color: #000;
  border-radius: 5px;
`;

let CustomDiv = styled.div`
  margin: 25px 0;
  font-size: 16px;
`;
let Body = styled.div`
  font-family: ${theme.fontFamily};
  padding: 0px 150px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

function createMarkup(data) {
  return { __html: data };
}

function Documentation() {
  let [data, setData] = useState(null);
  useEffect(() => {
    window.U.api.get("documentation").then(setData);
  }, []);

  if (!data) data = {};

  const items = [];

  function customRendering(parent) {
    let rendered = [];
    for (let element of parent.children) {
      if (element.tagName == "CODE") {
        let code = element.innerHTML
          .replace(/&lt;/gi, "<")
          .replace(/&gt;/gi, ">");
        let hightlighted = (
          <EditorContainer>
            <AceEditor
              value={"\n" + code}
              mode="javascript"
              theme="monokai"
              width="unset"
              maxLines={"Infinity"}
              readOnly={true}
              focus={true}
              style={{
                margin: "20px 0",
                borderRadius: "5px",

                fontSize: "16px",
                padding: "20px;",
                background: "#2f3129",
              }}
              showPrintMargin={false}
            />
            <CopyButton
              onClick={() => {
                copy(code);
                window.overlay.alert("Copied to clipboard");
              }}
            >
              copy
            </CopyButton>
          </EditorContainer>
        );
        rendered.push(hightlighted);
      } else if (element.tagName == "PRE") {
        rendered.push(customRendering(element));
      } else {
        let aDiv = (
          <CustomDiv
            dangerouslySetInnerHTML={{ __html: element.innerHTML }}
          ></CustomDiv>
        );
        rendered.push(aDiv);
      }
    }

    return rendered;
  }

  for (let key in data) {
    if (
      key.trim() == "What is upon.one?" ||
      key.trim() == "upon.one" ||
      key.trim() == "Features"
    )
      continue;

    let custom = document.createElement("div");
    custom.innerHTML = data[key];
    items.push(
      <div key={key}>
        <H1>{key}</H1> <div>{customRendering(custom)}</div>
      </div>
    );
  }

  return (
    <Body>
      <DocBody>{items}</DocBody>
    </Body>
  );
}

export default Documentation;
