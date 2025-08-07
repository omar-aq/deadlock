import apiClient from '../apiClient';

export const GetSteamProfile = async (searchQuery: string) => {
  const response = await apiClient.get(
    `/players/steam-search?search_query=${searchQuery}`,
    {
      baseURL: import.meta.env.VITE_API_BASE_URL,
    }
  );

  return response.data;
};
