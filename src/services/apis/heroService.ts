import apiClient from '../apiClient';

export const GetHeroes = async () => {
  const response = await apiClient.get('/heroes?only_active=true');
  return response.data;
};

export const GetHeroesStats = async (minRank: number, maxRank: number) => {
  let query = '';
  if (minRank && maxRank) {
    query = `?min_average_badge=${minRank}&max_average_badge=${maxRank}`;
  }
  const url = `/analytics/hero-stats${query}`;
  const response = await apiClient.get(url, {
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });
  return response.data;
};

export const GetPatches = async () => {
  const response = await apiClient.get('/patches', {
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });
  return response.data;
};
