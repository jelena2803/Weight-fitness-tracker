const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");

async function requireAuth(req, res, next) {
  try {
    //Read token off cookies
    const token = req.cookies.Authorization;
    //Decode the token
    const decoded = jwt.verify(token, process.env.SECRET);
    //Check cookie's expiration
    if (Date.now() > decoded.exp) {
      return res.sendStatus(401);
    }
    //Find admin using the decoded sub
    const admin = await Admin.findById(decoded.sub);
    if (!admin) return res.sendStatus(401);
    //Attach admin to request
    if (admin) {
      req.admin = admin;
    }
    //proceed
    next();
  } catch (err) {
    return res.sendStatus(401);
  }
}

function validateToken(req, res, next) {
  // check if the user has a valid token and if it valid
  const authHeader = req.headers.authorization;
  // console.log(authHeader);
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    // var result = jwt.verify(token, process.env.SECRET);
    console.log("hi", token);
    jwt.verify(token, process.env.SECRET, (err, result) => {
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

module.exports = validateToken;
