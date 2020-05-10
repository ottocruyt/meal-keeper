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

  return (
    <Fragment>
      <h2 className="text-primary">Groceries</h2>
      {!loading ? (
        <div className="groceries-container grid-2">
          {groceries.map((grocery) => {
            return (
              <div className="grid-3 grocery-item-container" key={grocery.name}>
                <input type="checkbox" id="grocery-item-checkbox"></input>
                <div>{grocery.name}</div>
                <div>{grocery.amount}</div>
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
