import { useState, useEffect, useCallback } from "react";

const useFetch = (url, shouldFetch = true) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (error) {
      setError(`Error fetching data: ${error.message}`);
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (shouldFetch) {
      fetchData();
    }
  }, [shouldFetch, fetchData]);

  return { data, loading, error, fetchData };
};

export default useFetch;
