import { useEffect, useState } from 'react';
import { GetLeaderboard } from '@/services/apis/leaderboardService';
import type { leaderboardArray } from '@/types/leaderboard';

const useLeaderboardHook = () => {
  const [leaderboard, setLeaderboard] = useState<leaderboardArray>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      setError(null);
      try {
        const leaderboardData = await GetLeaderboard('Europe');
        setLeaderboard(leaderboardData);
      } catch (err) {
        console.error('Error fetching ranks:', err);
        setError('Failed to load ranks. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  return {
    error,
    loading,
    leaderboard,
  };
};

export default useLeaderboardHook;
