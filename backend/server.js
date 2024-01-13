const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

main()
  .then(() => console.log("DB connected successfully"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.URL);
}

const Users = mongoose.model("Users", {
  username: String,
  password: String,
  age: Number,
  gender: String,
  height: Number,
});

const Weight = mongoose.model("Weight", {
  // userId: {
  //   type: mongoose.SchemaTypes.ObjectId,
  //   ref: "Users",
  // },
  date: { type: Date, default: Date.now },
  weight: Number,
  BMI: Number,
});

const Fitness = mongoose.model("Fitness", {
  // userId: {
  //   type: mongoose.SchemaTypes.ObjectId,
  //   ref: "Users",
  // },
  date: { type: Date, default: Date.now },
  activity: String,
  duration: Number,
});

// get all users
app.get("/", async (req, res) => {
  try {
    const allUsers = await Users.find({});
    res.send(allUsers);
  } catch (error) {
    // Handle any errors that may occur during the creation process
    res.status(500).json({ error: "Failed to create a new todo" });
  }
});

// new user upon signup
app.post("/", async (req, res) => {
  try {
    // check if both username and password are sent
    if (!req.body.username || !req.body.password) {
      res.send({ msg: "please fill the missing data uf the user" });
    }

    // check if the same username already exists in th db, if not, create new user in db
    const checkUser = await Users.findOne({ username: req.body.username });
    if (checkUser !== null) {
      res.send("username already exists, you need to use different username");
    } else {
      let newUser = await Users.create(req.body);
      // Return the new user
      res.send(newUser);
    }
  } catch (error) {
    // Handle any errors that may occur during the creation process
    res.status(500).json({ error: "Failed to create a new todo" });
  }
});

//add more info of the new user when signup initiated with email and password
app.put("/newprofile/:id", async (req, res) => {
  try {
    const updatedNewUser = await Users.findOneAndUpdate(
      { _id: req.params.id },
      req.body
      // req.body.status == "pending" ? "done" : req.body.status
    );
    // Return the message if todo is updated successfully
    res.send(Users);
  } catch (error) {
    // Handle any errors that may occur during the creation process
    res.status(500).json({ error: "Failed to update a new user" });
  }
});

// show all the user's profile when profile is completed
app.get("/newprofile", (req, res) => {
  res.send("test newprofile");
});

app.get("/profile/:id", async (req, res) => {
  let userId = req.params.id;
  let user = await Users.find(userId);
  res.send(user);
});

// log in process request
app.post("/login", async (req, res) => {
  try {
    // check if both username and password are sent
    if (!req.body.username || !req.body.password) {
      res.send({ msg: "please fill the missing data uf the user" });
    }

    // check if the username is correct
    let user = await Users.findOne({ username: req.body.username });
    if (user === null) {
      res.send({ msg: "wrong username" });
    } else {
      if (user.password === req.body.password) {
        res.send({ msg: true });
      } else {
        res.send({ msg: false });
      }
    }
  } catch (error) {
    // Handle any errors that may occur during the creation process
    res.status(500).json({ error: "Failed to create a new todo" });
  }
});

// render all user's saved weight logs
app.get("/weight/:id", (req, res) => {
  res.send("test weight");
});

// add a new user's weight log
app.post("/weight/:id", (req, res) => {
  res.send("test new weight");
});

// render all user's saved fitness activities logs
app.get("/fitness/:myId", async (req, res) => {
  let myFitness = await Fitness.find({ userId: req.params.myId });
  res.send("test fitness activities");
});

// add a new user's fitness activity log
app.post("/fitness/:id", (req, res) => {
  res.send("test new fitness activity");
});

// test post new fitness
app.post("/fitness", async (req, res) => {
  try {
    // create new user in db
    const newActivity = await Fitness.create(req.body);

    // Return the new user
    res.send(newActivity);
  } catch (error) {
    // Handle any errors that may occur during the creation process
    res.status(500).json({ error: "Failed to create a new activity" });
  }
});

app.listen(3636, () => {
  console.log("server is running on 3636");
});