import { useEffect, useState } from 'react';

export const useFetch = (url, headers) => {
  const [data, setData] = useState(null);
  const [fetchErrors, setFetchErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(url, headers);
      const result = await response.json();
      setData(result);
      setIsLoading(false);
    } catch (errors) {
      setFetchErrors(errors);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, headers]);

  return { data, isLoading, fetchErrors };
};
