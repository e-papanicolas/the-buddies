const express = require("express");
const router = express.Router();
const User = require("../models/user");

const users = User.find();

async function getById(id) {
  const user = await User.findById(id);
  // call toJSON method applied
  return user.toJSON();
}

// sign up - create new user
router.post("/register", (req, res, next) => {
  const user = new User(req.body);
  user.save();
  res.json(user);
});

// login
router.post("/login", (req, res, next) => {
  const { email } = req.body;
  const user = User.find({ email: email });
  res.json(user);
});

// logout
router.get("/:id/logout", (req, res, next) => {
  res.send();
});

// get / show user
router.get("/:id", (req, res, next) => {
  const currentUser = getById(req.params.id);
  if (!currentUser) {
    res.status(404).send("User not found");
  }

  res.send(currentUser);
});

// update user
router.put("/:id", (req, res, next) => {});

module.exports = router;
