const mongoose = require("mongoose");

const Users = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: Number,
  gender: String,
  height: Number,
});

const Admin = mongoose.model("Users", Users);

module.exports = Admin;
