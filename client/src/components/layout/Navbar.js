import React, { Fragment, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import MealContext from "../../context/meal/mealContext";

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const mealContext = useContext(MealContext);
  const { isAuthenticated, logout } = authContext;
  const { clearMeals } = mealContext;

  const onLogout = () => {
    logout();
    clearMeals();
  };
  const authLinks = (
    <Fragment>
      <div className="navbar-links navbar-no-selection">
        <li>
          <Link to="/planner">Planner</Link>
        </li>
        <li>
          <Link to="/groceries">Groceries</Link>
        </li>
        <li>
          <Link to="/meals">Meals</Link>
        </li>

        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <a onClick={onLogout} href="#!">
            <i className="fas fa-sign-out-alt navbar-no-selection"></i>{" "}
            <span className="hide-sm navbar-no-selection">Logout</span>
          </a>
        </li>
      </div>
    </Fragment>
  );
  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </Fragment>
  );
  return (
    <div className="navbar bg-primary navbar-no-selection">
      <Link to="/">
        <h1 className="navbar-no-selection">
          <i className={icon} /> {title}
        </h1>
      </Link>

      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: "Meal Keeper",
  icon: "fas fa-utensils",
};

export default Navbar;
