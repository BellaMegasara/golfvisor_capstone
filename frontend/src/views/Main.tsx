import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";
import Home from "../components/Home";
import { Typography } from "@mui/material";

const Main = () => {
  const [course, setCourse] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Function to fetch all golf courses
  const getGolfCourse = async () => {
    const url =
      "/api/golf-clubs/?miles=50&longitude=115.857048&latitude=-31.953512";
    const options = {
      method: "GET",
      headers: {
        Authorization: "Token ab105f76a71c74f528583599d2e69cfdfd5e0ab7",
      },
    };

    try {
      setLoading(true);
      const response = await fetch(url, options);
      const data = await response.json();
      setCourse(data);
    } catch (err) {
      console.log("Error fetching all courses:", err);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch filtered golf courses based on search
  const getFilteredGolfCourses = async (searchTerm: string) => {
    const url = `/api/golf-clubs/search?query=${searchTerm}`; // Adjust based on your API setup
    const options = {
      method: "GET",
      headers: {
        Authorization: "Token ab105f76a71c74f528583599d2e69cfdfd5e0ab7",
      },
    };

    try {
      setLoading(true);
      const response = await fetch(url, options);
      const data = await response.json();
      setCourse(data);
    } catch (err) {
      console.log("Error fetching filtered courses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (search) {
      getFilteredGolfCourses(search);
    } else {
      getGolfCourse(); // Fetch all courses if there's no search term
    }
  }, [search]); // Add 'search' as a dependency

  const displayHomeHandler = () => {
    console.log("displayHomeHandler", loading, course);
    if (loading) {
      return <Typography>Loading data...</Typography>;
    }
    if (course.length > 0) {
      return <Home course={course} search={search} />;
    }
    return <Typography>No courses found.</Typography>;
  };

  return (
    <div>
      <Navbar />
      <h1 className="font-extrabold text-center text-5xl mt-10">
        Where's the next tee?
      </h1>
      <Searchbar setSearch={setSearch} />
      {displayHomeHandler()}
    </div>
  );
};

export default Main;
