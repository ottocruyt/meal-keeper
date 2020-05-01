import React, { Fragment } from "react";
import { v4 as uuidv4 } from "uuid";

const IngredientForm = (props) => {
  const ingredients = props.ingredients;

  const onChange = (index, e) => {
    const ingredientsInForm = [...ingredients];
    if (e.target.name === "amount") {
      ingredientsInForm[index].amount = parseInt(e.target.value);
    } else {
      ingredientsInForm[index].ingredient = e.target.value;
    }
    props.onChange(ingredientsInForm);
  };

  const addNewIngredient = () => {
    const ingredientsInForm = [...ingredients];
    const id = uuidv4();
    ingredientsInForm.push({ id, amount: "", ingredient: "" });
    props.onChange(ingredientsInForm);
  };

  const removeIngredient = (index) => {
    const ingredientsInForm = [...ingredients];
    ingredientsInForm.splice(index, 1);
    props.onChange(ingredientsInForm);
  };

  return (
    <Fragment>
      <ul className="ingredients-form">
        {ingredients.length !== 0 &&
          ingredients.map((object, index) => {
            return (
              <li key={`${object.id}`} className="ingredients-form">
                <input
                  type="number"
                  placeholder="Amt"
                  name="amount"
                  value={object.amount}
                  onChange={(event) => onChange(index, event)}
                  min="0"
                  max="9999"
                />
                <input
                  type="text"
                  placeholder="Ingredient"
                  name="ingredient"
                  value={object.ingredient}
                  onChange={(event) => onChange(index, event)}
                />
                <button type="button" onClick={() => removeIngredient(index)}>
                  <i className="far fa-trash-alt"></i>
                </button>
              </li>
            );
          })}
      </ul>
      <button
        type="button"
        className="ingredients-form"
        id="ingredients-form-add"
        onClick={addNewIngredient}
      >
        <i className="far fa-plus-square"></i>
      </button>
    </Fragment>
  );
};

export default IngredientForm;
