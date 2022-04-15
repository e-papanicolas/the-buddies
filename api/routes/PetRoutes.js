const express = require("express");
const router = express.Router();
const Pet = require("../models/pet");
const User = require("../models/user");

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
    console.log(user.pets);
    user.pets.push(newPet._id);
    console.log(user.pets);
    res.json(newPet);
  });
});

// delete pet
router.delete("/:name/delete", (req, res, next) => {});

module.exports = router;
