import { useEffect, useCallback, useState, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from '@/hooks/useDebounce';
import { GetMatches } from '@/services/apis/matches';
import { GetSteamProfile } from '@/services/apis/steamSearch';
import { GetPlayersMmr } from '@/services/apis/ranksService';
import useHeroes from '@/hooks/useHeroes';
import useRanks from '@/hooks/useRanks';
import type { MatchArray } from '@/types/matches';
import type { PlayerMmrArray } from '@/types/rank';
import type { steamProfileArray } from '@/types/steamProfile';

const useSearchQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [profileData, setProfileData] = useState<steamProfileArray>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const searchQuery = searchParams.get('searchQuery') || '';
  const [inputValue, setInputValue] = useState(searchQuery);
  const debouncedQuery = useDebounce(inputValue, 500);
  const [matches, setMatches] = useState<MatchArray>([]);
  const [playerRankImageById, setPlayerRankImageById] = useState<
    Map<number, string>
  >(new Map());

  const { heroes } = useHeroes();
  const { formattedRanks } = useRanks();
  const heroIdToImage = useMemo(() => {
    const map = new Map();
    heroes.forEach((hero) => map.set(hero.id, hero.images.minimap_image));
    return map;
  }, [heroes]);

  const topFiveMatches = useMemo(() => matches.slice(0, 5), [matches]);
  const mmrIds = useMemo(() => {
    const uniqueIds = new Set<number>();
    topFiveMatches.forEach((match) => {
      match.players.forEach((player) => uniqueIds.add(player.account_id));
    });
    return Array.from(uniqueIds).sort((a, b) => a - b);
  }, [topFiveMatches]);
  const mmrIdsKey = useMemo(() => mmrIds.join(','), [mmrIds]);
  const lastFetchedMmrKeyRef = useRef<string | null>(null);
  const isFetchingMmrRef = useRef<boolean>(false);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (debouncedQuery) {
      params.set('searchQuery', debouncedQuery);
    } else {
      params.delete('searchQuery');
    }

    setSearchParams(params, { replace: true });
  }, [debouncedQuery, searchParams, setSearchParams]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        const data = await GetMatches();
        setMatches(data);
      } catch (error) {
        console.error('Error fetching matches:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  useEffect(() => {
    const fetchMmrForTopFive = async () => {
      if (!mmrIds.length || formattedRanks.length === 0) return;
      if (isFetchingMmrRef.current) return;
      if (lastFetchedMmrKeyRef.current === mmrIdsKey) return;

      const nextMap = new Map<number, string>();

      const getRankImage = (rankTier: number): string => {
        const rankBanner = formattedRanks.find(
          (rank) => rank.tier === rankTier
        );
        return rankBanner?.image || '';
      };

      isFetchingMmrRef.current = true;
      let res: unknown;
      try {
        res = (await GetPlayersMmr(mmrIds)) as MatchArray;
      } catch (error) {
        console.error('Error fetching player MMR:', error);
      } finally {
        isFetchingMmrRef.current = false;
      }

      (res as PlayerMmrArray).forEach((record) => {
        if (record?.account_id != null && record?.rank != null) {
          nextMap.set(record.account_id, getRankImage(record.rank));
        }
      });

      setPlayerRankImageById(nextMap);
      lastFetchedMmrKeyRef.current = mmrIdsKey;
    };

    fetchMmrForTopFive();
  }, [mmrIdsKey, mmrIds, formattedRanks]);

  const countryCodeToFlagEmoji = (code: string | null) => {
    if (!code) return null;
    const upper = code.trim().toUpperCase();
    if (upper.length !== 2) return upper;
    const OFFSET = 127397;
    const chars = Array.from(upper).map((c) =>
      String.fromCodePoint(c.charCodeAt(0) + OFFSET)
    );
    return chars.join('');
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (!debouncedQuery) {
        setProfileData([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await GetSteamProfile(debouncedQuery);
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching Steam profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [debouncedQuery]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    []
  );

  return {
    loading,
    inputValue,
    profileData,
    searchQuery,
    heroIdToImage,
    topFiveMatches,
    handleInputChange,
    playerRankImageById,
    countryCodeToFlagEmoji,
  };
};

export default useSearchQuery;
