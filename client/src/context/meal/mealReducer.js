import {
  GET_MEALS,
  GET_ALL_INGREDIENTS,
  GET_ALL_UNITS,
  ADD_MEAL,
  DELETE_MEAL,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_MEAL,
  FILTER_MEALS,
  CLEAR_FILTER,
  MEAL_ERROR,
  CLEAR_MEALS,
  GET_SELECTED_MEALS,
  SET_SELECTED_MEALS,
  CLEAR_SELECTED_MEALS,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_SELECTED_MEALS:
    case SET_SELECTED_MEALS:
    case CLEAR_SELECTED_MEALS:
      return {
        ...state,
        selectedMeals: action.payload,
        loading: false,
      };
    case GET_MEALS:
      return {
        ...state,
        meals: action.payload,
        loading: false,
      };
    case GET_ALL_INGREDIENTS:
      return {
        ...state,
        loading: false,
        allIngredients: action.payload,
      };
    case GET_ALL_UNITS:
      return {
        ...state,
        loading: false,
        allUnits: action.payload,
      };
    case ADD_MEAL:
      return {
        ...state,
        meals: [action.payload, ...state.meals], // add to the top (most recent)
        loading: false,
      };
    case DELETE_MEAL:
      return {
        ...state,
        meals: state.meals.filter((meal) => meal._id !== action.payload),
        loading: false,
      };
    case UPDATE_MEAL:
      return {
        ...state,
        meals: state.meals.map((meal) =>
          meal._id === action.payload._id ? action.payload : meal
        ),
        loading: false,
      };
    case CLEAR_MEALS:
      return {
        ...state,
        meals: null,
        filtered: null,
        error: null,
        current: null,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };

    case FILTER_MEALS:
      return {
        ...state,
        filtered: state.meals.filter((meal) => {
          const regex = new RegExp(`${action.payload}`, "gi"); // global and case insensitive
          return (
            meal.name.match(regex) ||
            meal.ingredients
              .map((object) => {
                return object.ingredient;
              })
              .join(" ")
              .match(regex)
          );
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case MEAL_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
