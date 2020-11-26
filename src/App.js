import "./App.css";
import Home from "./screens/home";
import Dashboard from "./screens/dashboard";
import ManageApp from "./screens/manageApp";
import U from "./uponJS/main.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

U.settings({ name: "react-test", local: true });

function App() {
  return (
    <Router>
      <div className="App">
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
      </div>
    </Router>
  );
}

export default App;
