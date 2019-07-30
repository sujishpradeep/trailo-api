const express = require("express");
const router = express.Router();
const Joi = require("joi");
const _ = require("lodash");
const jwt = require("jsonwebtoken");

const users = [
  {
    username: "P1",
    fullname: "Sujish Pradeep",
    password: "123456",
    isAdmin: "false"
  },

  {
    username: "P1",
    fullname: "Sujish Pradeep",
    password: "123456",
    isAdmin: "false"
  },
  {
    username: "TEST",
    fullname: "Sujish Pradeep",
    password: "123456",
    isAdmin: "false"
  }
];

//GET ID
router.get("/:id", (req, res) => {
  let user = users.find(u => u.username === req.params.id);
  if (!user)
    return res
      .status(404)
      .send("The user with ID " + req.params.id + " not found");
  res.send(user);
});

//POSTS
router.post("/", (req, res) => {
  console.log("req.body", req.body);
  const { error } = validateUser(req.body);

  //If invalid, return 400 - Bad request
  if (error) return res.status(400).send(error.details[0].message);

  let userExists = users.find(u => u.username === req.body.username);
  if (userExists) return res.status(400).send("User already exists");

  const user = {
    username: req.body.username,
    fullname: req.body.fullname,
    password: req.body.password
  };
  users.push(user);

  const token = generateAuthToken(user);
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["username", "fullname"]));
  // res.send(user);
});

//POSTS
router.post("/auth/", (req, res) => {
  let userExists = users.find(u => u.username === req.body.username);
  if (!userExists) return res.status(400).send("INVALID USER/PASSWORD");
  const token = generateAuthToken(userExists);
  if (userExists) res.send(token);
});

generateAuthToken = function(user) {
  const token = jwt.sign(
    {
      username: user.username,
      fullname: user.fullname,
      email: user.email,
      isAdmin: user.isAdmin
    },
    "vidly_jwtPrivateKey"
  );
  return token;
};

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
