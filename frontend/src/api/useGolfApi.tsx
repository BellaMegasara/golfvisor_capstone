import { useEffect, useState } from "react";

const useGolfApi = (path: string, optionalParams?: string) => {
  console.log('path', path)
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (path) {
      const fetchData = async () => {
        const actualFetchPath = `/api/${path}${optionalParams ? `?${optionalParams}` : ""
          }`;
        const options = {
          method: "GET",
          headers: {
            Authorization: "Token ab105f76a71c74f528583599d2e69cfdfd5e0ab7",
          },
        };

        try {
          const response = await fetch(actualFetchPath, options);

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const result = await response.json();
          setData(result);
        } catch (error: any) {
          console.error("Error fetching data:", error);
          setError(error.message);
        }
      };

      fetchData();
    }
  }, []);

  useEffect(() => {
    console.log('we expect data to be filled, from useGolfApi', data)
  },[data])

  return { data, error };
};

export default useGolfApi;
