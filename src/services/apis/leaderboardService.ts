import apiClient from '../apiClient';

export const GetLeaderboard = async (regain: string) => {
  if (!regain) return;
  const response = await apiClient.get(`/leaderboard/${regain}`, {
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });
  return response.data;
};
