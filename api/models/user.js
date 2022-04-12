const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  full_name: {
    type: String,
    required: true,
  },
  tokenSeed: {
    type: String,
    required: true,
    unique: true,
  },
  created: {
    type: Date,
    default: () => new Date(),
  },
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
