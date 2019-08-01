const express = require("express");
const router = express.Router();
const Joi = require("joi");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

const users = [
  {
    username: "P1",
    fullname: "Sujish Pradeep",
    password: "123456",
    peaceMarked: ["A1", "A3"],
    bookMarked: ["A2", "A4"],
    isAdmin: "false",
    profileid: 11111
  }
];

//GET USER BY ID
router.get("/:id", (req, res) => {
  let user = users.find(u => u.username === req.params.id);
  if (!user)
    return res
      .status(404)
      .send("The user with ID " + req.params.id + " not found");
  res.send(user);
});

//SIGNUP - ADD NEW USER AND GENERATE SEND TOKEN
router.post("/", (req, res) => {
  const { error } = validateUser(req.body);

  //If invalid, return 400 - Bad request
  if (error) return res.status(400).send(error.details[0].message);

  let userExists = users.find(u => u.username === req.body.username);
  if (userExists) return res.status(400).send("User already exists");
  const randomID = Math.round(Math.random() * 100000);

  const user = {
    username: req.body.username,
    fullname: req.body.fullname,
    password: req.body.password,
    peaceMarked: [],
    bookMarked: [],
    profileid: randomID
  };
  users.push(user);

  console.log("users", users);

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

  // res.send(user);
});

//LOGIN - CHECK IF USER EXISTS AND POST TOKEN
router.post("/auth/", (req, res) => {
  let userExists = users.find(u => u.username === req.body.username);
  if (!userExists) return res.status(400).send("INVALID USER/PASSWORD");
  console.log("userExists", userExists);
  const token = generateAuthToken(userExists);
  if (userExists) res.send(token);
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

//UPDATE USER PEACE MARKED
router.put("/peace/:id/", (req, res) => {
  let user = users.find(c => c.username === req.params.id);

  // Return error, if not found
  if (!user)
    return res
      .status(404)
      .send("The user with ID " + req.params.id + " not found");

  //Update trail
  user.peaceMarked = req.body;

  res.send(user);
});

//UPDATE USER BOOK MARKED
router.put("/:id/", auth, (req, res) => {
  //Look up user
  let user = users.find(c => c.username === req.params.id);

  // Return error, if not found
  if (!user)
    return res
      .status(404)
      .send("The user with ID " + req.params.id + " not found");
  //Update trail
  user.bookMarked = req.body;

  res.send(user);
});

function validateUser(user) {
  schema = {
    fullname: Joi.string()
      .min(3)
      .required(),
    username: Joi.required(),
    password: Joi.required(),
    isAdmin: Joi.optional()
  };

  return Joi.validate(user, schema);
}

module.exports = router;
