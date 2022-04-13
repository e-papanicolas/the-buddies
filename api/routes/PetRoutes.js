const express = require("express");
const router = express.Router();
const Pet = require("../models/pet");
const { route } = require("./UserRoutes");

async function getById(id) {
  const pet = await Pet.findById(id);
  return pet.toJSON();
}

// show pet profile
router.get("/:name/profile", (req, res, next) => {});

// update pet profile
router.put("/:name/profile/update", (req, res, next) => {});

// create new pet
router.post("/new", (req, res, next) => {});

// delete pet
router.delete("/:name/delete", (req, res, next) => {});

module.exports = router;
