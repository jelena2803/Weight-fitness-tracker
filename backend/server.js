const express = require("express");
const app = express();
app.use(express.json());
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

const weightSchema = mongoose.Schema(
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

const fitnessSchema = mongoose.Schema(
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

function validateToken(req, res, next) {
  // check if the user has a valid token and if it valid
  const authHeader = req.headers.authorization;
  // console.log(authHeader);
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    // var result = jwt.verify(token, "tracker");
    console.log("hi", token);
    jwt.verify(token, "tracker", (err, result) => {
      if (err) {
        res.status(401).json({ msg: "you are not authorized to this request" });
      } else {
        console.log("this is ", result);
        next();
      }
    });
  } else {
    res.status(401).json({ msg: "token not found" });
  }

  // const authHeader = req.headers.authorization;
  // console.log(authHeader);

  // if (authHeader) {
  //   const token = authHeader.split(" ")[1];

  //   try {
  //     const decoded = jwt.verify(token, "tracker");
  //     req.user = decoded; // The decoded payload will be available in req.user

  //     next();
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(403).json({ error: "Failed to authenticate token." });
  //   }
  // } else {
  //   res.status(401).json({ error: "No token provided." });
  // }
}

// get all fitness data
app.get("/fitness", async (req, res) => {
  try {
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
      res.send({ msg: "please fill the missing data of the user" });
    }
    // check if the same username already exists in th db, if not, create new user in db
    const checkUser = await Users.findOne({ username: req.body.username });
    if (checkUser !== null) {
      res.send({
        msg: "username already exists, you need to use different username",
      });
    } else {
      // hash the password with bcrypt
      bcrypt.hash(req.body.password, 10, async (err, hash) => {
        let newUser = {
          username: req.body.username,
          password: hash,
          age: req.body.age,
          gender: req.body.gender,
          height: req.body.height,
        };
        await Users.create(newUser);
        res.send({ msg: "user created successfully" });
      });
    }
  } catch (error) {
    // Handle any errors that may occur during the creation process
    res.status(500).json({ error: "Failed to create a new user" });
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

// app.get("/profile/:id", async (req, res) => {
//   let userId = req.params.id;
//   let user = await Users.find(userId);
//   res.send(user);
// });

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
      res.send({ msg: "Wrong username, enter again your username" });
    } else {
      // if username exists, we check the password
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result) {
          var token = jwt.sign({ id: user._id }, "tracker");
          res.send({ user: user, token: token });
        } else {
          res.send({ msg: "Wrong password, enter again your password" });
        }
      });
    }
  } catch (error) {
    // Handle any errors that may occur during the creation process
    res.status(500).json({ error: "Failed to create a new user" });
  }
});

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
