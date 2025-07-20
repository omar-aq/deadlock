import { useCallback, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

const DEFAULT_MIN_RANK = '91';
const DEFAULT_MAX_RANK = '116';

const useStatsFilterHook = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initializedRef = useRef(false);

  const minimumRankParam = searchParams.get('minimumRank') || DEFAULT_MIN_RANK;
  const maximumRankParam = searchParams.get('maximumRank') || DEFAULT_MAX_RANK;

  useEffect(() => {
    if (initializedRef.current) return;

    const params = new URLSearchParams(searchParams);
    let needsUpdate = false;

    if (!params.has('minimumRank')) {
      params.set('minimumRank', DEFAULT_MIN_RANK);
      needsUpdate = true;
    }

    if (!params.has('maximumRank')) {
      params.set('maximumRank', DEFAULT_MAX_RANK);
      needsUpdate = true;
    }

    if (needsUpdate) {
      setSearchParams(params, { replace: true });
    }

    initializedRef.current = true;
  }, [searchParams, setSearchParams]);

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
