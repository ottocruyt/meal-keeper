import React, { Fragment, useEffect, useContext } from "react";
import MealContext from "../../context/meal/mealContext";
import Spinner from "../spinner/Spinner";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";

export const Groceries = () => {
  const mealContext = useContext(MealContext);
  const { selectedMeals, getSelectedMeals, loading } = mealContext;

  useEffect(() => {
    getSelectedMeals();
    // eslint-disable-next-line
  }, []);

  let groceries = [];

  const getAllIngredientsSummedUp = () => {
    if (selectedMeals !== null && selectedMeals !== undefined && !loading) {
      let ingredientSums = [];
      selectedMeals.meals.forEach((meal) => {
        meal.meal.ingredients.forEach((object) => {
          const index = ingredientSums.findIndex(
            (element) => element.name === object.ingredient
          );
          if (index === -1) {
            ingredientSums.push({
              name: object.ingredient,
              amount: object.amount,
              unit: object.unit,
            });
          } else {
            ingredientSums[index].amount += object.amount;
          }
        });
      });
      //console.log("summed up = ", ingredientSums);
      return ingredientSums;
    }
  };

  if (!loading && selectedMeals !== null && selectedMeals !== undefined) {
    //console.log("selected meals: ", selectedMeals);
    groceries = getAllIngredientsSummedUp();
  }

  if (
    (groceries === null || groceries === undefined || groceries.length === 0) &&
    !loading
  ) {
    return (
      <Fragment>
        <Typography variant="h4">No groceries...</Typography>
        <RemoveShoppingCartIcon style={{ fontSize: "10rem" }} />
        <Typography variant="subtitle1">
          Please select a meal in the{" "}
          <Link component={RouterLink} to="/planner" variant="subtitle1">
            Planner
          </Link>
          .
        </Typography>
      </Fragment>
    );
  }

  // TODO: the list is not pretty
  // TODO: the remember the "checked" groceries instead of forgetting after refresh. Maybe not in database... but in localStorage

  return (
    <Fragment>
      {!loading ? (
        <div className="groceries-container grid-2">
          {groceries.map((grocery) => {
            return (
              <div className="grocery-item-container" key={grocery.name}>
                <input type="checkbox" id="grocery-item-checkbox"></input>
                <div>{grocery.amount}</div>
                <div>{grocery.unit}</div>
                <div>{grocery.name}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Groceries;
