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
    
    justify-content: space-between;
    @media (max-width:800px){
      gap:25px;
    }
}
`;

let Header = Styled.div`
    font-size: 40px;
    margin-bottom: 50px;
    font-weight: 900;
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
          emoji={"❤️"}
          heading={"Build Faster"}
          content={
            "Build Faster and with ease so that you can spend time with your family"
          }
        ></Card>
        <Card
          key={1}
          emoji={"🌎"}
          heading={"Impact million"}
          content={
            "Impact million as our servers run on Google cloud which can scale to near infinity "
          }
        ></Card>
        <Card
          key={1}
          emoji={"🔒"}
          heading={"Free Security"}
          content={
            "Security should always be free. Get free SSL so that both you and your customers can work safely"
          }
        ></Card>
        <Card
          key={1}
          emoji={"🔎"}
          heading={"SEO Friendly JS"}
          content={
            "While you build the future we make sure people can find that future. When a serch bot comes to us we process your JS and serve it as if it was  a server side page"
          }
        ></Card>
      </Content>
    </Div>
  );
}

export default WhyUs;
