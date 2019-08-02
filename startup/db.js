const mongoose = require("mongoose");

module.exports = function() {
  mongoose
    .connect("mongodb://localhost/trailo", { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Could not connect", err));
  mongoose.set("useFindAndModify", false);
};
