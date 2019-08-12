const mongoose = require("mongoose");
const Joi = require("joi");
const trailSchema = require("./trail");
const profileSchema = require("./profile");

const reviewSchema = new mongoose.Schema({
  content: { type: [String], required: true },
  trail: {
    type: trailSchema,
    required: true
  },
  profile: {
    type: profileSchema,
    required: true
  }
});

const Review = mongoose.model("Review", reviewSchema);

function validateReview(review) {
  schema = {
    content: Joi.string()
      .min(5)
      .required()
  };

  return Joi.validate(review, schema);
}

exports.validate = validateReview;
exports.Review = Review;

//Sampple JSON structure
// const reviewCards = [
//   {
//      _id: "R1",
// user_id: "5d438a61616a9926afa57ea7",
// user_name: "Sujish Pradeep",
// trail_id: "A1",
// trail_name: "Skandagiri Hills",
// trail_state: "Karnataka",
// trail_height: "2200",
// profilePicPath: "uploads/profiles/P10/profilepic.jpg",

// content:
//   "First review of Amazing place to visit with family. The place is kids friendly, although one cannot take pets along. "

//   }
// ];
