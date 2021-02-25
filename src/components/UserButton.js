import React, { useContext, useState, useEffect } from "react";
import Context from "../Context";
import Styled from "styled-components";

let Div = Styled.div`
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius:500px;
    overflow: hidden;
    cursor:pointer;
    color: #fff;
    background: #000000a3;
`;

let Img = Styled.img`
    object-fit: cover;
    height: 35px;
    width: 35px;

    border-radius: 200px;
`;

let Span = Styled.div`
justify-content:center;
align-items:center;
margin:0 15px;
font-size: 10px;
@media (min-width: 800px) {
    font-size: 15px;
  }
`;

function UserButton({ showUserOptions }) {
  let [userData, setUserData] = useState(null);
  let { U } = useContext(Context);

  useEffect(() => {
    U.getLoggedInUser().then(setUserData);
  }, []);

  if (!userData) return [];

  return (
    <Div onClick={showUserOptions}>
      <Img src={U.getProfilePicture(userData.id)} />
      <Span>{U.caps(userData.name)}</Span>
    </Div>
  );
}

export default UserButton;
