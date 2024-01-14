const express = require("express");
const app = express();
app.use(express.json());
const bcrypt = require("bcrypt");
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

const fitnessSchema = mongoose.Schema(
  {
    // userId: {
    //   type: mongoose.SchemaTypes.ObjectId,
    //   ref: "Users",
    // },
    date: { type: Date, default: Date.now },
    activity: String,
    duration: Number,
  },
  { timestamps: true }
);
const Fitness = mongoose.model("Fitness", fitnessSchema);

// get all fitness data
app.get("/fitness", async (req, res) => {
  try {
    const allActivities = await Fitness.find().sort({ createdAt: -1 });
    res.send(allActivities);
  } catch (error) {
    // Handle any errors that may occur during the creation process
    res.status(500).json({ error: "Failed to get activities" });
  }
});

// get all users
app.get("/", async (req, res) => {
  try {
    const allUsers = await Users.find({});
    res.send(allUsers);
  } catch (error) {
    // Handle any errors that may occur during the creation process
    res.status(500).json({ error: "Failed to fetch all users" });
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
      // hash the password with bcrypt
      bcrypt.hash(req.body.password, 10, async (err, hash) => {
        let newUser = {
          username: req.body.username,
          password: hash,
        };
        await Users.create(newUser);
        res.send({ msg: "user created successfully" });
      });
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
    // Return the message if user is updated successfully
    const updatedNewUserFinal = await Users.findOne({ _id: req.params.id });
    res.send(updatedNewUserFinal);
  } catch (error) {
    // Handle any errors that may occur during the creation process
    res.status(500).json({ error: "Failed to update a new user" });
  }
});

// show all the user's profile when profile is completed
app.get("/newprofile/:id", async (req, res) => {
  const userProfileCompleted = await Users.findOne({ _id: req.params.id });
  res.send(userProfileCompleted);
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
      // if username exists, we check the password
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result) {
          res.send({ msg: true });
        } else {
          res.send({ msg: false });
        }
      });
    }
  } catch (error) {
    // Handle any errors that may occur during the creation process
    res.status(500).json({ error: "Failed to create a new todo" });
  }
});

// render all weight logs
app.get("/weight", async (req, res) => {
  const allWeightLogs = await Weight.find().sort({ date: -1 });
  res.send(allWeightLogs);
});

// render all weight logs
app.get("/fitness", async (req, res) => {
  const allActivities = await Fitness.find();
  res.send(allActivities);
});

// render all user's saved weight logs
app.get("/weight/:id", (req, res) => {
  res.send("test weight");
});

// add a new weight log
app.post("/weight", async (req, res) => {
  const newWeight = await Weight.create(req.body);
  res.send({ msg: "new weight log added" });
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
