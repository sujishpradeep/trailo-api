const express = require("express");
const router = express.Router();
const { Review } = require("../models/review");
const { Trail } = require("../models/trail");
const { Profile } = require("../models/profile");
var ObjectId = require("mongoose").Types.ObjectId;

//GET REVIEW BY TRAIL
router.get("/trails/:id", async (req, res) => {
  try {
    let review = await Review.find({
      "trail._id": new ObjectId(req.params.id)
    });
    res.send(review);
  } catch (error) {
    console.log("error", error);
  }
});

//GET REVIEW BY PROFILE
router.get("/profile/:id", async (req, res) => {
  try {
    let review = await Review.find({
      "profile._id": new ObjectId(req.params.id)
    });
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

  const trail = await Trail.findById(req.body.trailId);
  if (!trail) return res.status(400).send("Invalid trail.");

  const profile = await Profile.findById(req.body.profileId);
  if (!profile) return res.status(400).send("Invalid Profile.");

  //Validate input, return 400 - Bad request if error

  review = new Review({
    content: req.body.content,
    trail: {
      _id: trail._id,
      name: trail.name,
      state: trail.state,
      height: trail.height,
      coverPhotoPath: trail.coverPhotoPath
    },
    profile: {
      _id: profile._id,
      name: profile.name,
      profilePicPath: profile.profilePicPath
    }
  });
  try {
    review = await review.save();
    res.send(review);
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  }
});

module.exports = router;
