import React, { useContext, useState, useEffect } from "react";
import Context from "../Context";
import Styled from "styled-components";
import { elastic as Menu } from "react-burger-menu";

let Element = Styled.div``;

function BurgerMenu({ items, setItems }) {
  if (!items) return [];

  let itemsToRender = [];

  for (let item in items) {
    let clickEvent = () => {
      setItems(null);
      item.func();
    };
    itemsToRender.push(<Element onClick={clickEvent}>{item.text}</Element>);
  }
  // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
  return <Menu>{itemsToRender}</Menu>;
}

export default BurgerMenu;
