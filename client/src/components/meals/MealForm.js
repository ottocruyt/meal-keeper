import React, { useState, useContext, useEffect } from "react";
import MealContext from "../../context/meal/mealContext";
import IngredientForm from "../ingredients/IngredientForm";
const MealForm = () => {
  const mealContext = useContext(MealContext);
  const {
    addMeal,
    clearCurrent,
    current,
    updateMeal,
    getAllIngredients,
    allIngredients,
    loading,
  } = mealContext;

  const [meal, setMeal] = useState({
    name: "",
    category: "dinner",
    ingredients: [],
    allIngredients: [],
  });

  useEffect(() => {
    if (current !== null) {
      setMeal(current);
    } else {
      setMeal({
        name: "",
        category: "dinner",
        ingredients: [],
      });
    }
  }, [mealContext, current]);

  const { name, category, ingredients } = meal;

  useEffect(() => {
    getAllIngredients();
    // eslint-disable-next-line
  }, []);

  const onChange = (e) => setMeal({ ...meal, [e.target.name]: e.target.value });
  const onChangeIngredients = (newIngredients) =>
    setMeal({ ...meal, ingredients: newIngredients });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (current === null) {
      addMeal(meal);
    } else {
      updateMeal(meal);
    }
    await getAllIngredients();
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">{current ? "Edit Meal" : "Add Meal"}</h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onChange}
      />
      <h5>Meal Ingredients</h5>
      {!loading && (
        <IngredientForm
          ingredients={ingredients}
          allIngredients={allIngredients}
          onChange={onChangeIngredients}
        />
      )}
      <h5>Meal Category</h5>
      <input
        type="radio"
        name="category"
        value="dinner"
        checked={category === "dinner"}
        onChange={onChange}
      />{" "}
      Dinner{" "}
      <input
        type="radio"
        name="category"
        value="dessert"
        checked={category === "dessert"}
        onChange={onChange}
      />{" "}
      Dessert
      <div>
        <input
          type="submit"
          value={current ? "Update Meal" : "Add Meal"}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default MealForm;
