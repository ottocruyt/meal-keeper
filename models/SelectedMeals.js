const mongoose = require("mongoose");

const SelectedMealsSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  meals: [
    {
      id: String,
      date: Date,
      meal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Meal", // plural or singular doesnt seem to matter
      },
    },
  ],
});

module.exports = mongoose.model("SelectedMeals", SelectedMealsSchema);
