import { useEffect, useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { GetSteamProfile } from '@/services/apis/steamSearch';
import { useDebounce } from '@/hooks/useDebounce';

const useSearchQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
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
      if (!debouncedQuery) return;

      try {
        const profileData = await GetSteamProfile(debouncedQuery);
        console.log(profileData);
      } catch (error) {
        console.error('Error fetching Steam profile:', error);
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
    handleInputChange,
  };
};

export default useSearchQuery;
