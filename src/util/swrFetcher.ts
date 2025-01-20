export const swrFetcher = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.error || "Failed to fetch data");
  }
  return response.json() as Promise<T>;
};
