import React, { useState } from "react";
import { Button, Rating, TextField, Card, Typography } from "@mui/material";
import axios from "axios";

interface AddReviewProps {
  golfCourseId: string;
  onReviewSubmit: (review: any) => void;
  userId: string;
}

const AddReview: React.FC<AddReviewProps> = ({
  golfCourseId,
  onReviewSubmit,
  userId,
}) => {
  const [review, setReview] = useState<string>("");
  const [rating, setRating] = useState<number | null>(2);

  const handleReviewSubmit = async () => {
    if (review && rating !== null) {
      const newReview = {
        golfCourse: golfCourseId,
        user: userId,
        rating,
        comment: review,
      };

      console.log("Submitting review:", newReview);

      try {
        const response = await axios.post("/api/reviews", newReview);
        console.log("Review submitted:", response.data);
        onReviewSubmit(response.data);
        setReview("");
        setRating(2);
      } catch (error) {
        console.error("Error submitting review:", error);
      }
    } else {
      console.warn("Review or rating is missing");
    }
  };

  return (
    <Card variant="outlined" style={{ marginTop: "20px", padding: "16px" }}>
      <Typography variant="h5">Submit Your Review</Typography>
      <Rating
        name="user-rating"
        value={rating}
        onChange={(event, newValue) => {
          setRating(newValue);
        }}
      />
      <TextField
        label="Write your review"
        multiline
        rows={4}
        value={review}
        onChange={(e) => setReview(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        onClick={handleReviewSubmit}
        type="button"
        sx={{
          backgroundColor: "#006400",
          "&:hover": { backgroundColor: "#004d00" },
        }} // Dark green
      >
        Submit Review
      </Button>
    </Card>
  );
};

export default AddReview;
