const mongoose = require("mongoose");
const { Schema } = mongoose;

const PetSchema = new Schema({
  pet_name: {
    type: String,
    required: true,
  },
  DOB: {
    type: Date,
    required: true,
  },
  weight: {
    type: Number,
    required: false,
  },
  activity_level: {
    type: String,
    required: false,
  },
  calorie_goal: {
    type: Number,
    required: false,
  },
  favorite_things: {
    type: [String],
    required: false,
  },
  allergies: {
    type: [String],
    required: false,
  },
  notes: {
    type: [String],
    required: false,
  },
});

const Pet = mongoose.model("pet", PetSchema);

module.exports = Pet;
