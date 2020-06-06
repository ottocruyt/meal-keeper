import React, { useContext } from "react";
import PropTypes from "prop-types";
import MealContext from "../../context/meal/mealContext";
import Collapsible from "react-collapsible";
import { Typography } from "@material-ui/core";

export const MealItem = ({ meal }) => {
  const mealContext = useContext(MealContext);
  const { deleteMeal, setCurrent, clearCurrent } = mealContext;
  const { _id, name, category, ingredients } = meal;

  // ingredients is an array of objects which include amount and ingredient name

  const onDelete = () => {
    deleteMeal(_id);
    clearCurrent();
  };

  // TODO: remove the meal category. OR allow more meals per day to be selected and add breakfast, lunch, dinner, desert.
  // TODO: change buttons to material UI button
  // TODO: change meal title to material UI Typography

  return (
    <div className="card bg-light">
      <Typography variant="h6">
        {name}{" "}
        {/*<span
          style={{ float: "right" }}
          className={
            "badge " +
            (category === "dinner" ? "badge-success" : "badge-primary")
          }
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </span>*/}
      </Typography>
      {ingredients.length !== 0 && (
        <Collapsible trigger={<i className="fas fa-shopping-basket"></i>}>
          <ul className="list">
            {ingredients.map((object) => {
              return (
                <li key={object.ingredient}>
                  {object.amount} {object.unit} {object.ingredient}
                </li>
              );
            })}
          </ul>
        </Collapsible>
      )}
      <p>
        <button
          className="btn btn-dark btn-sm"
          onClick={() => {
            window.scrollTo(0, 0); // scroll to top so editable meal is visable
            setCurrent(meal);
          }}
        >
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

MealItem.propTypes = {
  meal: PropTypes.object.isRequired,
};

export default MealItem;
