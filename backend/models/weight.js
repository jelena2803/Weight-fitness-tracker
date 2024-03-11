const mongoose = require("mongoose");

const weightSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Users",
    },
    date: String,
    weight: Number,
    BMI: Number,
  },
  { timestamps: true }
);

const Weight = mongoose.model("Weight", weightSchema);

module.exports = Weight;
