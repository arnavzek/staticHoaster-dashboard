import React, { useContext } from "react";
import Styled from "styled-components";
import Card from "./Card";
import Context from "../Context";
let Div = Styled.div`

`;

let Content = Styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap:wrap;
    gap:120px;
    @media(max-width:800px){
      gap:50px;
    }
    //justify-content: space-between;
 
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
      <Header>Why Us?</Header>

      <Content>
        <Card
          key={1}
          emoji={"🌎"}
          heading={"Impact million"}
          content={
            "As our servers run on kubernetes you can scale to near infinity, carefree."
          }
        ></Card>

        <Card
          key={1}
          emoji={"🔎"}
          heading={"SEO Friendly"}
          content={
            "While you build the future we make sure people can find that future. When a search bot comes to us we process your JS and serve it as if it was  a server side page"
          }
        ></Card>
        <Card
          key={1}
          emoji={"🔗"}
          heading={"Custom Domain "}
          content0={`(coming soon)
          `}
          content={`
          Add custom domain with autorenewing SSL`}
        ></Card>
      </Content>
    </Div>
  );
}

/*
        <Card
          key={1}
          emoji={"👨‍💻"}
          heading={"Git Support "}
          content0={`(coming soon)`}
          code={`
          Anonymus Hosting
          > npx quick-deploy

          Proper Hosting
          > npm install upon.one
          > upon.one deploy
          `}
        ></Card>

*/

export default WhyUs;
