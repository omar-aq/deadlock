import { useEffect, useMemo, useState } from 'react';
import type { Item, ItemStatsArray, ItemStatsFormatted } from '@/types/items';
import { GetItems, GetItemsStats } from '@/services/apis/itemsService';
import useRanks from './useRanks';

const useItemsHooks = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [itemStats, setItemStats] = useState<ItemStatsArray>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [minimumRank, setMinimumRank] = useState<number>(() => {
    const saved = localStorage.getItem('minimumRank');
    return saved ? parseInt(saved) : 91;
  });
  const [maximumRank, setMaximumRank] = useState<number>(() => {
    const saved = localStorage.getItem('maximumRank');
    return saved ? parseInt(saved) : 116;
  });

  const { formattedRanks } = useRanks();

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const itemsData = await GetItems();
        setItems(itemsData);
      } catch (err) {
        console.error('Error fetching items:', err);
        setError('Failed to load items. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  useEffect(() => {
    const fetchItemStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const itemStatsData = await GetItemsStats(minimumRank, maximumRank);
        setItemStats(itemStatsData);
      } catch (err) {
        console.error('Error fetching item stats:', err);
        setError('Failed to load item stats. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchItemStats();
  }, [minimumRank, maximumRank]);

  useEffect(() => {
    localStorage.setItem('minimumRank', minimumRank.toString());
  }, [minimumRank]);

  useEffect(() => {
    localStorage.setItem('maximumRank', maximumRank.toString());
  }, [maximumRank]);

  const minimumRankChange = (value: string) => {
    setMinimumRank(parseInt(value));
  };

  const maximumRankChange = (value: string) => {
    setMaximumRank(parseInt(value));
  };

  const filteredItems = items?.filter((item) => item?.type === 'upgrade');
  const highestItemUsage = Math.max(
    ...itemStats.map((stat) => stat?.matches || 0)
  );
  const highestWinRate = Math.max(
    ...itemStats.map((stat) => (stat?.wins / stat?.matches) * 100 || 0)
  );

  const itemsMap = useMemo(() => {
    const map: Record<string, Item> = {};
    filteredItems.forEach((item) => {
      map[item.id] = item;
    });
    return map;
  }, [filteredItems]);

  const data: ItemStatsFormatted[] = useMemo(() => {
    return itemStats.map((stat) => {
      const item = itemsMap[stat?.item_id];
      return {
        item_id: stat?.item_id,
        win_rate: ((stat?.wins / stat?.matches) * 100).toFixed(2),
        matches: stat?.matches,
        name: item?.name,
        item_tier: item?.item_tier,
        shop_image_small: item?.shop_image_small,
      };
    });
  }, [itemsMap, itemStats]);

  return {
    data,
    items,
    error,
    loading,
    itemStats,
    maximumRank,
    minimumRank,
    maximumRankChange,
    minimumRankChange,
    highestItemUsage,
    highestWinRate,
    formattedRanks,
  };
};

export default useItemsHooks;
