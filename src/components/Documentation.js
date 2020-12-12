import React, { useState, useEffect } from "react";

import styled from "styled-components";
import theme from "../theme.js";

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
  padding: 100px 0;
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

let Body = styled.div`
  font-family: ${theme.fontFamily};
`;

function createMarkup(data) {
  return { __html: data };
}

function Documentation() {
  let [data, setData] = useState(null);
  useEffect(() => {
    window.U.query({ $giveDocumentation: "" }).then(setData);
  }, []);

  if (!data) data = {};

  const items = [];

  for (let key in data) {
    if (
      key.trim() == "What is upon.one?" ||
      key.trim() == "upon.one" ||
      key.trim() == "Features"
    )
      continue;
    items.push(
      <div key={key}>
        <H1>{key}</H1> <Div dangerouslySetInnerHTML={createMarkup(data[key])} />
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
