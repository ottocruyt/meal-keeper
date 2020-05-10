import React, { Fragment } from "react";
import { v4 as uuidv4 } from "uuid";
import Creatable from "react-select/creatable";

const IngredientForm = (props) => {
  const ingredients = props.ingredients;
  const allIngredients = props.allIngredients;
  let options = [];
  if (allIngredients && allIngredients.length) {
    options = allIngredients.map((ingredient) => ({
      value: ingredient,
      label: ingredient,
    }));
    //console.log(options);
  }

  const onChange = (index, e) => {
    const ingredientsInForm = [...ingredients];
    if (e.target.name === "amount") {
      const number = e.target.value; //replace(",", ".");
      console.log(number);
      const parsedNumber = parseFloat(number);
      if (!isNaN(parsedNumber)) {
        ingredientsInForm[index].amount = parseFloat(number);
        console.log("ingredient amount accepted and push up");
        props.onChange(ingredientsInForm);
      }
    }
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

  const selectHandleChange = (newValue, actionMeta, index) => {
    //console.group("Value Changed");
    //console.log(newValue);
    //console.log(`action: ${actionMeta.action}`);
    //console.groupEnd();
    const ingredientsInForm = [...ingredients];
    ingredientsInForm[index].ingredient = newValue.value;
    props.onChange(ingredientsInForm);
  };

  const selectHandleInputChange = (inputValue, actionMeta, index) => {
    //console.group("Input Changed");
    //console.log(inputValue);
    //console.log(`action: ${actionMeta.action}`);
    //console.groupEnd();
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
                  placeholder="#"
                  name="amount"
                  value={object.amount}
                  onChange={(event) => onChange(index, event)}
                  min="0"
                  max="9999"
                  step="any"
                />

                <Creatable
                  className="ingredients-form-select"
                  placeholder={<div>Search ingredient...</div>}
                  name="ingredient"
                  value={
                    object.ingredient === ""
                      ? ""
                      : { value: object.ingredient, label: object.ingredient }
                  }
                  onChange={(newValue, actionMeta) =>
                    selectHandleChange(newValue, actionMeta, index)
                  }
                  onInputChange={(inputValue, actionMeta) =>
                    selectHandleInputChange(inputValue, actionMeta, index)
                  }
                  options={options}
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
/*
<input
  type="text"
  placeholder="Ingredient"
  name="ingredient"
  value={object.ingredient}
  onChange={(event) => onChange(index, event)}
/>
*/
