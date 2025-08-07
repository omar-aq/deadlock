import { useEffect, useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { GetSteamProfile } from '@/services/apis/steamSearch';
import { useDebounce } from '@/hooks/useDebounce';
import type { steamProfileArray } from '@/types/steamProfile';

const useSearchQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [profileData, setProfileData] = useState<steamProfileArray>([]);
  const [loading, setLoading] = useState(false);
  const searchQuery = searchParams.get('searchQuery') || '';
  const [inputValue, setInputValue] = useState(searchQuery);
  const debouncedQuery = useDebounce(inputValue, 500);

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
    inputValue,
    searchQuery,
    profileData,
    loading,
    handleInputChange,
  };
};

export default useSearchQuery;
