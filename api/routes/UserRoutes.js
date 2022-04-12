const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("hi from a get route");
});

module.exports = router;
