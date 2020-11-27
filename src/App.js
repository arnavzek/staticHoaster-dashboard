import "./App.css";
import Home from "./screens/home";
import Dashboard from "./screens/dashboard";
import ManageApp from "./screens/manageApp";
import U from "./uponJS/main.js";
import NavBar from "./components/navBar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";
U.settings({ name: "react-test", local: true });

let Body = styled.div`
  padding: 55px;
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
          <Route path="/">
            <Home U={U} />
          </Route>
        </Switch>
      </Body>
    </Router>
  );
}

export default App;
