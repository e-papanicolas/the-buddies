const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const auth = require("./helpers/jwt.js");
const unless = require("express-unless");
const users = require("./controllers/UserController.js");
const errors = require("../api/utils/errorHandler.js");

// middleware for authenticating token submitted with requests
auth.authenticateToken.unless = unless;
app.use(
  auth.authenticateToken.unless({
    path: [
      { url: "/users/login", methods: ["POST"] },
      { url: "/users/register", methods: ["POST"] },
    ],
  })
);

app.use(cors());
app.use(express.json()); // middleware for parsing application/json
app.use("/users", users); // middleware for listening to routes
app.use(errors.errorHandler); // middleware for error responses

// MongoDB connection, success and error event responses
const uri =
  "mongodb+srv://eleni_papanicolas:yRXgWBON1n6eJlcLbCBi@cluster0.3quwk.mongodb.net/cat-track?retryWrites=true&w=majority";
mongoose.connect(uri);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log(`Connected to mongo at ${uri}`));

app.listen(3002);

// const { MongoClient } = require("mongodb");
// const Db = process.env.ATLAS_URI;
// const client = new MongoClient(Db, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// var _db;

// module.exports = {
//   connectToServer: function (callback) {
//     client.connect(function (err, db) {
//       // Verify we got a good "db" object
//       if (db) {
//         _db = db.db("cat-track");
//         console.log("Successfully connected to MongoDB.");
//       }
//       return callback(err);
//     });
//   },

//   getDb: function () {
//     return _db;
//   },
// };
