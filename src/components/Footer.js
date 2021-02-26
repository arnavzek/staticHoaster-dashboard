import React, { useContext } from "react";
import Styled from "styled-components";
import { FaDiscord } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { RiTwitterFill } from "react-icons/ri";
let Div = Styled.div`
  display:flex;
  margin-top:200px;
  padding:50px;
  border-radius: 10px 10px 0 0;
  flex-direction:row;
  opacity:0.8;
  gap:100px;
  justify-content:flex-end;
  background:rgba(0,0,0,0.5);
`;

let Logo = Styled.div`
`;
let Social = Styled.a`
display:flex;
cursor:pointer;
gap:15px;
justify-content:center;
align-items:center;
flex-direction:row;
`;
let Text = Styled.div`
`;

function WhyUs() {
  return (
    <Div>
      <Social target="_blank" href={"http://discord.com"}>
        <Logo>
          <FaDiscord size={"30px"}></FaDiscord>
        </Logo>
        <Text>Join our Discord Server</Text>
      </Social>
      <Social target="_blank" href={"http://twitter.com/upon.one"}>
        <Logo>
          <RiTwitterFill size={"30px"}></RiTwitterFill>
        </Logo>
        <Text>twitter</Text>
      </Social>
      <Social target="_blank" href={"http://instagram.com/upon.one"}>
        <Logo>
          <AiFillInstagram size={"30px"}></AiFillInstagram>
        </Logo>
        <Text>Instagram</Text>
      </Social>
    </Div>
  );
}

export default WhyUs;
