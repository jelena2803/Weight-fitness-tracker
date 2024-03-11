const mongoose = require("mongoose");

const fitnessSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Users",
    },
    date: String,
    activity: String,
    duration: Number,
  },
  { timestamps: true }
);
const Fitness = mongoose.model("Fitness", fitnessSchema);

module.exports = Fitness;
