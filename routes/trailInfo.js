const express = require("express");
const router = express.Router();
const Joi = require("joi");

const trailCards = [
  {
    _id: "A1",
    name: "Skandagiri hills",
    state: "Karnataka",
    height: 2200,
    publishDate: "2018-01-03T19:04:28.809Z",
    coverPhoto: "/images/skandagiri.jpeg",
    coverPhotoUploader: "Sujish",
    peaceCount: 214
  },

  {
    _id: "A2",
    name: "Thekkadi trek",
    state: "Kerala",
    height: 4350,
    publishDate: "2018-01-03T19:04:28.809Z",
    coverPhoto: "/images/thekkadi.jpeg",
    coverPhotoUploader: "Amrutha",
    peaceCount: 315
  },

  {
    _id: "A3",
    name: "Ziro",
    state: "Arunachal",
    height: 5500,
    publishDate: "2018-01-03T19:04:28.809Z",
    coverPhoto: "/images/ziro.jpeg",
    coverPhotoUploader: "Kiran",
    peaceCount: 450
  },

  {
    _id: "A4",
    name: "Kodaikanal",
    state: "Tamil Nadu",
    height: 7700,
    publishDate: "2018-01-03T19:04:28.809Z",
    coverPhoto: "/images/kodai.jpeg",
    coverPhotoUploader: "Raihan",
    peaceCount: 157
  }
];

//GET
router.get("/", (req, res) => {
  res.send(trailCards);
});

//GET ID
router.get("/:id", (req, res) => {
  let trailCard = trailCards.find(c => c._id === req.params.id);

  if (!trailCard)
    return res
      .status(404)
      .send("The trail with ID " + req.params.id + " not found");

  res.send(trailCard);
});

//POSTS
router.post("/", (req, res) => {
  const { error } = validateTrail(req.body);

  //If invalid, return 400 - Bad request
  if (error) return res.status(400).send(error.details[0].message);

  const trailCard = {
    _id: req.body._id,
    name: req.body.name,
    state: req.body.state,
    height: req.body.height,
    publishDate: req.body.publishDate,
    coverPhoto: req.body.coverPhoto,
    coverPhotoUploader: req.body.coverPhotoUploader,
    peaceCount: req.body.peaceCount
  };
  trailCards.push(trailCard);
  res.send(trailCard);
});

//PUT
router.put("/peace/:id", (req, res) => {
  let trailCard = trailCards.find(c => c._id === req.params.id);

  // Return error, if not found
  if (!trailCard)
    return res
      .status(404)
      .send("The trail with ID " + req.params.id + " not found");

  trailCard.peaceCount += req.body.counter;
  res.send(trailCard);
});

function validateTrail(trail) {
  schema = {
    name: Joi.string()
      .min(3)
      .required(),
    _id: Joi.required(),
    state: Joi.required(),
    height: Joi.required(),
    publishDate: Joi.required(),
    coverPhoto: Joi.required(),
    coverPhotoUploader: Joi.required(),
    peaceCount: Joi.required()
  };

  return Joi.validate(trail, schema);
}
module.exports = router;
