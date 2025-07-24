import { useEffect, useState } from 'react';
import { Regions } from '@/enums/regions';
import { GetLeaderboard } from '@/services/apis/leaderboardService';
import type { leaderboardArray } from '@/types/leaderboard';

const useLeaderboardHook = () => {
  const [leaderboard, setLeaderboard] = useState<leaderboardArray>([]);
  const [region, setRegion] = useState<string>(Regions[0]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      setError(null);
      try {
        const leaderboardData = await GetLeaderboard(region);
        setLeaderboard(leaderboardData);
      } catch (err) {
        console.error('Error fetching ranks:', err);
        setError('Failed to load ranks. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, [region]);

  const onRegionChange = (value: string) => {
    setRegion(value);
  };

  return {
    error,
    region,
    Regions,
    loading,
    leaderboard,
    onRegionChange,
  };
};

export default useLeaderboardHook;
