import React, { useContext, useRef, useEffect } from "react";
import MealContext from "../../context/meal/mealContext";

const MealFilter = () => {
  const mealContext = useContext(MealContext);
  const text = useRef("");

  const { filterMeals, clearFilter, filtered } = mealContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });
  const onChange = (e) => {
    if (text.current.value !== "") {
      filterMeals(e.target.value);
    } else {
      clearFilter();
    }
  };
  return (
    <form>
      <input
        ref={text}
        type="text"
        placeholder="Filter Meals..."
        onChange={onChange}
      />
    </form>
  );
};

export default MealFilter;
