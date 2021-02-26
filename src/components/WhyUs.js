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
          emoji={"🌎"}
          heading={"Impact million"}
          content={
            "As our servers run on kubernetes you can scale to near infinity, carefree."
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
        <Card
          key={1}
          emoji={"💨"}
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
        <Card
          key={1}
          emoji={"🎨"}
          heading={"Website Builder"}
          content={`
          We provide a free component based website builder. So, that you can build your dream while you are half sleeping
          `}
        ></Card>
        <Card
          key={1}
          emoji={"💽"}
          heading={"Simple Database"}
          content={`
            APIs are great way to talk to the server but they don't scale. For every feature you have to add an endpoint & with every new endpoint there is a possiblity of Bugs & Security vulnerablity. With our database you only need to provide rules for read, write and update and with our client library client can access the database directly and securely
          `}
        ></Card>
        <Card
          key={1}
          emoji={"😀"}
          heading={"Easy Auth"}
          content={`
            You can login your user, let them change password, let users signup with Google. All of that with just one line of code
          `}
        ></Card>
      </Content>
    </Div>
  );
}

export default WhyUs;
