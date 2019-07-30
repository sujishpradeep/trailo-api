const express = require("express");
const router = express.Router();
const Joi = require("joi");

const reviewInfoDb = [
  {
    _id: "R1",
    user_id: "P1",
    user_name: "Sujish Pradeep",
    trail_id: "A1",
    trail_name: "Skandagiri Hills",
    trail_state: "Karnataka",
    trail_height: "2200",
    content:
      "First review of Amazing place to visit with family. The place is kids friendly, although one cannot take pets along. "
  },

  {
    _id: "R2",
    user_id: "P2",
    user_name: "Amrutha Muraleedharan",
    trail_id: "A1",
    trail_name: "Skandagiri Hills",
    trail_state: "Karnataka",
    trail_height: "2200",
    content:
      "Second review of Amazing place to visit with family. The place is kids friendly, although one cannot take pets along. "
  },
  {
    _id: "R3",
    user_id: "P1",
    user_name: "Sujish Pradeep",
    trail_id: "A4",
    trail_name: "Kodaikanal",
    trail_state: "Tamil Nadu",
    trail_height: "7700",

    content:
      "Third review of Amazing place to visit with family. The place is kids friendly, although one cannot take pets along. "
  },
  {
    _id: "R6",
    user_id: "P1",
    user_name: "Sujish Pradeep",
    trail_id: "A4",
    trail_name: "Kodaikanal",
    trail_state: "Tamil Nadu",
    trail_height: "7700",

    content:
      "Third review of Amazing place to visit with family. The place is kids friendly, although one cannot take pets along. "
  },
  {
    _id: "R4",
    user_id: "P1",
    user_name: "Sujish Pradeep",
    trail_id: "A4",
    trail_name: "Kodaikanal",
    trail_state: "Tamil Nadu",
    trail_height: "7700",

    content:
      "Third review of Amazing place to visit with family. The place is kids friendly, although one cannot take pets along. "
  },
  {
    _id: "R5",
    user_id: "P1",
    user_name: "Sujish Pradeep",
    trail_id: "A4",
    trail_name: "Kodaikanal",
    trail_state: "Tamil Nadu",
    trail_height: "7700",

    content:
      "Third review of Amazing place to visit with family. The place is kids friendly, although one cannot take pets along. "
  }
];

//GET REVIEW BY TRAIL
router.get("/trails/:id", (req, res) => {
  let reviews = reviewInfoDb.filter(r => r.trail_id === req.params.id) || {};
  res.send(reviews);
});

//GET REVIEW BY PROFILE
router.get("/profile/:id", (req, res) => {
  let review = reviewInfoDb.filter(r => r.user_id === req.params.id) || {};
  res.send(review);
});

//DELETE REVIEW BY ID
router.delete("/:id", (req, res) => {
  //Look up review
  let review = reviewInfoDb.find(r => r._id === req.params.id);

  // If not existing, retun 404
  if (!review)
    return res.status(404).send("The review with given ID not found");

  //Delete
  const index = reviewInfoDb.indexOf(review);
  reviewInfoDb.splice(index, 1);

  res.send(review);
});

module.exports = router;
