import * as React from "react";
import Button from "@mui/joy/Button";
import Checkbox from "@mui/joy/Checkbox";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { useState, useEffect } from "react";
import useGolfApi from "../api/useGolfApi";

// Define the shape of the filter state
interface FilterState {
  nineHoles: boolean;
  eighteenHoles: boolean;
  drivingRange: boolean;
  publicCourse: boolean;
  privateCourse: boolean;
}

// Define the structure of the golf course data from the API
interface GolfCourse {
  id: string;
  name: string;
  image: string;
  description: string;
}

const Filterbox: React.FC = () => {
  // Initialize the filter state
  const [filters, setFilters] = useState<FilterState>({
    nineHoles: false,
    eighteenHoles: false,
    drivingRange: false,
    publicCourse: false,
    privateCourse: false,
  });

  // State to store the filtered golf courses from the API
  const [filteredCourses, setFilteredCourses] = useState<GolfCourse[]>([]);

  // Call useGolfApi within the component
  const params = `miles=${miles}&latitude=${latitude}&longitude=${longitude}nineHoles=${filters.nineHoles}&eighteenHoles=${filters.eighteenHoles}&drivingRange=${filters.drivingRange}&publicCourse=${filters.publicCourse}&privateCourse=${filters.privateCourse}`;
  const golfCourses = useGolfApi("golf-clubs/", params);

  // Use the golfCourses data when it's available
  useEffect(() => {
    if (golfCourses) {
      setFilteredCourses(golfCourses);
    }
  }, [golfCourses]);

  // Type for the event handler is React.ChangeEvent<HTMLInputElement>
  const handleCheckboxChange =
    (filterName: keyof FilterState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFilters({ ...filters, [filterName]: event.target.checked });
    };

  return (
    <div>
      <Sheet variant="outlined" sx={{ p: 2, borderRadius: "sm", width: 300 }}>
        <Typography
          id="filter-status"
          sx={{
            textTransform: "uppercase",
            fontSize: "xs",
            letterSpacing: "lg",
            fontWeight: "lg",
            color: "text.secondary",
            mb: 2,
          }}
        >
          Filter Options
        </Typography>
        <div role="group" aria-labelledby="filter-status">
          <List>
            <ListItem variant="soft">
              <Checkbox
                label="9 Holes"
                overlay
                checked={filters.nineHoles}
                onChange={handleCheckboxChange("nineHoles")}
                sx={{ color: "inherit" }}
              />
            </ListItem>
            <ListItem variant="soft">
              <Checkbox
                label="18 Holes"
                overlay
                checked={filters.eighteenHoles}
                onChange={handleCheckboxChange("eighteenHoles")}
              />
            </ListItem>
            <ListItem variant="soft">
              <Checkbox
                label="Driving Range"
                overlay
                checked={filters.drivingRange}
                onChange={handleCheckboxChange("drivingRange")}
              />
            </ListItem>
            <ListItem variant="soft">
              <Checkbox
                label="Public Course"
                overlay
                checked={filters.publicCourse}
                onChange={handleCheckboxChange("publicCourse")}
              />
            </ListItem>
            <ListItem variant="soft">
              <Checkbox
                label="Private Course"
                overlay
                checked={filters.privateCourse}
                onChange={handleCheckboxChange("privateCourse")}
              />
            </ListItem>
          </List>
        </div>
        <Button
          variant="outlined"
          color="neutral"
          size="sm"
          onClick={() =>
            setFilters({
              nineHoles: false,
              eighteenHoles: false,
              drivingRange: false,
              publicCourse: false,
              privateCourse: false,
            })
          }
          sx={{ px: 1.5, mt: 1 }}
        >
          Clear All
        </Button>
      </Sheet>

      {/* Display the filtered courses */}
      <div>
        <Typography sx={{ mt: 3, fontSize: "1.5rem", fontWeight: "bold" }}>
          Results
        </Typography>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
          {filteredCourses.map((course) => (
            <div
              key={course.id} // Ensure the unique key for each course
              style={{
                border: "1px solid #ccc",
                padding: "16px",
                width: "300px",
              }}
            >
              <img
                src={course.image}
                alt={course.name}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <Typography
                sx={{ mt: 1, fontSize: "1.25rem", fontWeight: "bold" }}
              >
                {course.name}
              </Typography>
              <Typography>{course.description}</Typography>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filterbox;
