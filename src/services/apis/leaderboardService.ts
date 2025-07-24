import apiClient from '../apiClient';

export const GetLeaderboard = async (region: string) => {
  if (!region) return;
  const response = await apiClient.get(`/leaderboard/${region}`, {
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });
  return response.data;
};
