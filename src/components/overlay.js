import React from "react";

import styled from "styled-components";
import theme from "../theme.js";

let Div = styled.div`
  position: absolute;
  left: 19%;
  width: 62%;
  z-index: 57;
  background: #fff;
  top: 50px;
`;

let AbsoluteDiv = styled.div`
  position: fixed;
  top: 0;

  left: 0;
  z-index: 55;
  height: 100vh;
  width: 100vw;
  font-family: ${theme.fontFamily};
`;

let H1 = styled.h1``;

let Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

let CloseButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

let OverlayLayer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #999;
`;

function Overlay(props) {
  if (!props.data) return [];

  console.log(props.data.children);
  return (
    <AbsoluteDiv>
      <Div>
        <Top>
          <H1>{props.data.message}</H1>
          <CloseButton
            onClick={() => {
              props.setData(null);
            }}
          >
            ×
          </CloseButton>
        </Top>
        {props.data.children}
      </Div>
      <OverlayLayer
        onClick={() => {
          props.setData(null);
        }}
      />
    </AbsoluteDiv>
  );
}

export default Overlay;
