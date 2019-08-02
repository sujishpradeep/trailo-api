const mongoose = require("mongoose");
const Joi = require("joi");

const trailSchema = new mongoose.Schema({
  name: { type: String, required: true },
  state: { type: String, required: true },
  height: { type: Number, required: true },
  publishDate: { type: Date, default: Date.now },
  coverPhotoPath: String,
  peaceCount: Number
});

const Trail = mongoose.model("Trail", trailSchema);

function validateTrail(trail) {
  schema = {
    name: Joi.string()
      .min(3)
      .required(),
    state: Joi.required(),
    height: Joi.required(),
    publishDate: Joi.required(),
    coverPhotoPath: Joi.required(),
    peaceCount: Joi.required()
  };

  return Joi.validate(trail, schema);
}

exports.validate = validateTrail;
exports.Trail = Trail;

//Sampple JSON structure
// const trailCards = [
//   {
//     _id: "A1",
//     name: "Skandagiri hills",
//     state: "Karnataka",
//     height: 2200,
//     publishDate: "2018-01-03T19:04:28.809Z",
//     peaceCount: 214,
//     coverPhotoPath: "uploads/A1.jpeg"
//   }
// ];
