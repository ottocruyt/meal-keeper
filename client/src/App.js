import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Planner from "./components/pages/Planner";
import Meals from "./components/pages/Meals";
import GroceryList from "./components/pages/GroceryList";
import About from "./components/pages/About";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alerts from "./components/layout/Alerts";
import PrivateRoute from "./components/routing/PrivateRoute";

import MealState from "./context/meal/MealState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import setAuthToken from "./utils/setAuthToken";
import "./App.css";
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  return (
    <AuthState>
      <MealState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className="container">
                <Alerts />
                <Switch>
                  <PrivateRoute exact path="/" component={Planner} />
                  <PrivateRoute exact path="/about" component={About} />
                  <PrivateRoute
                    exact
                    path="/groceries"
                    component={GroceryList}
                  />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                  <PrivateRoute exact path="/meals" component={Meals} />
                  <PrivateRoute exact path="/planner" component={Planner} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </MealState>
    </AuthState>
  );
};

export default App;
