const express = require("express");
const router = express.Router();
const User = require("../models/user");

async function getById(id) {
  const user = await User.findById(id);
  // call toJSON method applied during model instantiation
  return user.toJSON();
}

// sign up - create new user
router.post("/register", (req, res, next) => {
  const user = new User(req.body);
  user.save();
  console.log(user);
  res.json(user);
});

// login
router.post("/login", (req, res, next) => {});

// get / show user
router.get("/:id", (req, res, next) => {});

// update user
router.put("/:id", (req, res, next) => {});

module.exports = router;
