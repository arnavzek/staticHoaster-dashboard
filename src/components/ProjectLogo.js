import React, { useContext, useState, useEffect } from "react";

import Styled from "styled-components";

let Image = Styled.div`
  height: 60px;
  display: flex;
  background-color: #00000000;
  background-size: contain;
  width: 60px;
  object-fit: cover;
  position: relative;
  background-repeat: no-repeat;
  background-image: url("${(props) => props.image}");


`;

let EmojiIcon = Styled.div`
    line-height: 55px;
    font-size: 30px;
    background: #fff;
    height: 65px;
    width: 65px;
    text-align:center;
    padding:5px;

    background: #222;
    border-radius: 500px;
  
`;

function ProjectLogo({ image, emojiIcon }) {
  if (image) return <Image src={image}></Image>;
  return <EmojiIcon>{emojiIcon}</EmojiIcon>;
}

export default ProjectLogo;
