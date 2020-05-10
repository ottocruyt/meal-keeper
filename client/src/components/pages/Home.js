import React, { Fragment, useContext, useEffect } from "react";
import Meals from "../meals/Meals";
import MealForm from "../meals/MealForm";
import MealFilter from "../meals/MealFilter";
import AuthContext from "../../context/auth/authContext";
import Planner from "../planner/Planner";
import Groceries from "../groceries/Groceries";

const Home = () => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <Fragment>
      <div>
        <Planner />
      </div>
      <div>
        <Groceries />
      </div>
      <div className="grid-2">
        <div>
          <MealForm />
        </div>
        <div>
          <h2 className="text-primary">Available Meals</h2>
          <MealFilter />
          <Meals />
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
