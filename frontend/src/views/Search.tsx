import useGolfApi from "../api/useGolfApi";
import Golfcard from "../components/Golfcard";
import { Box, Typography } from "@mui/material";

const Search = () => {
  const { data: golfClubData, error: golfClubError } = useGolfApi(
    "?miles=${miles}&latitude=${latitude}&longitude=${longitude}"
  );

  if (!golfClubData) {
    return <Typography>Loading Data...</Typography>;
  }

  const displaySearch = () => {
    return golfClubData.map((club: any) => {
      console.log("Club", club?.place_id);

      if (!club?.club_name) {
        return <></>;
      }

      return (
        <Box key={club?.club_name}>
          <Golfcard clubName={club.club_name} />
        </Box>
      );
    });
  };

  return (
    <div className="golfcard-container">
      <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"}>
        {displayListOfGolfClubs()}
      </Box>
    </div>
  );
};
