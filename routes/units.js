const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const Meal = require("../models/Meal");
const User = require("../models/User");

// @route					GET api/units
// @desc					Get all ingredients from logged in user
// @access				Private
router.get("/", auth, async (req, res) => {
  try {
    const meals = await Meal.find({ user: req.user.id }).sort({
      date: -1,
    });
    let allUnits = [];
    meals.forEach((meal) => {
      meal.ingredients.forEach((object) => {
        if (!allUnits.find((val) => val === object.unit)) {
          allUnits.push(object.unit);
        }
      });
    });
    // filter out null values
    const filteredUnits = allUnits.filter((unit) => {
      return unit !== null && unit !== undefined && unit !== "" && unit !== 0;
    });
    res.json(filteredUnits);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

/*
// @route					POST api/ingredients
// @desc					add a new ingredient
// @access				Private
router.post(
  "/",
  [auth, check("name", "Name is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;
    try {
      const newIngredient = new Ingredient({
        name,
        user: req.user.id,
      });
      const ingredient = await newIngredient.save();
      res.json(ingredient);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route					PUT api/ingredient/:id
// @desc					update ingredient
// @access				Private
router.put("/:id", auth, async (req, res) => {
  const { name } = req.body;

  //build ingredient object
  const ingredientFields = {};
  if (name) ingredientFields.name = name;

  try {
    let ingredient = await Ingredient.findById(req.params.id);

    if (!ingredient)
      return res.status(404).json({ msg: "ingredient not found" });

    // make sure user owns ingredient
    if (ingredient.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "not authorized" });
    }

    ingredient = await Ingredient.findByIdAndUpdate(
      req.params.id,
      {
        $set: ingredientFields,
      },
      { new: true }
    );

    res.json(ingredient);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route					DELETE api/ingredients/:id
// @desc					delete ingredient
// @access				Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let ingredient = await Ingredient.findById(req.params.id);

    if (!ingredient)
      return res.status(404).json({ msg: "ingredient not found" });

    // make sure user owns ingredient
    if (ingredient.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "not authorized" });
    }

    await Ingredient.findByIdAndDelete(req.params.id);

    res.json("Ingredient removed");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
*/

module.exports = router;
