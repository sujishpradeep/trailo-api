// const { Review } = require("./models/review");
// const mongoose = require("mongoose");

// // const trails = [
// //   {
// //     name: "Skandagiri hills",
// //     state: "Karnataka",
// //     height: 2200,
// //     publishDate: "2018-01-03T19:04:28.809Z",
// //     peaceCount: 214,
// //     coverPhotoPath: "fuploads/A1.jpeg"
// //   },

// //   {
// //     name: "Thekkadi trek",
// //     state: "Kerala",
// //     height: 4350,
// //     publishDate: "2018-01-03T19:04:28.809Z",
// //     coverPhotoUploader: "Amrutha",
// //     peaceCount: 315,
// //     coverPhotoPath: "uploads/A2.jpeg"
// //   },

// //   {
// //     name: "Ziro",
// //     state: "Arunachal",
// //     height: 5500,
// //     publishDate: "2018-01-03T19:04:28.809Z",
// //     coverPhotoUploader: "Kiran",
// //     peaceCount: 450,
// //     coverPhotoPath: "uploads/A3.jpeg"
// //   },

// //   {
// //     name: "Kodaikanal",
// //     state: "Tamil Nadu",
// //     height: 7700,
// //     publishDate: "2018-01-03T19:04:28.809Z",
// //     coverPhotoUploader: "Raihan",
// //     peaceCount: 157,
// //     coverPhotoPath: "uploads/A4.jpeg"
// //   }
// // ];

// const reviews = [
//   {
//     user_id: "5d438a61616a9926afa57ea7",
//     user_name: "Sujish Pradeep",
//     trail_id: "A1",
//     trail_name: "Skandagiri Hills",
//     trail_state: "Karnataka",
//     trail_height: "2200",
//     profilePicPath: "uploads/profiles/P10/profilepic.jpg",

//     content:
//       "First review of Amazing place to visit with family. The place is kids friendly, although one cannot take pets along. "
//   },

//   {
//     user_id: "5d438cc0f1af8928f34bf07e",
//     user_name: "Amrutha Muraleedharan",
//     trail_id: "A1",
//     trail_name: "Skandagiri Hills",
//     trail_state: "Karnataka",
//     trail_height: "2200",
//     profilePicPath: "uploads/profiles/P40/profilepic.JPG",
//     content:
//       "Second review of Amazing place to visit with family. The place is kids friendly, although one cannot take pets along. "
//   },
//   {
//     user_id: "5d438a61616a9926afa57ea7",
//     user_name: "Sujish Pradeep",
//     trail_id: "5d43c042e3d2d235745dec6e",
//     trail_name: "Kodaikanal",
//     trail_state: "Tamil Nadu",
//     trail_height: "7700",
//     profilePicPath: "uploads/profiles/P10/profilepic.jpg",
//     content:
//       "Third review of Amazing place to visit with family. The place is kids friendly, although one cannot take pets along. "
//   }
// ];

// async function seed() {
//   mongoose
//     .connect("mongodb://localhost/trailo", { useNewUrlParser: true })
//     .then(() => Review.insertMany(reviews))
//     .catch(err => console.error("Could not connect", err));

//   mongoose.disconnect();

//   console.info("Done!");
// }

// seed();
