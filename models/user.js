const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullname: { type: String, required: true },
  peaceMarked: [String],
  bookMarked: [String]
});

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  schema = {
    fullname: Joi.string()
      .min(3)
      .required(),
    username: Joi.required(),
    password: Joi.required(),
    isAdmin: Joi.optional()
  };

  return Joi.validate(user, schema);
}

exports.validate = validateUser;
exports.User = User;

// Sample JSON object
// const users = [
//   {
//     username: "P1",
//     fullname: "Sujish Pradeep",
//     password: "123456",
//     peaceMarked: ["A1", "A3"],
//     bookMarked: ["A2", "A4"],
//     isAdmin: "false",
//     profileid: 11111
//   }
// ];
