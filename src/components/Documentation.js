import React, { useState, useEffect } from "react";

import styled from "styled-components";
import theme from "../theme.js";

let H1 = styled.h1`
  text-align: left;

  color: #fff;
  font-family: ${theme.fontFamily};
  font-size: 35px;
  @media (min-width: 786px) {
    font-size: 35px;
  }
`;

let Div = styled.div`
  color: #fff;
  font-weight: 100;
`;

let Body = styled.div`
  margin: 0;
  border-radius: 30px;
  padding: 10px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  gap: 50px;
  flex-direction: column;
  font-family: ${theme.fontFamily};
  background-color: #111;

  @media (min-width: 786px) {
    padding: 55px 300px;
  }
`;

function createMarkup(data) {
  return { __html: data };
}

function Documentation() {
  const [data, setData] = useState(null);
  useEffect(() => {
    window.U.query({ $giveDocumentation: "" }).then(setData);
  }, []);

  if (!data) return <Body></Body>;

  const items = [];

  for (let key in data) {
    if (key.trim() == "What is upon.one?" || key.trim() == "upon.one") continue;
    items.push(
      <div key={key}>
        <H1>{key}</H1> <Div dangerouslySetInnerHTML={createMarkup(data[key])} />
      </div>
    );
  }

  return <Body>{items}</Body>;
}

export default Documentation;
