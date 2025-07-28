import { useEffect, useState, useMemo, useCallback } from 'react';
import { Regions } from '@/enums/regions';
import { GetLeaderboard } from '@/services/apis/leaderboardService';
import type { leaderboardArray } from '@/types/leaderboard';
import useRanks from './useRanks';

const useLeaderboardHook = () => {
  const [leaderboard, setLeaderboard] = useState<leaderboardArray>([]);
  const [region, setRegion] = useState<string>(Regions[0]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { formattedRanks } = useRanks();

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

  const formattedLeaderboard: leaderboardArray = useMemo(() => {
    return leaderboard.map((player) => {
      return {
        account_name: player.account_name,
        rank: player.rank,
        badge_level: player.badge_level,
        badge_image:
          formattedRanks.find((rank) => rank.tier === player.badge_level)
            ?.image || '',
      };
    });
  }, [leaderboard, formattedRanks]);

  const onRegionChange = useCallback((value: string) => {
    setRegion(value);
  }, []);

  return {
    error,
    region,
    Regions,
    loading,
    leaderboard,
    onRegionChange,
    formattedLeaderboard,
  };
};

export default useLeaderboardHook;
