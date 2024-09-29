// useGolfApi.tsx 230924

import { useEffect, useState } from "react";

const useGolfApi = () => {
  const [data, setData] = useState([]);

  const getCourseDetails = async () => {
    const url = "/api/course/details?place_id=ChIJYUuxSFbmjYAR14kcbsdLieM";
    const options = {
      method: "GET",
      headers: {
        Authorization: "Token ab105f76a71c74f528583599d2e69cfdfd5e0ab7",
      },
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
      setData(result);
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };

  useEffect(() => {
    getCourseDetails();
  }, []);

  return data;
};

export default useGolfApi;

















