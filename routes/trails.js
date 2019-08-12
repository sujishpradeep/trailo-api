const express = require("express");
const router = express.Router();
const { Trail } = require("../models/trail");

//GET ALL TRAILS
router.get("/", async (req, res) => {
  res.send(await Trail.find());
});

//GET TRAIL BY ID
router.get("/:id", async (req, res) => {
  try {
    let trail = await Trail.findOne({ _id: req.params.id });
    if (!trail)
      return res
        .status(404)
        .send("The trail with ID " + req.params.id + " not found");
    res.send(trail);
  } catch (ex) {
    console.log(ex);
  }
});

//UPDATE TRAIL PEACE
router.put("/peace/:id", async (req, res) => {
  try {
    trail = await Trail.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          peaceCount: req.body.counter
        }
      },
      { new: true }
    );
    res.send(trail);
  } catch (ex) {
    console.log(ex);
    return res
      .status(404)
      .send("The trail with ID " + req.params.id + " not found");
  }
});

module.exports = router;

// //POST TRAIL
// router.post("/", UploadController.upload.single("trailImage"), (req, res) => {
//   const { error } = validateTrail(req.body);

//   //If invalid, return 400 - Bad request
//   if (error) return res.status(400).send(error.details[0].message);

//   const trailCard = {
//     name: req.body.name,
//     state: req.body.state,
//     height: req.body.height,
//     coverPhotoPath: req.body.coverPhoto,
//     coverPhotoUploader: req.body.coverPhotoUploader,
//     peaceCount: req.body.peaceCount
//   };
//   trailCards.push(trailCard);
//   res.send(trailCard);
// });
