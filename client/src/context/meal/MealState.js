import React, { useReducer } from "react";

import axios from "axios";
import MealContext from "./mealContext";
import mealReducer from "./mealReducer";
import {
  ADD_MEAL,
  DELETE_MEAL,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_MEAL,
  FILTER_MEALS,
  CLEAR_FILTER,
  MEAL_ERROR,
  GET_MEALS,
  GET_ALL_INGREDIENTS,
  CLEAR_MEALS,
  GET_SELECTED_MEALS,
  SET_SELECTED_MEALS,
  CLEAR_SELECTED_MEALS,
} from "../types";

const MealState = (props) => {
  const initialState = {
    meals: null, // default null, if it is empty after getting, it is an empty array
    current: null,
    filtered: null,
    error: null,
    allIngredients: null,
    selectedMeals: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(mealReducer, initialState);

  // GET MEALS
  const getMeals = async () => {
    try {
      const res = await axios.get("/api/meals");
      dispatch({ type: GET_MEALS, payload: res.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: MEAL_ERROR, payload: err.response.msg });
    }
  };

  // GET SELECTED MEALS
  const getSelectedMeals = async () => {
    try {
      const res = await axios.get("/api/selectedmeals");
      dispatch({ type: GET_SELECTED_MEALS, payload: res.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: MEAL_ERROR, payload: err.response.msg });
    }
  };
  // CLEAR SELECTED MEALS (put to empty array)
  const clearSelectedMeals = async () => {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/selectedmeals", [], config);
      dispatch({ type: CLEAR_SELECTED_MEALS, payload: res.data });
    } catch (err) {
      dispatch({ type: MEAL_ERROR, payload: err.response.msg });
    }
  };

  // SET SELECTED MEALS
  const setSelectedMeals = async (selectedmeals) => {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/selectedmeals", selectedmeals, config);
      dispatch({ type: SET_SELECTED_MEALS, payload: res.data });
    } catch (err) {
      dispatch({ type: MEAL_ERROR, payload: err.response.msg });
    }
  };

  // GET INGREDIENTS OF ALL MEALS
  const getAllIngredients = async () => {
    try {
      const res = await axios.get("api/ingredients");
      dispatch({ type: GET_ALL_INGREDIENTS, payload: res.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: MEAL_ERROR, payload: err.response.msg });
    }
  };

  // ADD MEAL
  const addMeal = async (meal) => {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/meals", meal, config);
      dispatch({ type: ADD_MEAL, payload: res.data });
    } catch (err) {
      dispatch({ type: MEAL_ERROR, payload: err.response.msg });
    }
  };

  // DELETE MEAL
  const deleteMeal = async (id) => {
    try {
      await axios.delete(`/api/meals/${id}`);
      dispatch({ type: DELETE_MEAL, payload: id });
    } catch (err) {
      dispatch({ type: MEAL_ERROR, payload: err.response.msg });
    }
  };

  // UPDATE CURRENT MEAL
  const updateMeal = async (meal) => {
    console.log("Updating meal:");
    console.log(meal);

    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    try {
      const res = await axios.put(`/api/meals/${meal._id}`, meal, config);
      dispatch({ type: UPDATE_MEAL, payload: res.data });
    } catch (err) {
      dispatch({ type: MEAL_ERROR, payload: err.response.msg });
    }
  };

  // CLEAR MEALS
  const clearMeals = () => {
    dispatch({ type: CLEAR_MEALS });
  };

  // SET CURRENT MEAL
  const setCurrent = (meal) => {
    dispatch({ type: SET_CURRENT, payload: meal });
  };

  // CLEAR CURRENT MEAL
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // FITER MEALS
  const filterMeals = (text) => {
    dispatch({ type: FILTER_MEALS, payload: text });
  };
  // CLEAR FILTER
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };
  return (
    <MealContext.Provider
      value={{
        meals: state.meals,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        allIngredients: state.allIngredients,
        selectedMeals: state.selectedMeals,
        loading: state.loading,
        addMeal,
        deleteMeal,
        setCurrent,
        clearCurrent,
        updateMeal,
        filterMeals,
        clearFilter,
        getMeals,
        clearMeals,
        getAllIngredients,
        getSelectedMeals,
        setSelectedMeals,
        clearSelectedMeals,
      }}
    >
      {props.children}
    </MealContext.Provider>
  );
};

export default MealState;
