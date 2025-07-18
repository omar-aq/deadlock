import type { HeroTableRow } from '../types/hero';
import useHeroesHooks from '@/hooks/useHeroesHooks';
import CustomSelect from './ui/CustomSelect';
import HeroesTableSkeleton from './HeroesTableSkeleton';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { DataTable } from './ui/data-table';
import { ArrowUpDown } from 'lucide-react';
import type { ColumnDef } from '@tanstack/react-table';

export function HeroesList() {
  const {
    loading,
    error,
    data,
    heroes,
    heroesStats,
    formattedRanks,
    minimumRank,
    maximumRank,
    highestWinRate,
    highestPickRate,
    minimumRankChange,
    maximumRankChange,
  } = useHeroesHooks();

  if (error) {
    return (
      <div className="flex items-center justify-center py-10">
        <span className="text-lg text-red-500 dark:text-red-400">{error}</span>
      </div>
    );
  }

  if (!loading && (heroes?.length === 0 || heroesStats?.length === 0)) {
    return (
      <div className="flex items-center justify-center py-10">
        <span className="text-lg text-gray-500 dark:text-gray-300">
          No heroes found.
        </span>
      </div>
    );
  }

  const columns: ColumnDef<HeroTableRow>[] = [
    {
      accessorKey: '#',
      header: '#',
      cell: ({ row }) => <span>{row.index + 1}</span>,
    },
    {
      accessorKey: 'heroImage',
      header: () => <div className="ps-2 text-start">Hero</div>,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <img
            src={row.original.heroImage}
            alt={row.original.heroName}
            className="h-8 w-8 rounded-full"
          />
          <span className="whitespace-nowrap">{row.original.heroName}</span>
        </div>
      ),
    },
    {
      accessorKey: 'winRate',
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
      cell: ({ row }) => (
        <div className="flex flex-col justify-start gap-2">
          <Progress
            value={(Number(row.original.winRate) / highestWinRate) * 100}
          />
          <span className="text-start">{row.original.winRate}%</span>
        </div>
      ),
    },
    {
      accessorKey: 'pickRate',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Pick Rate
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="flex flex-col justify-start gap-2">
          <Progress
            value={(Number(row.original.pickRate) / highestPickRate) * 100}
          />
          <span className="text-start">{row.original.pickRate}%</span>
        </div>
      ),
    },
    {
      accessorKey: 'kda',

      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            K / D / A
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: 'matches',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Matches
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
  ];

  return (
    <section className="container mx-auto px-4">
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

      {loading ? (
        <HeroesTableSkeleton />
      ) : (
        <div className="w-full overflow-x-auto py-10">
          <div className="min-w-[600px] md:min-w-0">
            <DataTable columns={columns} data={data} />
          </div>
        </div>
      )}
    </section>
  );
}
