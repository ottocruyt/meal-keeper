import React, { Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Drawer from "./components/layout/Drawer";

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
              <Drawer />
            </Fragment>
          </Router>
        </AlertState>
      </MealState>
    </AuthState>
  );
};

export default App;
