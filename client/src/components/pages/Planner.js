import React, { Fragment, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import PlannerComponent from "../planner/Planner";

const Planner = () => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <Fragment>
      <div>
        <PlannerComponent />
      </div>
    </Fragment>
  );
};

export default Planner;
