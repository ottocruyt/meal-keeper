import React, { Fragment, useEffect, useContext } from "react";
import MealContext from "../../context/meal/mealContext";
import Spinner from "../layout/Spinner";

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
        <h2 className="text-primary">Groceries</h2>
        <div className="text-center">
          No groceries... Please select a meal in the planner.
        </div>
      </Fragment>
    );
  }

  // TODO: the list is not pretty and certainly not on mobile
  // TODO: the remember the "checked" groceries instead of forgetting after refresh. Maybe not in database...

  return (
    <Fragment>
      {!loading ? (
        <div className="groceries-container grid-2">
          {groceries.map((grocery) => {
            return (
              <div className="grid-4 grocery-item-container" key={grocery.name}>
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
