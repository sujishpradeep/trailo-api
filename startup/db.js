const mongoose = require("mongoose");
const db = config.get("db");

module.exports = function() {
  mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Could not connect", err));
  mongoose.set("useFindAndModify", false);
};
