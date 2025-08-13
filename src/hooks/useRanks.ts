import { useEffect, useMemo, useState } from 'react';
import { GetRanks } from '@/services/apis/ranksService';
import type { Ranks, SelectRankOption } from '@/types/rank';

let ranksCache: Ranks | null = null;
let ranksPromise: Promise<Ranks> | null = null;

const useRanks = () => {
  const [ranks, setRanks] = useState<Ranks>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    const fetchRanks = async () => {
      setLoading(true);
      setError(null);
      try {
        if (ranksCache) {
          if (!isActive) return;
          setRanks(ranksCache);
          return;
        }

        if (!ranksPromise) {
          ranksPromise = GetRanks().then((data) => {
            ranksCache = data;
            return data;
          });
        }

        const data = await ranksPromise;
        if (!isActive) return;
        setRanks(data);
      } catch (err) {
        console.error('Error fetching ranks:', err);
        if (isActive) {
          setError('Failed to load ranks. Please try again later.');
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchRanks();

    return () => {
      isActive = false;
    };
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
