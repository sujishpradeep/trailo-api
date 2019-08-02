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

  const review = req.body;
  reviews.push(review);
  res.send(review);
});

module.exports = router;
