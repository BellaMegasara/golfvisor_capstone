import { useEffect, useState } from "react";
import {
  GolfClub,
  CourseDetailsResult,
  DetailedGolfClub,
} from "../utils/types";

const useGolfClubs = (miles: number, latitude: number, longitude: number) => {
  const [detailedClubs, setDetailedClubs] = useState<DetailedGolfClub[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGolfClubs = async (): Promise<GolfClub[]> => {
    const url = `https://apiv2.golfambit.com/api/golf-clubs/?miles=${miles}&latitude=${latitude}&longitude=${longitude}`;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Token ${process.env.REACT_APP_GOLFAMBIT_API_KEY}`,
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch golf clubs");
      }
      const data: GolfClub[] = await response.json();
      return data;
    } catch (err: any) {
      setError(err.message);
      return [];
    }
  };

  const fetchCourseDetails = async (
    placeId: string
  ): Promise<CourseDetailsResult | null> => {
    const url = `https://apiv2.golfambit.com/api/course/details?place_id=${placeId}`;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Token ${process.env.REACT_APP_GOLFAMBIT_API_KEY}`,
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const errorData: any = await response.json();
        console.error(
          `Error fetching details for place_id ${placeId}: ${errorData.course_details?.error_message}`
        );
        return null;
      }
      const data: CourseDetailsResult = await response.json();
      return data;
    } catch (err: any) {
      console.error(
        `Error fetching details for place_id ${placeId}: ${err.message}`
      );
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const clubs = await fetchGolfClubs();

      // Fetch details for each club concurrently
      const clubsWithDetails: DetailedGolfClub[] = await Promise.all(
        clubs.map(async (club) => {
          if (club.place_id) {
            const details = await fetchCourseDetails(club.place_id);
            return { ...club, course_details: details };
          }
          return club;
        })
      );

      setDetailedClubs(clubsWithDetails);
      setLoading(false);
    };

    fetchData();
  }, [miles, latitude, longitude]);

  return { detailedClubs, loading, error };
};

export default useGolfClubs;

