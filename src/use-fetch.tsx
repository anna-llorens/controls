import { useState, useEffect } from "react";

export const useFetch = (url: string) => {
  const [data, setData] = useState<any>(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(response.statusText);
        const json = await response.json();
        setData(json);
        setError(undefined);
      } catch (err) {
        let errorMessage = "Could not fetch data";
        if (err instanceof Error && err.message === "Failed to fetch") {
          errorMessage =
            "Failed to fetch data. Please make sure the server is running.";
        } else if (err instanceof Error) {
          errorMessage = `${err.message} Could not fetch data.`;
        }
        setError(errorMessage);
      } finally {
        setIsPending(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, isPending, error };
};
