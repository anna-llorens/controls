const API_URL = import.meta.env.VITE_API_URL;

export const post = async (route: string, data: unknown, apiUrl = API_URL) => {
  try {
    const response = await fetch(`${apiUrl}/${route}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to create node:", error);
  }
};

export const get = async (route: string, apiUrl = API_URL) => {
  const response = await fetch(`${apiUrl}/${route}`);
  return await response.json();
};

export const fetchDelete = async (
  route: string,
  id: string,
  apiUrl = API_URL
) => {
  try {
    const response = await fetch(`${apiUrl}/${route}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    console.error(`Failed to delete ${route}:`, error);
  }
};

export const update = async (
  route: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
  apiUrl = API_URL
) => {
  try {
    const response = await fetch(`${apiUrl}/${route}/${data?.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Failed to update ${route}:`, error);
  }
};
