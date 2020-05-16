const mongoose = require("mongoose");

const MealSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: "dinner",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  ingredients: [
    {
      id: {
        type: String,
      },
      amount: {
        type: Number,
        default: 1,
      },
      ingredient: {
        type: String, //mongoose.Schema.Types.ObjectId
        //ref: "ingredients",
      },
      unit: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("Meal", MealSchema);
