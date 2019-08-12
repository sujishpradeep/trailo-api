const express = require("express");
const router = express.Router();
const UploadController = require("../middleware/upload");
UploadController.setSubFolder("profiles");
const { Profile, validate } = require("../models/profile");
var ObjectId = require("mongoose").Types.ObjectId;
const { Review } = require("../models/review");

//POSTS
router.post(
  "/",
  UploadController.upload.single("profilepic"),
  async (req, res) => {
    //Validate input, return 400 - Bad request if error
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    profile = new Profile({
      name: req.body.name,
      place: req.body.place,
      bio: req.body.bio,
      profilePicPath: req.file.path
    });

    try {
      profile = await profile.save();
      res.send(profile);
    } catch (error) {
      res.status(404).send(error.message);
    }
  }
);

//GET ALL
router.get("/", async (req, res) => {
  const profiles = await Profile.find();

  res.send(profiles);
});

//GET ID
router.get("/:id", async (req, res) => {
  let profile = await Profile.findById(req.params.id);

  if (!profile)
    return res
      .status(404)
      .send("The profile with ID " + req.params.id + " not found");

  res.send(profile);
});

//PUT
router.put(
  "/:id",
  UploadController.upload.single("profilepic"),
  async (req, res) => {
    try {
      profile = await Profile.findByIdAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            //       name: req.body.name,
            place: req.body.place,
            bio: req.body.bio,
            profilePicPath: req.file.path
          }
        },
        { new: true }
      );

      try {
        let review = await Review.updateMany(
          {
            "profile._id": new ObjectId(profile._id)
          },
          {
            $set: {
              "profile.profilePicPath": req.file.path
            }
          }
        );
      } catch (error) {
        console.log("error", error);
      }

      res.send(profile);
    } catch (ex) {
      return res.status(404).send("ID not found");
    }
  }
);

//UPDATE PROFILE DATA
router.put("/data/:id", async (req, res) => {
  try {
    profile = await Profile.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          //      name: req.body.name,
          place: req.body.place,
          bio: req.body.bio
        }
      },
      { new: true }
    );
    res.send(profile);
  } catch (ex) {
    console.log(ex);
    return res
      .status(404)
      .send("The profile with ID " + req.params.id + " not found");
  }
});

//REMOVE
router.delete("/:id", async (req, res) => {
  try {
    const profile = await Profile.findByIdAndRemove({ _id: req.params.id });
    res.send(profile);
  } catch (error) {
    return res.status(404).send("ID not found");
  }
});

module.exports = router;
