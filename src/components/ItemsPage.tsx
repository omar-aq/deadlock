import useItemsHooks from '@/hooks/useItemsHooks';
import { DataTable } from './ui/data-table';
import { Button } from './ui/button';
import { ArrowUpDown } from 'lucide-react';
import type { ItemStatsFormatted } from '@/types/items';
import type { ColumnDef } from '@tanstack/react-table';
import CustomSelect from './ui/CustomSelect';

const ItemsPage = () => {
  const {
    loading,
    error,
    data,
    minimumRank,
    maximumRank,
    formattedRanks,
    minimumRankChange,
    maximumRankChange,
  } = useItemsHooks();

  if (error) {
    return (
      <div className="flex items-center justify-center py-10">
        <span className="text-lg text-red-500 dark:text-red-400">{error}</span>
      </div>
    );
  }

  if (!loading && (!data || data.length === 0)) {
    return (
      <div className="flex items-center justify-center py-10">
        <span className="text-lg text-gray-500 dark:text-gray-300">
          No data available
        </span>
      </div>
    );
  }

  const columns: ColumnDef<ItemStatsFormatted>[] = [
    {
      accessorKey: '#',
      header: '#',
      cell: ({ row }) => <span>{row.index + 1}</span>,
    },
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <div className="text-start">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              Item
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <img
            src={row.original.shop_image_small}
            alt={row.original.name}
            className="h-8 w-8 rounded-full"
          />
          <span>{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: 'item_tier',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Tier
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: 'win_rate',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Win Rate
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
  ];

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex justify-center gap-2 pt-5">
        <CustomSelect
          value={minimumRank.toString()}
          onValueChange={minimumRankChange}
          formattedRanks={formattedRanks}
          placeholder="Minimum Ranks"
        />
        <CustomSelect
          value={maximumRank.toString()}
          onValueChange={maximumRankChange}
          formattedRanks={formattedRanks}
          placeholder="Maximum Ranks"
        />
      </div>

      <div className="w-full overflow-x-auto py-10">
        <div className="min-w-[600px] md:min-w-0">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </section>
  );
};

export default ItemsPage;
