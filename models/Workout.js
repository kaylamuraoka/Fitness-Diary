const mongoose = require("mongoose");

// Mongoose Schema
const Schema = mongoose.Schema;

// Create a new  workout schema
const WorkoutSchema = new Schema({
  day: { type: Date, default: Date.now },
  exercises: [
    {
      type: {
        type: String,
        required: "Enter your exercise type",
      },
      name: {
        type: String,
        required: "Enter your exercise name",
      },
      duration: {
        type: Number,
        required: "Enter your exercise duration in minutes",
      },
      weight: {
        type: Number,
      },
      reps: {
        type: Number,
      },
      sets: {
        type: Number,
      },
      distance: {
        type: Number,
      },
    },
  ],
});

// Create mongoose model 'Workout' and apply workout schema to that model
const Workout = mongoose.model("Workout", WorkoutSchema);

// Export workout model
module.exports = Workout;
