import useItemsHooks from '@/hooks/useItemsHooks';
import { DataTable } from './ui/data-table';
import type { ItemStatsFormatted } from '@/types/items';
import type { ColumnDef } from '@tanstack/react-table';

const ItemsPage = () => {
  const { loading, error, data } = useItemsHooks();

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
      header: 'Item Name',
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
      header: 'Tier',
    },
    {
      accessorKey: 'win_rate',
      header: 'Win Rate',
    },
  ];

  return (
    <div className="w-full overflow-x-auto py-10">
      <div className="min-w-[600px] md:min-w-0">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default ItemsPage;
