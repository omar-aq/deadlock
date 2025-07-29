import { useEffect, useState, useMemo, useCallback } from 'react';
import { Regions } from '@/enums/regions';
import { GetLeaderboard } from '@/services/apis/leaderboardService';
import type { leaderboardArray } from '@/types/leaderboard';
import useRanks from './useRanks';

const PAGE_SIZE = 100;

const useLeaderboardHook = () => {
  const [leaderboard, setLeaderboard] = useState<leaderboardArray>([]);
  const [region, setRegion] = useState<string>(Regions[0]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { formattedRanks } = useRanks();

  const ranksMap = useMemo(() => {
    const map = new Map<number, string>();
    formattedRanks.forEach((rank) => map.set(rank.tier, rank.image));
    return map;
  }, [formattedRanks]);

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

  const formattedLeaderboard = useMemo(() => {
    return leaderboard.map((player) => ({
      ...player,
      badge_image: ranksMap.get(player.badge_level) || '',
    }));
  }, [leaderboard, ranksMap]);

  const onRegionChange = useCallback((value: string) => {
    setRegion(value);
  }, []);

  //Front-End pagination because not supported on backend
  const { paginatedData, totalPages } = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const total = formattedLeaderboard.length;
    const totalPages = Math.ceil(total / PAGE_SIZE);

    return {
      paginatedData: formattedLeaderboard.slice(startIndex, endIndex),
      totalPages,
    };
  }, [formattedLeaderboard, currentPage]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const allPages = useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }, [totalPages]);

  return {
    error,
    region,
    Regions,
    loading,
    goToPage,
    allPages,
    totalPages,
    currentPage,
    onRegionChange,
    paginatedData,
    formattedLeaderboard,
  };
};

export default useLeaderboardHook;
