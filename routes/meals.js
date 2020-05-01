const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const Meal = require("../models/Meal");
const Ingredient = require("../models/Ingredient");

// @route					GET api/meals
// @desc					Get all meals from logged in user
// @access				Private
router.get("/", auth, async (req, res) => {
  try {
    const meals = await Meal.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(meals);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// @route					POST api/meals
// @desc					add a new meal
// @access				Private
router.post(
  "/",
  [auth, check("name", "Name is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, category, ingredients } = req.body;
    try {
      const newMeal = new Meal({
        name,
        category,
        user: req.user.id,
        ingredients,
      });
      const meal = await newMeal.save();
      res.json(meal);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route					PUT api/meal/:id
// @desc					update meal
// @access				Private
router.put("/:id", auth, async (req, res) => {
  const { name, category, ingredients } = req.body;

  //build meal object
  const mealFields = {};
  if (name) mealFields.name = name;
  if (category) mealFields.category = category;
  if (ingredients) mealFields.ingredients = ingredients;

  try {
    let meal = await Meal.findById(req.params.id);

    if (!meal) return res.status(404).json({ msg: "meal not found" });

    // make sure user owns meal
    if (meal.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "not authorized" });
    }

    meal = await Meal.findByIdAndUpdate(
      req.params.id,
      {
        $set: mealFields,
      },
      { new: true }
    );

    res.json(meal);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route					DELETE api/meals/:id
// @desc					delete meal
// @access				Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let meal = await Meal.findById(req.params.id);

    if (!meal) return res.status(404).json({ msg: "meal not found" });

    // make sure user owns meal
    if (meal.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "not authorized" });
    }

    await Meal.findByIdAndDelete(req.params.id);

    res.json("Meal removed");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
