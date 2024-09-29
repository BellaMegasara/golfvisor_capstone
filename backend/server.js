const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/User");
const GolfCourseModel = require("./models/GolfCourse");
const ReviewModel = require("./models/Review");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/user")
  .then(() => console.log("Connected to user database..."))
  .catch((err) => console.log("User DB connection error:", err));

// Create a separate connection for the golf courses database
const golfCoursesConnection = mongoose.createConnection(
  "mongodb://localhost:27017/golfcourses"
);

golfCoursesConnection.on("connected", () => {
  console.log("Connected to golfcourses database...");
});

golfCoursesConnection.on("error", (err) => {
  console.log("GolfCourses DB connection error:", err);
});

const Review = mongoose.model("Review", ReviewModel.schema);
const GolfCourse = golfCoursesConnection.model(
  "GolfCourse",
  GolfCourseModel.schema
);

// Routes for reviews
const reviewsRoute = require("./routes/reviews");
app.use("/api/reviews", reviewsRoute);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
