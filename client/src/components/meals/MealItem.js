import React, { useContext } from "react";
import PropTypes from "prop-types";
import MealContext from "../../context/meal/mealContext";
import Collapsible from "react-collapsible";

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

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{" "}
        <span
          style={{ float: "right" }}
          className={
            "badge " +
            (category === "dinner" ? "badge-success" : "badge-primary")
          }
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </span>
      </h3>
      {ingredients.length !== 0 && (
        <Collapsible trigger={<i className="fas fa-shopping-basket"></i>}>
          <ul className="list">
            {ingredients.map((object) => {
              return (
                <li key={object.ingredient}>
                  {object.amount} {object.ingredient}
                </li>
              );
            })}
          </ul>
        </Collapsible>
      )}
      <p>
        <button
          className="btn btn-dark btn-sm"
          onClick={() => setCurrent(meal)}
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
