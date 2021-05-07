import React, { useContext } from "react";
import Styled from "styled-components";
import Card from "./Card";
import Context from "../Context";
let Div = Styled.div`
  margin:50px 0;
`;

let Content = Styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap:wrap;
    gap:120px;
    @media(max-width:800px){
      gap:50px;
    }
`;

let Header = Styled.div`
    font-size: 20px;
    margin-bottom: 50px;
    font-weight: 900;
    opacity:0.5;
`;
function WhyUs() {
  let { U } = useContext(Context);
  if (U.getUserCookie()) return [];

  return (
    <Div>
      <Header>Example Projects</Header>

      <Content>
        <Card
          key={1}
          emoji={"🗒️"}
          heading={"Rough"}
          link={"https://rough.upon.one"}
          content={"A simple note taking app"}
        ></Card>
        <Card
          key={1}
          image={"https://charliewho.upon.one/logo192.png"}
          heading={"Charlie Who"}
          link={"https://charliewho.upon.one"}
          content={"Play online dumb charades, turn strangers to friends"}
        ></Card>
      </Content>
    </Div>
  );
}

export default WhyUs;
