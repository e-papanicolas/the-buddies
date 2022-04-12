const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 5000;
const errors = require("./utils/errorHandler");
const usersRouter = require("./routes/UserRoutes");

// middleware for parsing requests
app.use(cors());
app.use(bodyParser.json());

// middleware for routes and errors
app.use("/users", usersRouter);
app.use(errors.errorHandler);

// mongoDB connection
const uri =
  "mongodb+srv://eleni_papanicolas:yRXgWBON1n6eJlcLbCBi@cluster0.3quwk.mongodb.net/cat-track?retryWrites=true&w=majority";
mongoose.connect(uri);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log(`Connected to mongoDB at ${uri}`));

app.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
});
