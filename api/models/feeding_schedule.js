const mongoose = require("mongoose");
const { Schema } = mongoose;

const MealPlanSchema = new Schema({
  breakfast: {
    type: String,
  },
  lunch: {
    type: String,
  },
  dinner: {
    type: String,
  },
  pet_id: {
    type: Schema.Types.ObjectId,
    ref: "pet",
    required: true,
  },
});

const MealPlan = mongoose.model("meal_plan", MealPlanSchema);

module.exports = MealPlan;
