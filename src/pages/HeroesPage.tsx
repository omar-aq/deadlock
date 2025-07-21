import type { HeroTableRow } from '../types/hero';
import useHeroesHooks from '@/hooks/useHeroesHooks';
import CustomSelect from '../components/ui/CustomSelect';
import TableSkeleton from '../components/TableSkeleton';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { DataTable } from '../components/ui/data-table';
import { ArrowUpDown } from 'lucide-react';
import type { ColumnDef } from '@tanstack/react-table';

const HeroesPage = () => {
  const {
    loading,
    error,
    data,
    minimumRankParam,
    maximumRankParam,
    setMinimumRank,
    setMaximumRank,
    formattedRanks,
    highestWinRate,
    highestPickRate,
  } = useHeroesHooks();

  if (error) {
    return (
      <div className="flex items-center justify-center py-10">
        <span className="text-lg text-red-500 dark:text-red-400">{error}</span>
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
      <header className="pt-4">
        <h1 className="text-center text-3xl font-bold md:text-5xl">
          Heroes Stats
        </h1>
      </header>
      <div className="flex justify-center gap-2 pt-5">
        <CustomSelect
          value={minimumRankParam}
          onValueChange={setMinimumRank}
          formattedRanks={formattedRanks}
          placeholder="Minimum Ranks"
        />
        <CustomSelect
          value={maximumRankParam}
          onValueChange={setMaximumRank}
          formattedRanks={formattedRanks}
          placeholder="Maximum Ranks"
        />
      </div>

      {loading ? (
        <TableSkeleton />
      ) : (
        <div className="w-full overflow-x-auto py-10">
          <div className="min-w-[600px] md:min-w-0">
            <DataTable columns={columns} data={data} />
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroesPage;
