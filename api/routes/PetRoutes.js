const express = require("express");
const router = express.Router();
require("dotenv").config();
const Pet = require("../models/pet");
const User = require("../models/user");
const MealPlan = require("../models/feeding_schedule");

const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: "eleni",
  api_key: "747249598932456",
  api_secret: "s8BlKdlUGuAATZLHBVrF-Gu_RMI",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "buddies",
  },
});

const parser = multer({ storage: storage });

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
router.post("/new", parser.single("image"), (req, res, next) => {
  const image = {};
  image.url = req.file.path;
  const newPet = new Pet({ ...req.body, image });
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
