import apiClient from '../apiClient';

export const GetItems = async () => {
  const response = await apiClient.get('/items');
  return response.data;
};

export const GetItemsStats = async () => {
  const response = await apiClient.get('analytics/item-stats', {
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });
  return response.data;
};
