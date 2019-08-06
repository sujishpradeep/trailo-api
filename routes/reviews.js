const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Review } = require("../models/review");

//GET REVIEW BY TRAIL
router.get("/trails/:id", async (req, res) => {
  try {
    let review = await Review.find({ trail_id: req.params.id });
    res.send(review);
  } catch (error) {
    console.log("error", error);
  }
});

//GET REVIEW BY PROFILE
router.get("/profile/:id", async (req, res) => {
  try {
    let review = await Review.find({ user_id: req.params.id });
    res.send(review);
  } catch (error) {
    console.log("error", error);
  }
});

//DELETE REVIEW BY REVIEW ID
router.delete("/:id", async (req, res) => {
  try {
    let review = await Review.findByIdAndDelete({ _id: req.params.id });
    res.send(review);
  } catch (error) {
    console.log("error", error);
  }
});

//POSTS
router.post("/", async (req, res) => {
  //const { error } = validateTrail(req.body);

  //If invalid, return 400 - Bad request
  //if (error) return res.status(400).send(error.details[0].message);

  //Validate input, return 400 - Bad request if error
  console.log("req.body", req.body.state);

  review = new Review({
    user_id: req.body.user_id,
    trail_id: req.body.trail_id,
    user_name: req.body.user_name,
    trail_state: req.body.trail_state,
    name: req.body.trail_name,
    trail_height: req.body.trail_height,
    profilePicPath: req.body.profilePicPath,
    content: req.body.content
  });

  console.log("review", review.trail_state);
  try {
    review = await review.save();
    res.send(review);
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  }
});

module.exports = router;
