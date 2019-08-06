const bcrypt = require("bcrypt");

async function run() {
  const salt = await bcrypt.genSalt(10);
  const hashed = bcrypt.hash("1234", salt);
}
