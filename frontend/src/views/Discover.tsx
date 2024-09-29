import { Box, Typography } from "@mui/material";
import useGolfApi from "../api/useGolfApi";
import Golfcard from "../components/Golfcard";

import Navbar from "../components/Navbar";

const Discover = () => {
  // GET ALL GOLF CLUB LOCATIONS
  const { data: golfClubData, error: golfClubError } = useGolfApi(
    "golf-clubs/",
    "miles=${miles}&latitude=${latitude}&longitude=${longitude}"
  );

  if (!golfClubData) {
    return <Typography>Loading Data...</Typography>;
  }

  const displayListOfGolfClubs = () => {
    return golfClubData.map((club: any) => {
      console.log("Club", club?.place_id);

      if (!club?.place_id) {
        return <></>;
      }

      return (
        <Box key={club?.place_id}>
          <Golfcard clubPlaceId={club.place_id} />
        </Box>
      );
    });
  };

  return (
    <div className="golfcard-container">
      <Navbar />
      <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"}>
        {displayListOfGolfClubs()}
      </Box>
    </div>
  );
};

export default Discover;
