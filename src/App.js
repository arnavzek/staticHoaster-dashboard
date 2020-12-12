import "./App.css";
import Home from "./screens/home";
import Dashboard from "./screens/dashboard";
import ManageApp from "./screens/manageApp";
import U from "./uponJS/main.js";
import NavBar from "./components/navBar";
import Documentation from "./components/documentation";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";
let adminPanel = require("./components/adminPanel");
let backendEditor = require("./components/backendEditor");
let uploadHostFiles = require("./components/uploadHostFiles");
let overlayButtons = require("./components/overlayButtons");

U.settings({ name: "www", local: false });

let Body = styled.div`
  padding: 55px 150px;
`;

function App() {
  return (
    <Router>
      <Body>
        <NavBar U={U} />
        <Switch>
          <Route path="/dashboard/:appName">
            <ManageApp U={U} />
          </Route>
          <Route path="/dashboard">
            <Dashboard U={U} />
          </Route>
          <Route path="/docs">
            <Documentation />
          </Route>
          <Route path="/">
            <Home U={U} />
          </Route>
        </Switch>
      </Body>
    </Router>
  );
}

export default App;
