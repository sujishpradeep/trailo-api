const express = require("express");
const app = express();
const trails = require("./routes/trails");
const profiles = require("./routes/profiles");
const reviews = require("./routes/reviews");
const users = require("./routes/users");
const cors = require("cors");

app.use(cors());

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/trails", trails);
app.use("/api/profiles", profiles);
app.use("/api/reviews", reviews);
app.use("/api/users", users);

//PORT
//const port = process.env.PORT || 3000;
const port = 3000;
app.listen(port, () => console.log(`listening to port ${port}`));
