const mongoose = require("mongoose");
const Joi = require("joi");

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  place: String,
  bio: String,
  profilePicPath: { type: String, default: "uploads/default/profilepic.jpg" },
  date: { type: Date, default: Date.now }
});

const Profile = mongoose.model("Profile", profileSchema);

function validateProfile(profile) {
  schema = {
    _id: Joi.string().required(),
    name: Joi.string().required(),
    place: Joi.string().optional(),
    bio: Joi.string().optional(),
    profilePicPath: Joi.string().optional()
  };

  return Joi.validate(profile, schema);
}

exports.validate = validateProfile;
exports.Profile = Profile;

// Sample JSON object
//const profile =
//   {
//     _id: "P10",
//     name: "Sujish Pradeep",
//     place: "Kerala",
//     bio: "Passionate about travel, food",
//     profilePicPath: "uploads/profiles/P10/profilepic.jpg"
//   }
