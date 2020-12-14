import "./App.css";
import Home from "./screens/home";
import Dashboard from "./screens/dashboard";
import ManageApp from "./screens/manageApp";
import U from "./uponJS/main.js";
import NavBar from "./components/navBar";
import Documentation from "./components/documentation";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";
import ReactGA from "react-ga";
import { useEffect } from "react";

ReactGA.initialize("UA-166276820-1");
U.settings({ name: "www", local: false });

let Body = styled.div`
  padding: 55px 150px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

function App() {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
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
