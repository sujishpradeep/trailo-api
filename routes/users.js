const express = require("express");
const router = express.Router();
const Joi = require("joi");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const { User, validate } = require("../models/user");
const { Profile } = require("../models/profile");
const bcrypt = require("bcrypt");

//GET USER BY ID
router.get("/:id", async (req, res) => {
  try {
    let user = await User.findOne({ username: req.params.id });
    if (!user)
      return res
        .status(404)
        .send("The user with ID " + req.params.id + " is not found");
    res.send(user);
  } catch (error) {
    res.send(error.message);
  }
});

//SIGNUP - ADD NEW USER AND GENERATE SEND TOKEN
router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  //If invalid, return 400 - Bad request
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let user = await User.findOne({ username: req.body.username });

    if (user) return res.status(400).send("User already reigstered");

    profile = new Profile({
      name: req.body.fullname
    });

    console.log("req.body.password", req.body.password);
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);
    console.log("hashed", hashed);

    profile = await profile.save();
    console.log("profile", profile);

    user = new User({
      username: req.body.username,
      fullname: req.body.fullname,
      password: hashed,
      peaceMarked: [],
      bookMarked: [],
      profileid: profile._id
    });
    user = await user.save();

    const token = generateAuthToken(user);

    res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send(
        _.pick(user, [
          "username",
          "fullname",
          "peaceMarked",
          "bookMarked",
          "profileid"
        ])
      );
  } catch (error) {
    console.log(error.message);
    res.status(404).send(error.message);
  }
});

//LOGIN - VERIFY USER NAME AND PASSWORD AND POST TOKEN
router.post("/auth/", async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).send("INVALID USER/PASSWORD");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return res.status(400).send("INVALID USER/PASSWORD");

    const token = generateAuthToken(user);
    res.send(token);
  } catch (error) {
    console.log("error", error);
  }
});

//UPDATE USER PEACE MARKED
router.put("/peace/:id/", async (req, res) => {
  try {
    user = await User.findOneAndUpdate(
      { username: req.params.id },
      {
        $set: {
          peaceMarked: req.body
        }
      },
      { new: true }
    );
    res.send(user);
  } catch (ex) {
    return res
      .status(404)
      .send("The user with ID " + req.params.id + " not found");
  }
});

//UPDATE USER BOOK MARKED
router.put("/:id/", auth, async (req, res) => {
  try {
    user = await User.findOneAndUpdate(
      { username: req.params.id },
      {
        $set: {
          bookMarked: req.body
        }
      },
      { new: true }
    );
    res.send(user);
  } catch (ex) {
    return res
      .status(404)
      .send("The user with ID " + req.params.id + " not found");
  }
});

generateAuthToken = function(user) {
  const token = jwt.sign(
    {
      username: user.username,
      fullname: user.fullname,
      email: user.email,
      isAdmin: user.isAdmin,
      peaceMarked: user.peaceMarked,
      bookMarked: user.bookMarked,
      profileid: user.profileid
    },
    "vidly_jwtPrivateKey"
  );
  return token;
};
module.exports = router;
