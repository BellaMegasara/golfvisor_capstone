const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

router.post("/", async (req, res) => {
  console.log("Received review data:", req.body);

  try {
    const { golfCourse, user, rating, comment } = req.body;

    if (!golfCourse || !user || !rating || !comment) {
      return res.status(400).json({ error: "All fields are required." });
    }
    const review = await Review.create({
      golfCourse,
      user,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
