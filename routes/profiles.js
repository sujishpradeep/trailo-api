const express = require("express");
const router = express.Router();
const Joi = require("joi");
const UploadController = require("../middleware/upload");

UploadController.setSubFolder("profiles");

const profiles = [
  {
    _id: "P1",
    name: "Sujish Pradeep",
    peaceMarked: ["A1", "A3"],
    bookMarked: ["A2", "A4"],
    place: "Kerala",
    bio: "Passionate about travel, food",
    profilePicPath:
      "uploads/2019-07-31T02:56:46.198Z00100sPORTRAIT_00100_BURST20190609105925214_COVER 2.jpg"
  },

  {
    _id: "P2",
    name: "Amrutha Muraleedharan",
    peaceMarked: ["A3", "A4"],
    bookMarked: ["A3", "A4"],
    place: "Sydney",
    bio: "Passionate about art, cooking",
    profilePicPath: "uploads/amrutha.jpg"
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

//POSTS
router.post("/", UploadController.upload.single("profilepic"), (req, res) => {
  const { error } = validateProfile(req.body);
  console.log("file", req.file);

  //If invalid, return 400 - Bad request
  console.log("req id", req.body._id);
  if (error) return res.status(400).send(error.details[0].message);

  let profile = profiles.find(c => c._id === req.body._id);
  if (profile) return res.status(400).send("Profile already present");
  profile = req.body;
  profile.profilePicPath = req.file.path;
  profiles.push(profile);
  res.send(profile);
});

function validateProfile(profile) {
  schema = {
    _id: Joi.string().required(),
    name: Joi.string().required(),
    peaceMarked: Joi.string().optional(),
    bookMarked: Joi.string().optional(),
    place: Joi.string().optional(),
    bio: Joi.string().optional(),
    profilePicPath: Joi.string().optional()
  };

  return Joi.validate(profile, schema);
}

module.exports = router;
