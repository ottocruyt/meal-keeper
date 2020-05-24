import React, { Fragment, useEffect, useContext } from "react";
import moment from "moment";
import MealContext from "../../context/meal/mealContext";
import Spinner from "../spinner/Spinner";
import Selectable from "react-select";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { Typography } from "@material-ui/core";
import FastfoodIcon from "@material-ui/icons/Fastfood";

export const Planner = () => {
  const mealContext = useContext(MealContext);
  const {
    meals,
    getMeals,
    selectedMeals,
    setSelectedMeals,
    getSelectedMeals,
    loading,
  } = mealContext;

  let options = [];
  if (meals !== null && meals !== undefined) {
    options = meals.map((meal) => ({
      value: meal._id,
      label: meal.name,
    }));
    //console.log("options: ", options);
  }

  useEffect(() => {
    getSelectedMeals();
    getMeals();
    // eslint-disable-next-line
  }, []);

  const reactSelectStyles = {
    container: (provided, state) => ({
      ...provided,
      padding: 0,
      height: "fit-content",
    }),
    control: (provided, state) => ({
      ...provided,
      minHeight: "fit-content",
      height: "fit-content",
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      height: "30px",
      padding: "0 6px",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: "auto",
    }),
    input: (provided, state) => ({
      ...provided,
      position: "absolute",
      top: "50%",
      height: "2rem",
      margin: "0px",
      verticalAlign: "middle",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      position: "absolute",
      top: "50%",
      height: "2rem",
      margin: "0px",
      verticalAlign: "middle",
    }),
  };

  const week = [];
  const MAX_DAYS = 7;

  if (!loading && selectedMeals !== null && selectedMeals !== undefined) {
    //console.log("selected meals: ", selectedMeals);
    const selectedMealsArr = selectedMeals.meals;
    for (let i = 0; i < MAX_DAYS; i++) {
      const nextDay = new Date();
      nextDay.setDate(nextDay.getDate() + i);
      const mealIndex = selectedMealsArr.findIndex((meal) =>
        moment(nextDay).isSame(meal.date, "day")
      );
      const nextDayMeal = { day: nextDay, meal_id: "" };
      if (mealIndex !== -1) {
        nextDayMeal["meal_id"] = selectedMealsArr[mealIndex]._id;
        nextDayMeal["meal_name"] = selectedMealsArr[mealIndex].meal.name;
      }
      week.push(nextDayMeal);
    }
  } else {
    // user hasnt selected any meals yet
    for (let i = 0; i < MAX_DAYS; i++) {
      const nextDay = new Date();
      nextDay.setDate(nextDay.getDate() + i);
      const nextDayMeal = { day: nextDay, meal_id: "" };
      week.push(nextDayMeal);
    }
  }
  const selectHandleChange = (newValue, actionMeta, day) => {
    console.group("Value Changed");
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.log(`date: ${day.day}`);
    console.groupEnd();
    const selecetedMealsInForm = { ...selectedMeals };
    const index = selecetedMealsInForm.meals.findIndex((meal) =>
      moment(day.day).isSame(meal.date, "day")
    );
    if (index === -1) {
      // day was empty and new value is not null (not cleared)
      // add meal to selected meals

      const meals = [...selecetedMealsInForm.meals];
      meals.push({
        date: day.day,
        meal: newValue === null ? null : newValue.value,
      });
      selecetedMealsInForm["meals"] = meals;
    } else {
      // there was already a meal selected for that day
      // update day to newly selected meal
      if (newValue === null) {
        // selected meal was cleared
        //console.log(
        //  "Selected meals in form before splice:",
        //  selecetedMealsInForm
        //);
        selecetedMealsInForm["meals"].splice(index, 1);
        //console.log(
        //  "Selected meals in form after splice:",
        //  selecetedMealsInForm
        //);
      } else {
        // selected meal was changed
        selecetedMealsInForm["meals"][index].meal._id = newValue.value;
      }
    }
    setSelectedMeals(selecetedMealsInForm);
  };

  const selectHandleInputChange = (inputValue, actionMeta, day) => {
    if (actionMeta.action === "input-blur") {
      // user clicked away next to the selectable
      // select the previously selected meal again = 'cancel'
      const selecetedMealsInForm = { ...selectedMeals };
      setSelectedMeals(selecetedMealsInForm);
    }
    console.group("Input Changed");
    console.log(inputValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };

  if (
    (meals === null || meals === undefined || meals.length === 0) &&
    !loading
  ) {
    // no meals added yet
    return (
      <Fragment>
        <Typography variant="h4">No meals...</Typography>
        <FastfoodIcon style={{ fontSize: "10rem" }} />
        <Typography variant="subtitle1">
          Add a meal in the{" "}
          <Link component={RouterLink} to="/meals" variant="subtitle1">
            Meals
          </Link>{" "}
          section.
        </Typography>
      </Fragment>
    );
  }
  // TODO: change date to material UI typography
  return (
    <Fragment>
      {!loading ? (
        <div className="grid-7 week-container">
          {week.map((day) => {
            return (
              <div className="day-card grid-2 grid-day" key={day.day}>
                <div className="day-card-container">
                  <h4>{moment(day.day).format("ddd, DD-MM")}</h4>
                </div>
                <div className="day-card-container">
                  <Selectable
                    styles={reactSelectStyles}
                    noOptionsMessage={() => "Add meals first!"}
                    menuPlacement="auto"
                    isClearable
                    className="planner-form-select"
                    placeholder={<div>Search meal...</div>}
                    name="meal"
                    value={
                      day.meal_id === "" || null
                        ? null
                        : { value: day.meal_id, label: day.meal_name }
                    }
                    options={options}
                    onChange={(newValue, actionMeta) =>
                      selectHandleChange(newValue, actionMeta, day)
                    }
                    onInputChange={(inputValue, actionMeta) =>
                      selectHandleInputChange(inputValue, actionMeta, day)
                    }
                  ></Selectable>
                </div>
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

export default Planner;
