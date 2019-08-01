const express = require("express");
const router = express.Router();
const Joi = require("joi");

const reviews = [
  {
    _id: "R1",
    user_id: "P10",
    user_name: "Sujish Pradeep",
    trail_id: "A1",
    trail_name: "Skandagiri Hills",
    trail_state: "Karnataka",
    trail_height: "2200",
    profilePicPath: "uploads/profiles/P10/profilepic.jpg",

    content:
      "First review of Amazing place to visit with family. The place is kids friendly, although one cannot take pets along. "
  },

  {
    _id: "R2",
    user_id: "P20",
    user_name: "Amrutha Muraleedharan",
    trail_id: "A1",
    trail_name: "Skandagiri Hills",
    trail_state: "Karnataka",
    trail_height: "2200",
    profilePicPath: "uploads/profiles/P20/profilepic.jpg",
    content:
      "Second review of Amazing place to visit with family. The place is kids friendly, although one cannot take pets along. "
  },
  {
    _id: "R3",
    user_id: "P10",
    user_name: "Sujish Pradeep",
    trail_id: "A4",
    trail_name: "Kodaikanal",
    trail_state: "Tamil Nadu",
    trail_height: "7700",
    profilePicPath: "uploads/profiles/P10/profilepic.jpg",
    content:
      "Third review of Amazing place to visit with family. The place is kids friendly, although one cannot take pets along. "
  }
];

//GET REVIEW BY TRAIL
router.get("/trails/:id", (req, res) => {
  let review = reviews.filter(r => r.trail_id === req.params.id) || {};
  res.send(review);
});

//GET REVIEW BY PROFILE
router.get("/profile/:id", (req, res) => {
  let review = reviews.filter(r => r.user_id === req.params.id) || {};
  res.send(review);
});

//DELETE REVIEW BY REVIEW ID
router.delete("/:id", (req, res) => {
  //Look up review
  let review = reviews.find(r => r._id === req.params.id);

  // If not existing, retun 404
  if (!review)
    return res.status(404).send("The review with given ID not found");

  //Delete
  const index = reviews.indexOf(review);
  reviews.splice(index, 1);

  res.send(review);
});

//POSTS
router.post("/", (req, res) => {
  //const { error } = validateTrail(req.body);

  //If invalid, return 400 - Bad request
  //if (error) return res.status(400).send(error.details[0].message);

  const review = req.body;
  reviews.push(review);
  res.send(review);
});

module.exports = router;
