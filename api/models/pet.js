const mongoose = require("mongoose");
const { Schema } = mongoose;

const PetSchema = new Schema({
  parent_id: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
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
    required: true,
  },
  activity_level: {
    type: String,
    required: true,
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
  meal_plan: {
    type: Schema.Types.ObjectId,
    ref: "meal_plan",
    required: false,
  },
  image: {
    url: {
      type: String,
    },
  },
});

PetSchema.statics = {
  get(id) {
    return this.findById(id)
      .exec()
      .then((pet) => {
        if (pet) {
          return pet;
        }
        const err = new Error("No such pet exists!");
        return err;
      });
  },
};

const Pet = mongoose.model("pet", PetSchema);

module.exports = Pet;
