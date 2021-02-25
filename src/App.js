import "./App.css";
import Home from "./screens/home";
import { U, Upon } from "./lib/upon.js";
import React, { useReducer } from "react";
import reducer from "./reducer";
import Context from "./Context";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NavBar from "./components/NavBar";
import styled from "styled-components";

let Body = styled.div`
  background: #222;
  margin: 0;
  height: 100vh;
  overflow-y: scroll;
  color: #fff;
  box-sizing: border-box;
  padding: 20px;
  @media (min-width: 800px) {
    padding: 20px 50px;
  }
`;

//ReactGA.initialize("UA-166276820-1");
U.settings({ name: "www", local: true });

function App() {
  const [state, dispatch] = useReducer(reducer, { loggedIn: false });

  return (
    <Body>
      <Context.Provider value={{ state, dispatch, Upon, U }}>
        <Router>
          <NavBar></NavBar>
          <Switch>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </Context.Provider>
    </Body>
  );
}

export default App;
