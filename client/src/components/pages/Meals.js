import React, { Fragment, useContext, useEffect } from "react";
import Meals from "../meals/Meals";
import MealForm from "../meals/MealForm";
import MealFilter from "../meals/MealFilter";
import AuthContext from "../../context/auth/authContext";
import { Typography } from "@material-ui/core";
const Home = () => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <Fragment>
      <div className="grid-2">
        <div>
          <MealForm />
        </div>
        <div>
          <Typography variant="h4">Meals</Typography>
          <MealFilter />
          <Meals />
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
