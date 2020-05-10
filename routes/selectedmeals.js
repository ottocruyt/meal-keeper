const express = require("express");
const moment = require("moment");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const SelectedMeals = require("../models/SelectedMeals");
const User = require("../models/User");
const Meal = require("../models/Meal");

// @route					GET api/selectedmeals
// @desc					Get all meals selected from logged in user
// @access				Private
router.get("/", auth, async (req, res) => {
  try {
    const selectedmeals = await SelectedMeals.findOne({
      user: req.user.id,
    })
      .populate({
        path: "meals.meal",
        model: Meal,
      })
      .exec(function (err, selectedmeals) {
        if (err) {
          console.error(err);
          res.status(500).send("server error");
        } else {
          const today = new Date();
          const filtered = selectedmeals.meals.filter((meal) => {
            const mealDate = new Date(meal.date);
            /*
            console.log(`Today: ${today} vs ${mealDate}`);
            console.log(
              "is not before: ",
              !moment(mealDate).isBefore(today, "day")
            );
            */
            console.log(`meal at ${mealDate} is ${meal}`);
            return !(
              moment(mealDate).isBefore(today, "day") ||
              meal.meal === null ||
              meal.meal === undefined ||
              meal.meal === ""
            ); // if it is not before today AND nothing, keep it.
          });
          selectedmeals.meals = filtered;
          console.log("after filtering: ", selectedmeals);
          //console.log("success");
          res.json(selectedmeals);
        }
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// @route					POST api/selectedmeals
// @desc					add a new list of selected meals
// @access				Private
router.post("/", auth, async (req, res) => {
  const { meals } = req.body;
  console.log("req body selected meals: ", meals);

  try {
    // first get the users current selected meals:
    const selectedmeals = await SelectedMeals.findOne({ user: req.user.id });
    //console.log("selected meals found: ", selectedmeals);

    if (selectedmeals) {
      // if there is one, update it
      //console.log("updating because found one");
      const newSelectedMeals = await SelectedMeals.findByIdAndUpdate(
        { _id: selectedmeals._id },
        { meals: meals },
        { new: true }
      )
        .populate({
          path: "meals.meal",
          model: Meal,
        })
        .exec(function (err, newSelectedMeals) {
          if (err) {
            console.error(err);
            res.status(500).send("server error");
          } else {
            console.log("selectedmeals after pop: ", newSelectedMeals);
            const today = new Date();
            const filtered = newSelectedMeals.meals.filter((meal) => {
              const mealDate = new Date(meal.date);
              return !(
                moment(mealDate).isBefore(today, "day") ||
                meal.meal === null ||
                meal.meal === undefined ||
                meal.meal === ""
              ); // if it is not ... before today AND nothing, keep it
            });
            newSelectedMeals.meals = filtered;
            console.log(
              "selectedmeals after pop with filter: ",
              newSelectedMeals
            );
            res.json(newSelectedMeals);
          }
        });
    } else {
      // there is no selectedmeals, so post new one
      const newSelectedMeals = new SelectedMeals({
        user: req.user.id,
        meals,
      });
      await newSelectedMeals.save(function (err) {
        SelectedMeals.populate(
          newSelectedMeals,
          { path: "meals.meal", model: Meal },
          function (err, selectedMealsPosted) {
            //console.log("selected meals after population: ", selectedMealsPosted);
            res.json(selectedMealsPosted);
          }
        );
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
