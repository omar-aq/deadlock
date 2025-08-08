import apiClient from '../apiClient';

export const GetMatches = async () => {
  const response = await apiClient.get('/matches/active', {
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });
  return response.data;
};
