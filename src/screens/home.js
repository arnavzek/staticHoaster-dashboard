import React from "react";
import WelcomeBoad from "../components/welcomeBoad";
import Documentation from "../components/documentation";
import styled from "styled-components";
let Features = styled.div`
  display: flex;
  flex-direction: row;
  gap: 25px;
  border-top: 3px solid;
  flex-wrap: wrap;
  padding-top: 50px;
  justify-content: space-around;

  @media (max-width: 768px) {
    justify-content: flex-start;
    padding-left: 25px;
  }
`;

let Feature = styled.div`
  display: flex;
  flex-direction: row;
  gap: 25px;
  align-items: center;
  justify-content: space-between;
`;

let Tik = styled.div`
  background: #111;
  padding: 10px;
  height: 20px;
  width: 20px;
  color: #fff;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  display: flex;
`;

function Home() {
  return (
    <div className="App">
      <WelcomeBoad />
      <Features>
        <Feature>
          <Tik>✔</Tik> Easy Hosting
        </Feature>
        <Feature>
          <Tik>✔</Tik> User authentication
        </Feature>
        <Feature>
          <Tik>✔</Tik> noSQL database
        </Feature>
        <Feature>
          <Tik>✔</Tik> Binary upload
        </Feature>
        <Feature>
          <Tik>✔</Tik> Server side Rendering with puppetier
        </Feature>
      </Features>
      <Documentation />
    </div>
  );
}

export default Home;
