import React, { useState, useEffect } from "react";
import imageCompression from "browser-image-compression";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { useHistory } from "react-router-dom";

let Button = styled.button`
  border: 1px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 10px 25px;
  cursor: pointer;
  display: flex;
`;

let DashboardOptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 50px;
  width: 100%;
  justify-content: space-between;

  @media (max-width: 786px) {
    flex-wrap: wrap;
    gap: 25px;
  }
`;

let DashboardOption = styled.button`
  border: 1px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  font-size: 14px;
  color: #fff;
  padding: 13px 40px;
  background: #000;
`;

let AppCollection = styled.div`
  margin: 50px 0;
  display: flex;
  gap: 20px;
  flex-direction: row;
  flex-wrap: wrap;
`;

let Body = styled.div``;

let Span = styled.span`
  border: 1px;
  padding: 10px 25px;
`;

let Options = styled.div`
  display: flex;
  gap: 25px;
  margin-top: 30px;
`;

let Hr = styled.hr`
  border: none;
  height: 1px;
  background: #000000b5;
`;

let Option = styled.div`
  cursor: pointer;
`;

let UserData = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 25px;
  align-items: center;
`;

let Name = styled.div`
  font-size: 30px;
  font-weight: 900;
`;

let ProfilePicture = styled.img`
  height: 45px;
  object-fit: cover;
  width: 45px;
  border-radius: 500px;
`;

let Zzz = styled.div`
  height: 200px;
  width: 100%;
  justify-content: center;
  align-items: center;
  color: #999;
  display: flex;
  font-size: 24px;
`;
let LogoImg = styled.div`
  height: 40px;
  display: flex;
  background-color: #00000000;
  background-size: contain;
  width: 40px;
  object-fit: cover;
  position: relative;
  background-repeat: no-repeat;
  background-image: url("${(props) => props.image}");

  &:after {
    display: ${(props) => (props.image ? "none" : "block")};
    font-size: 30px;
    content: "🌵";

    position: absolute;
    top: 0;
    left: 0;
  }
`;

function Dashboadrd(props) {
  let U = props.U;
  let history = useHistory();
  const [user, setUser] = useState(null);
  const [apps, updateApps] = useState(null);
  const [loading, updateLoadingStatus] = useState(true);
  function refresh() {
    U.getUser("developer").then((data) => {
      if (!data) return window.U.login("developer").then(refresh);
      setUser(data);
      U.query({ $searchApps: { owner: data.id } }).then((data) => {
        updateApps(data);
        updateLoadingStatus(false);
      });
    });
  }

  useEffect(refresh, []);

  let appsRender = [];

  if (apps) {
    apps.map((app, index) => {
      appsRender.push(
        <Link to={"/dashboard/" + app.name}>
          <Button key={index}>
            <LogoImg image={U.getLogoLink(app.logo, app.name)} />
            <Span>{app.name}</Span>
          </Button>
        </Link>
      );
    });
  }

  function createApp() {
    let form;
    let submited = (event, data) => {
      let loading = U.loading("Creating " + data.name);
      let name = data.name.toLowerCase().replace(" ", "");
      U.query({ $createApp: name }).then(() => {
        console.log(data);
        loading.kill();
        history.push("/dashboard/" + name);
        form.kill();
      });
    };

    form = U.ask([
      { h3: "What's its name?" },
      { input: { placeholder: "name", name: "name" } },
      { button: { innerHTML: "create", onclick: submited } },
    ]);
  }
  return (
    <div className="App">
      <Body>
        <DashboardOptionContainer>
          <UserData>
            {user ? <ProfilePicture src={U.getProfilePicture(user.id)} /> : ""}
            <Name>{user ? U.caps(user.name) : "loading..."}</Name>
          </UserData>
          <DashboardOption onClick={createApp}>👩‍🍳 Create App</DashboardOption>
        </DashboardOptionContainer>

        <Options>
          <Option> Projects </Option>
          <Option
            onClick={() => {
              U.logout("developer", true);
            }}
          >
            Log out
          </Option>
          <Option
            onClick={() => {
              U.changeProfilePicture("developer").then(() => {
                console.log("aaa");
                global.location.reload();
              });
            }}
          >
            Change Profile Picture
          </Option>
        </Options>
        <Hr />
        {appsRender.length !== 0 ? (
          <AppCollection>{appsRender}</AppCollection>
        ) : (
          <Zzz>
            {loading
              ? "Loading"
              : "Every masterpiece starts with a blank canvas"}
          </Zzz>
        )}
      </Body>
    </div>
  );
}

export default Dashboadrd;
