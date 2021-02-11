const db = require("../models");

module.exports = function (app) {
  // --------------------------------------------------------------
  // GET Route that calls workout data from API
  // API is called in the front-end's "getLastWorkout()" function
  app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });

  // --------------------------------------------------------------
  // PUT Route to update workout data
  // API is called in the front-end's "addExercise()" function
  app.put("/api/workouts/:id", ({ body, params }, res) => {
    db.Workout.findByIdAndUpdate(params.id, { $push: { exercises: body } })
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });

  // --------------------------------------------------------------
  // POST Route to create a new workout
  // API is called in the front-end's "createWorkout()" function
  app.post("/api/workouts", ({ body }, res) => {
    db.create(body)
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });

  // --------------------------------------------------------------
  // GET Route to populate workout dashboard
  // API is called in the front-end's "getWorkoutsInRange()" function
  app.get("/api/workouts/range", (req, res) => {});
};
