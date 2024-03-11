const express = require("express");
const app = express();
app.use(express.json());
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
app.use(cors({ origin: true, credentials: true }));
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const adminController = require("./controllers/adminController");
const fitnessController = require("./controllers/fitnessController");
const weightController = require("./controllers/weightController");

main()
  .then(() => console.log("DB connected successfully"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.URL);
}

// get all fitness data
app.get("/fitness", async (req, res) => {
  try {
    console.log(req);
    const allActivities = await Fitness.find().sort({ createdAt: -1 });
    res.send(allActivities);
    console.log("get fitness passed");
  } catch (error) {
    // Handle any errors that may occur during the creation process
    res.status(500).json({ error: "Failed to get activities" });
    console.log(error);
  }
});

// get all users
app.get("/", async (req, res) => {
  try {
    const allUsers = await Admin.find({});
    res.send(allUsers);
  } catch (error) {
    // Handle any errors that may occur during the creation process
    res.status(500).json({ error: "Failed to fetch all users" });
  }
});

// new user upon signup
app.post("/", adminController.signup);

//add more info of the new user when signup initiated with email and password
app.put("/newprofile/:id", adminController.completeProfile);

// show all the user's profile when profile is completed
app.get("/newprofile/:id", adminController.getFullProfile);

// app.get("/profile/:id", async (req, res) => {
//   let userId = req.params.id;
//   let user = await Users.find(userId);
//   res.send(user);
// });

app.post("/login", adminController.login);

// render all weight logs
app.get("/weight", async (req, res) => {
  const allWeightLogs = await Weight.find().sort({ createdAt: -1 });
  console.log("weight requested in back");
  res.send(allWeightLogs);
});

// render all weight logs
app.get("/fitness", async (req, res) => {
  const allActivities = await Fitness.find().sort({ createdAt: -1 });
  res.send(allActivities);
});

// render all user's saved weight logs
// app.get("/weight/:id", (req, res) => {
//   res.send("test weight");
// });

// add a new weight log
app.post("/weight", async (req, res) => {
  try {
    // create new user weight in db
    const newWeight = await Weight.create(req.body);
    // Return the new weight log
    res.send(newWeight);
  } catch (error) {
    // Handle any errors that may occur during the creation process
    res.status(500).json({ error: "Failed to create a new activity" });
  }
});

// add a new user's weight log
// app.post("/weight/:id", (req, res) => {
//   res.send("test new weight");
// });

// render all user's saved fitness activities logs
// app.get("/fitness/:myId", async (req, res) => {
//   let myFitness = await Fitness.find({ userId: req.params.myId });
//   res.send("test fitness activities");
// });

// add a new user's fitness activity log
// app.post("/fitness/:id", (req, res) => {
//   res.send("test new fitness activity");
// });

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
