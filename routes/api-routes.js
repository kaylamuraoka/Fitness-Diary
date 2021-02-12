const db = require("../models");

module.exports = function (app) {
  // --------------------------------------------------------------
  // GET Route that calls workout data from API
  // API is called in the front-end's "getLastWorkout()" function
  app.get("/api/workouts", (req, res) => {
    db.Workout.aggregate([
      {
        $addFields: {
          totalDuration: {
            $sum: "$exercises.duration",
          },
        },
      },
    ])
      .sort({ day: 1 })
      .then((found) => {
        console.log(found);
        res.json(found);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  });

  // --------------------------------------------------------------
  // PUT Route to update workout data
  // API is called in the front-end's "addExercise()" function
  app.put("/api/workouts/:id", (req, res) => {
    db.Workout.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { exercises: req.body } },
      { new: true }
    )
      .then((dbWorkout) => {
        console.log(dbWorkout);
        res.json(dbWorkout);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  });

  // --------------------------------------------------------------
  // POST Route to create a new workout
  // API is called in the front-end's "createWorkout()" function
  app.post("/api/workouts", (req, res) => {
    db.Workout.create(req.body)
      .then((dbWorkout) => {
        console.log(dbWorkout);
        res.json(dbWorkout);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  });

  // --------------------------------------------------------------
  // GET Route to populate workout dashboard
  // API is called in the front-end's "getWorkoutsInRange()" function
  // Range = last 7 days shown on the stats page
  app.get("/api/workouts/range", (req, res) => {
    db.Workout.aggregate([
      {
        $addFields: {
          totalDuration: {
            $sum: "$exercises.duration",
          },
        },
      },
    ])
      .sort({ day: -1 })
      .limit(7)
      .sort({ day: 1 })
      .then((dbWorkout) => {
        console.log(dbWorkout);
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });
};
