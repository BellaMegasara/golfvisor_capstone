import { Box, Typography } from "@mui/material";
import Golfcard from "./Golfcard";

type CourseProp = {
  course: any[];
  search: string;
};

const Home = ({ course = [], search }: CourseProp) => {
  const filteredCourses = course.filter(
    (data: any) =>
      data.club_name?.toLowerCase().includes(search.toLowerCase()) ||
      data.formatted_address?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="grid grid-cols-4 gap-4">
      {filteredCourses.length > 0 ? (
        filteredCourses.map((data: any) => (
          <Box key={data.place_id} margin="10px">
            <Golfcard clubPlaceId={data.place_id} />
          </Box>
        ))
      ) : (
        <Typography
          variant="h6"
          style={{ textAlign: "center", marginTop: "20px" }}
        >
          No results found.
        </Typography>
      )}
    </div>
  );
};

export default Home;
