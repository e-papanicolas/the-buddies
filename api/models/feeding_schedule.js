const mongoose = require("mongoose");
const { Schema } = mongoose;

const MealPlanSchema = new Schema({
  breakfast: {
    type: Date,
  },
  lunch: {
    type: Date,
  },
  dinner: {
    type: Date,
  },
});

const MealPlan = mongoose.model("meal_plan", MealPlanSchema);

module.exports = MealPlan;
