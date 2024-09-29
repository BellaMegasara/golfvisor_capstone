const mongoose = require("mongoose");

const GolfCourseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name for the golf course"],
      unique: true,
    },
    location: {
      type: String,
      required: [true, "Please add a location"],
    },
    contact: {
      type: String,
      required: [true, "Please add contact number or email of the golf course"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const GolfCourseModel = mongoose.model("GolfCourse", GolfCourseSchema);
module.exports = GolfCourseModel;
