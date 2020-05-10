import React, { Fragment, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import Groceries from "../groceries/Groceries";

const GroceryList = () => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <Fragment>
      <Groceries />
    </Fragment>
  );
};

export default GroceryList;
