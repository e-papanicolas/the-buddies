const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://eleni_papanicolas:yRXgWBON1n6eJlcLbCBi@cluster0.3quwk.mongodb.net/cat-track?retryWrites=true&w=majority";
const errors = require("./utils/errorHandler");
const usersRouter = require("./routes/UserRoutes");
const petsRouter = require("./routes/PetRoutes");
const imageModel = require("./models/image");

// middleware for parsing requests
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// define the storage path for the image we are uploading. Here, we are using the middleware Multer to upload the photo to the server in a folder called `uploads` so we can process it
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

app.post("/image", upload.single("image"), (req, res, next) => {
  console.log(req.body);
  const object = {
    img: {
      data: fs.readFileSync(
        path.join(__dirname + "/uploads/" + req.file.filename)
      ),
      contentType: "image/*",
    },
  };
  console.log(object);
  imageModel.create(object, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      console.log(item);
      item.save();
      res.send(item);
    }
  });
});

// middleware for routes and errors
app.use("/users", usersRouter);
app.use("/pets", petsRouter);
app.use(errors.errorHandler);

// mongoDB connection
mongoose.connect(MONGODB_URI);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log(`Connected to mongoDB at ${MONGODB_URI}`));

app.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
});

// export const stop = () => {
//   app.close(PORT, () => {
//     console.log("Server shut down on port: " + PORT);
//   });
// };
