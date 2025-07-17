import apiClient from '../apiClient';

export const GetRanks = async () => {
  const response = await apiClient.get('/ranks');
  return response.data;
};
