const express = require("express");
const router = express.Router();
const Pet = require("../models/pet");
const User = require("../models/user");
const MealPlan = require("../models/feeding_schedule");

// get users pets
router.get("/:user_id/all_pets", (req, res, next) => {
  Pet.find({ parent_id: req.params.user_id }).then((pets) => {
    res.json(pets);
  });
});

// show pet profile
router.get("/:name/profile", (req, res, next) => {
  Pet.get(req.params.id).then((pet) => res.json(pet));
});

// update pet profile
router.put("/:name/profile/update", (req, res, next) => {});

// create new pet
router.post("/new", (req, res, next) => {
  const newPet = new Pet(req.body);
  newPet.save();
  User.get(newPet.parent_id).then((user) => {
    user.pets.push(newPet.id);
    user.save();
    res.json({ newPet, user });
  });
});

// create new feeding schedule for pet
router.post("/:name/new_feeding_schedule", (req, res, next) => {
  const newSched = new MealPlan(req.body);
  newSched.save();
  res.json(newSched);
});

// delete pet
router.delete("/:name/delete", (req, res, next) => {});

module.exports = router;
