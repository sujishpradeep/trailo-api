const express = require("express");
const app = express();
const trailInfo = require("./routes/trailInfo");
const profiles = require("./routes/profiles");
const reviews = require("./routes/reviews");
const users = require("./routes/users");
const cors = require("cors");

app.use(cors());

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use(express.json());

app.use("/api/trailinfo", trailInfo);
app.use("/api/profile", profiles);
app.use("/api/reviews", reviews);
app.use("/api/users", users);
//app.use("/api/auth", auth);

//PORT
//const port = process.env.PORT || 3000;
const port = 3000;
app.listen(port, () => console.log(`listening to port ${port}`));
