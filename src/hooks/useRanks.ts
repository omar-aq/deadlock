import { useEffect, useMemo, useState } from 'react';
import { GetRanks } from '@/services/apis/ranksService';
import type { Ranks, SelectRankOption } from '@/types/rank';

const useRanks = () => {
  const [ranks, setRanks] = useState<Ranks>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRanks = async () => {
      setLoading(true);
      setError(null);
      try {
        const ranksData = await GetRanks();
        setRanks(ranksData);
      } catch (err) {
        console.error('Error fetching ranks:', err);
        setError('Failed to load ranks. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchRanks();
  }, []);

  const formattedRanks = useMemo((): SelectRankOption[] => {
    return ranks.flatMap((rank): SelectRankOption[] => {
      if (rank.tier === 0) {
        return [
          {
            tier: rank.tier,
            name: rank.name,
            image: rank.images.small,
          },
        ];
      }
      return Array.from({ length: 6 }, (_, i) => {
        return {
          tier: rank.tier * 10 + i + 1,
          name: `${rank.name} ${i + 1}`,
          image: rank.images[`small_subrank${i + 1}`] || '',
        };
      });
    });
  }, [ranks]);

  return { ranks, formattedRanks, loading, error };
};

export default useRanks;
