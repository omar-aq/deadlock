import apiClient from '../apiClient';

export const GetItems = async () => {
  const response = await apiClient.get('/items');
  return response.data;
};

export const GetItemsStats = async (
  minimumRank: number,
  maximumRank: number
) => {
  let query = '';
  if (minimumRank && maximumRank) {
    query = `?min_average_badge=${minimumRank}&max_average_badge=${maximumRank}`;
  }
  const url = `/analytics/item-stats${query}`;
  const response = await apiClient.get(url, {
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });
  return response.data;
};
