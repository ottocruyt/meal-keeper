import React, { Fragment, useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import MealItem from "../meals/MealItem";
import MealContext from "../../context/meal/mealContext";
import Spinner from "../spinner/Spinner";
import { Typography } from "@material-ui/core";

const Meals = () => {
  const mealContext = useContext(MealContext);

  const { meals, filtered, getMeals, loading } = mealContext;

  useEffect(() => {
    getMeals();
    // eslint-disable-next-line
  }, []);

  if (meals !== null && meals.length === 0 && !loading) {
    return <Typography variant="h5">Please add a meal...</Typography>;
  }

  return (
    <Fragment>
      {meals !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map((meal) => (
                <CSSTransition key={meal._id} timeout={500} classNames="item">
                  <MealItem meal={meal} />
                </CSSTransition>
              ))
            : meals.map((meal) => (
                <CSSTransition key={meal._id} timeout={500} classNames="item">
                  <MealItem meal={meal} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Meals;
