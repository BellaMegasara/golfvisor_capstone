import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, Rating, TextField, Button } from "@mui/material";
import axios from "axios";
import Navbar from "../components/Navbar";

const Details = () => {
  const location = useLocation();
  const { data: courseDetails } = location.state || { data: {} };

  const [photosToShow, setPhotosToShow] = useState<any[]>([]);
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");

  if (!courseDetails) {
    return <Typography>Error: No course details available.</Typography>;
  }

  const drivingRange = courseDetails.driving_range ? "Yes" : "No";
  const puttingGreen = courseDetails.putting_green ? "Yes" : "No";
  const ratingValue = courseDetails.rating || 0;
  const website = courseDetails.website || "N/A";
  const photos = courseDetails.photos || [];

  useEffect(() => {
    if (photos.length > 0) {
      setPhotosToShow(photos.slice(0, 2));
    }
  }, [photos]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (rating === null) {
      alert("Please provide a rating.");
      return;
    }

    const reviewData = {
      golfCourse: courseDetails._id,
      user: "user_id_here",
      rating,
      comment,
    };

    try {
      await axios.post("http://localhost:3001/api/reviews", reviewData);
      setRating(0);
      setComment("");
      alert("Review submitted successfully!");
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <Box padding={3}>
      <Navbar />
      <Typography variant="h4">{courseDetails.name || "N/A"}</Typography>
      <Typography variant="subtitle1">
        {courseDetails.formatted_address || "N/A"}
      </Typography>
      <Typography variant="body1">
        {courseDetails.formatted_phone_number || "N/A"}
      </Typography>
      <Typography>
        Website:{" "}
        <a href={website} target="_blank" rel="noopener noreferrer">
          {website}
        </a>
      </Typography>
      <Box display="flex" alignItems="center" marginTop="5px">
        <Typography variant="body1" marginRight="5px">
          Rating:
        </Typography>
        <Rating
          name="course-rating"
          value={ratingValue}
          precision={0.1}
          readOnly
        />
        <Typography variant="body1" marginLeft="5px">
          {ratingValue.toFixed(1)}
        </Typography>
      </Box>
      <Box display="flex" marginTop="5px">
        <Typography variant="body1">Driving Range: {drivingRange}</Typography>
        <Typography variant="body1" style={{ marginLeft: "10px" }}>
          Putting Green: {puttingGreen}
        </Typography>
      </Box>
      <Box marginTop="20px">
        {photosToShow.length > 0 && (
          <Box marginBottom="15px">
            <img
              src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${photosToShow[0].photo_reference}&key=AIzaSyCAw8JWkCBz8m7H0X8FsgDSdhUpqzeJ8CE`}
              alt="Course photo 1"
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "500px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </Box>
        )}

        {photosToShow.length > 1 && (
          <Box>
            <img
              src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${photosToShow[1].photo_reference}&key=AIzaSyCAw8JWkCBz8m7H0X8FsgDSdhUpqzeJ8CE`}
              alt="Course photo 2"
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "400px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </Box>
        )}
      </Box>
      <Box marginTop={4}>
        <Typography variant="h6">Submit Your Review</Typography>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column">
            <Rating
              name="user-rating"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              precision={1}
            />
            <TextField
              label="Comment"
              multiline
              rows={4}
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              required
              variant="outlined"
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
              Submit Review
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Details;
