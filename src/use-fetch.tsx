import { useQuery } from "@tanstack/react-query";

export const useFetch = (url: string) => {
  const fetchMembers = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  return useQuery({
    queryKey: ["members"],
    queryFn: () => fetchMembers(url),
  });
};
