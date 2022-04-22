const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  img: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = new mongoose.model("image", imageSchema);
