const express = require("express");
const router = express.Router();
const Joi = require("joi");

const profiles = [
  {
    _id: "P1",
    name: "Sujish Pradeep",
    peaceMarked: ["A1", "A3"],
    bookMarked: ["A2", "A4"],
    place: "Kerala",
    bio: "Passionate about travel, food"
  },

  {
    _id: "P2",
    name: "Amrutha Muraleedharan",
    peaceMarked: ["A3", "A4"],
    bookMarked: ["A3", "A4"],
    place: "Sydney",
    bio: "Passionate about art, cooking"
  }
];

//GET ALL
router.get("/", (req, res) => {
  res.send(profiles);
});

//GET ID
router.get("/:id", (req, res) => {
  let profile = profiles.find(c => c._id === req.params.id);

  if (!profile)
    return res
      .status(404)
      .send("The profile with ID " + req.params.id + " not found");

  res.send(profile);
});

//PUT
router.put("/peace/:id/", (req, res) => {
  let profile = profiles.find(c => c._id === req.params.id);

  // Return error, if not found
  if (!profile)
    return res
      .status(404)
      .send("The profile with ID " + req.params.id + " not found");

  //Update course
  profile.peaceMarked = req.body;

  res.send(profile);
});

//PUT
router.put("/:id/", (req, res) => {
  //Look up profile
  let profile = profiles.find(c => c._id === req.params.id);

  // Return error, if not found
  if (!profile)
    return res
      .status(404)
      .send("The profile with ID " + req.params.id + " not found");
  //Update course
  profile.bookMarked = req.body;

  res.send(profile);
});

module.exports = router;
