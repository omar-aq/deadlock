import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

const useStatsFilterHook = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  //TODO: Default values for minimum and maximum ranks
  const minimumRankParam = searchParams.get('minimumRank') || '91';
  const maximumRankParam = searchParams.get('maximumRank') || '116';

  const setMaximumRank = useCallback(
    (maximumRank: string) => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set('maximumRank', maximumRank);

        return params;
      });
    },
    [setSearchParams]
  );

  const setMinimumRank = useCallback(
    (minimumRank: string) => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set('minimumRank', minimumRank);

        return params;
      });
    },
    [setSearchParams]
  );

  return {
    minimumRankParam,
    maximumRankParam,
    setMinimumRank,
    setMaximumRank,
  };
};

export default useStatsFilterHook;
