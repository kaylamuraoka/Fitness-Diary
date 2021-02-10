// DEPENDENCIES - requiring necessary npm packages
const express = require("express");
const { Mongoose } = require("mongoose");
const logger = require("morgan");

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 5000;

// creating express app
const app = express();

// MIDDLEWARE - configuring middleware needed
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// MONGODB CONNECTION
Mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
});

// ROUTES
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// LISTENER
app.listen(PORT, () => {
  console.log(
    `App listening on port ${PORT}. Visit http://localhost:${PORT} in your browser.`
  );
});
