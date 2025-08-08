import apiClient from '../apiClient';

export const GetRanks = async () => {
  const response = await apiClient.get('/ranks');
  return response.data;
};

export const GetPlayerMmr = async (account_id: number) => {
  if (!account_id) return null;

  const response = await apiClient.get(
    `/players/mmr?account_ids=${account_id}`,
    {
      baseURL: import.meta.env.VITE_API_BASE_URL,
    }
  );
  return response.data;
};

export const GetPlayersMmr = async (account_ids: number[]) => {
  if (!account_ids?.length) return [];
  const query = account_ids.join(',');
  const response = await apiClient.get(`/players/mmr?account_ids=${query}`, {
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });
  return response.data;
};
