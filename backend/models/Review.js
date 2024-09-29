const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    golfCourse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GolfCourse",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: [true, "Please add a rating between 1 and 5"],
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: [true, "Please add a comment"],
    },
  },
  { timestamps: true }
);

const ReviewModel = mongoose.model("Review", ReviewSchema);
module.exports = ReviewModel;
