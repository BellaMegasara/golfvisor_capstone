import { Typography, Box, Rating, Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useGolfApi from "../api/useGolfApi";

const Golfcard = ({ clubPlaceId }: { clubPlaceId: string }) => {
  const navigate = useNavigate();

  // Fetch course details using the place_id
  const { data: courseData, error: courseError } = useGolfApi(
    "course/details",
    clubPlaceId ? `place_id=${clubPlaceId}` : undefined
  );

  // Handle loading or error states
  if (!courseData) {
    return <Skeleton variant="rectangular" width={300} height={400} />;
  }

  if (courseError) {
    return <Typography>Error loading course details.</Typography>;
  }

  const courseDetails = courseData?.course_details?.result || {};
  const photoReference = courseDetails?.photos?.[0]?.photo_reference;
  const rating = courseDetails?.rating || 0;

  const handleCardClick = () => {
    navigate("/details", { state: { data: courseDetails } });
  };

  return (
    <Box
      onClick={handleCardClick}
      display="flex"
      flexDirection="column"
      height="400px"
      width="300px"
      border="solid 1px lightgrey"
      padding="10px"
      style={{ cursor: "pointer" }}
    >
      <Typography variant="h6">{courseDetails.name || "N/A"}</Typography>
      <Typography>{courseDetails.formatted_address || "N/A"}</Typography>
      <Typography>{courseDetails.formatted_phone_number || "N/A"}</Typography>

      <Box display="flex" alignItems="center" marginTop="5px">
        <Typography variant="body1" marginRight="5px">
          Rating:
        </Typography>
        <Rating name="course-rating" value={rating} precision={0.1} readOnly />
        <Typography variant="body1" marginLeft="5px">
          {rating.toFixed(1)}
        </Typography>
      </Box>

      {photoReference ? (
        <img
          src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${photoReference}&key=AIzaSyCAw8JWkCBz8m7H0X8FsgDSdhUpqzeJ8CE`}
          alt="Course photo"
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            marginTop: "10px",
          }}
        />
      ) : (
        <Skeleton variant="rectangular" width={"100%"} height={200} />
      )}
    </Box>
  );
};

export default Golfcard;
