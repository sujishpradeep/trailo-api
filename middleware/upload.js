const multer = require("multer");
const fs = require("fs");
let subfolder = "";
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    console.log("req", req.body);
    const dir = `./uploads/${subfolder}/${req.body._id}`;
    fs.mkdir(dir, { recursive: true }, err => {
      if (err) throw err;
    });
    cb(null, `./uploads/${subfolder}/${req.body._id}`);
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png")
    cb(null, true);
  else cb(null, false);
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

function setSubFolder(sf) {
  subfolder = sf;
}
module.exports = { upload, setSubFolder };
