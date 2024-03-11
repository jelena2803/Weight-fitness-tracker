const mongoose = require("mongoose");
const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// get admin's data
const getAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOne({ _id: req.admin._id });
    if (!admin) {
      return res.status(404).json({ msg: "Admin not found" });
    }
    res.status(200).json({ admin });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// log in process request
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // check if both username and password are sent
    if (!username || !password) {
      res.send({ msg: "please fill the missing data uf the user" });
    }

    // check if the username is correct
    let user = await Admin.findOne({ username: username });
    if (user === null) {
      res.send({ msg: "Wrong username, enter again your username" });
    } else {
      // if username exists, we check the password
      const passwordMatch = bcrypt.compareSync(password, user.password);
      if (passwordMatch) {
        var token = jwt.sign({ sub: user._id }, process.env.SECRET);
        res.json({ user, token });
      } else {
        res.send({ msg: "Wrong password, enter again your password" });
      }
    }
  } catch (error) {
    // Handle any errors that may occur during the creation process
    res.status(500).json({ error: "Failed to create a new user" });
  }
};

// new user upon signup
const signup = async (req, res) => {
  try {
    const { username, password, age, gender, height } = req.body;
    // check if both username and password are sent
    if (!username || !password) {
      res.send({ msg: "please fill the missing data of the user" });
    }
    // check if the same username already exists in th db, if not, create new user in db
    const checkUser = await Admin.findOne({ username: username });
    if (checkUser !== null) {
      res.send({
        msg: "username already exists, you need to use different username",
      });
    } else {
      // hash the password with bcrypt
      bcrypt.hash(password, 10, async (err, hash) => {
        let newUser = {
          username: username,
          password: hash,
          age: age,
          gender: gender,
          height: height,
        };
        await Admin.create(newUser);
        res.send({ msg: "user created successfully" });
      });
    }
  } catch (error) {
    // Handle any errors that may occur during the creation process
    res.status(500).json({ error: "Failed to create a new user" });
  }
};

//add more info of the new user when signup initiated with email and password
const completeProfile = async (req, res) => {
  try {
    const updatedNewUser = await Admin.findOneAndUpdate(
      { _id: req.params.id },
      req.body
      // req.body.status == "pending" ? "done" : req.body.status
    );
    // Return the message if user is updated successfully
    const updatedNewUserFinal = await Admin.findOne({ _id: req.params.id });
    res.send(updatedNewUserFinal);
  } catch (error) {
    // Handle any errors that may occur during the creation process
    res.status(500).json({ error: "Failed to update a new user" });
  }
};

// show all the user's profile when profile is completed
const getFullProfile = async (req, res) => {
  const userProfileCompleted = await Admin.findOne({ _id: req.params.id });
  res.send(userProfileCompleted);
};

module.exports = {
  login,
  signup,
  completeProfile,
  getFullProfile,
};
