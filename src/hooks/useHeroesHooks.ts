import { useEffect, useState, useMemo } from 'react';
import { GetHeroes, GetHeroesStats } from '../services/apis/heroService';
import { GetRanks } from '../services/apis/ranksService';
import type { Ranks } from '../types/rank';
import type { SelectRankOption } from '../types/rank';
import type { HeroesStatsArray, Heroes, HeroTableRow } from '../types/hero';

const useHeroesHooks = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [heroes, setHeroes] = useState<Heroes>([]);
  const [ranks, setRanks] = useState<Ranks>([]);
  const [heroesStats, setHeroesStats] = useState<HeroesStatsArray>([]);
  const [minimumRank, setMinimumRank] = useState<number>(() => {
    const saved = localStorage.getItem('minimumRank');
    return saved ? parseInt(saved) : 91;
  });
  const [maximumRank, setMaximumRank] = useState<number>(() => {
    const saved = localStorage.getItem('maximumRank');
    return saved ? parseInt(saved) : 116;
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [heroesData, ranksData] = await Promise.all([
          GetHeroes(),
          GetRanks(),
        ]);
        setHeroes(heroesData);
        setRanks(ranksData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const heroesStatsData = await GetHeroesStats(minimumRank, maximumRank);
        setHeroesStats(heroesStatsData);
      } catch (err) {
        console.error('Error fetching hero stats:', err);
        setError('Failed to load hero stats. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [minimumRank, maximumRank]);

  useEffect(() => {
    localStorage.setItem('minimumRank', minimumRank.toString());
  }, [minimumRank]);

  useEffect(() => {
    localStorage.setItem('maximumRank', maximumRank.toString());
  }, [maximumRank]);

  const heroesStatsMap = useMemo(() => {
    const map = new Map<number, (typeof heroesStats)[0]>();
    heroesStats.forEach((stat) => {
      map.set(stat.hero_id, stat);
    });
    return map;
  }, [heroesStats]);

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

  const minimumRankChange = (value: string) => {
    setMinimumRank(parseInt(value));
  };

  const maximumRankChange = (value: string) => {
    setMaximumRank(parseInt(value));
  };

  const getPercentageRate = (value: number, total: number) => {
    return total ? ((value / total) * 100).toFixed(2) : '0';
  };

  const getAverage = (value: number, matches: number) => {
    return matches ? (value / matches).toFixed(1) : '0';
  };

  const data: HeroTableRow[] = heroes.map((hero) => {
    const stats = heroesStatsMap.get(hero.id);
    const matches = stats?.matches ?? 0;
    const winRate = getPercentageRate(stats?.wins ?? 0, matches);
    const pickRate = getPercentageRate(matches, stats?.matches_per_bucket ?? 0);
    const kills = getAverage(stats?.total_kills ?? 0, matches);
    const deaths = getAverage(stats?.total_deaths ?? 0, matches);
    const assists = getAverage(stats?.total_assists ?? 0, matches);
    return {
      id: hero.id,
      heroImage: hero.images.minimap_image,
      heroName: hero.name,
      winRate,
      pickRate,
      kda: `${kills}/${deaths}/${assists}`,
      matches,
    };
  });

  return {
    loading,
    error,
    ranks,
    heroes,
    heroesStats,
    minimumRank,
    maximumRank,
    formattedRanks,
    minimumRankChange,
    maximumRankChange,
    data,
  };
};

export default useHeroesHooks;
