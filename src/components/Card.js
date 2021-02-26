import React, { useContext, useState, useEffect } from "react";
import Context from "../Context";
import Styled from "styled-components";

let Div = Styled.div`
    width: 18%;
    background: linear-gradient(
25deg
,#000000ba,5%,#0000002e,#00000087);
    color: #fff;
    padding: 25px;
    display: flex;
    margin-bottom: 50px;
    flex-direction: column;
    gap: 10px;

    border-radius: 15px;
    align-items: center;

    @media (max-width:800px){
      width: 90%;
    }
`;

let Emoji = Styled.div`
font-size: 50px;

`;
let Heading = Styled.div`
font-size: 25px;
    font-weight: 700;
`;
let Content = Styled.div`
opacity:0.5;
width: 100%;
text-align:${({ align }) => (align ? align : "center")};
`;

let Code = Styled.div`
opacity:0.5;
width: 100%;
white-space: pre;

`;

let A = Styled.a`
opacity:0.5;
text-decoration:underline;

`;
function WhyUs({ emoji, heading, link, content0, content, code }) {
  let { U } = useContext(Context);
  if (U.getUserCookie()) return [];
  return (
    <Div>
      <Emoji>{emoji}</Emoji>
      <Heading>{heading}</Heading>
      {link ? (
        <A target={"_blank"} href={link}>
          {link}
        </A>
      ) : (
        []
      )}
      {content0 ? <Content>{content0}</Content> : []}
      {content ? <Content>{content}</Content> : []}
      <Code>{code}</Code>
    </Div>
  );
}

export default WhyUs;
