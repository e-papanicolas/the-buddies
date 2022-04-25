const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const errors = require("./utils/errorHandler");
const usersRouter = require("./routes/UserRoutes");
const petsRouter = require("./routes/PetRoutes");

// middleware for parsing requests
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(cookieParser());

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
