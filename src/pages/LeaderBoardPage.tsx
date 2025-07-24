import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTable } from '@/components/ui/data-table';
import useLeaderboardHook from '@/hooks/useLeaderboardHook';
import TableSkeleton from '@/components/TableSkeleton';
import type { ColumnDef } from '@tanstack/react-table';
import type { leaderboard } from '@/types/leaderboard';

const LeaderboardPage = () => {
  const { loading, error, leaderboard, region, Regions, onRegionChange } =
    useLeaderboardHook();
  //TODO: add pagination on Front-End side because backend is not supported, and add rank_badge image from ranks API

  if (error) {
    return (
      <div className="flex items-center justify-center py-10">
        <span className="text-lg text-red-500 dark:text-red-400">{error}</span>
      </div>
    );
  }

  const columns: ColumnDef<leaderboard>[] = [
    {
      accessorKey: 'rank',
      header: 'Rank',
      cell: ({ row }) => <span>{row.original.rank}</span>,
    },
    {
      accessorKey: 'account_name',
      header: 'Name',
      cell: ({ row }) => <span>{row.original.account_name}</span>,
    },
    {
      accessorKey: 'badge_level',
      header: 'Rank Badge',
      cell: ({ row }) => <span>{row.original.badge_level}</span>,
    },
  ];

  return (
    <section className="container mx-auto px-4">
      <header className="pt-4">
        <h1 className="text-center text-3xl font-bold md:text-5xl">
          Welcome to the leaderBoard
        </h1>
      </header>
      <div className="flex justify-center gap-2 pt-5">
        <Tabs
          value={region}
          defaultValue={region}
          onValueChange={onRegionChange}
          className="w-[400px]"
        >
          <TabsList>
            {Regions.map((region) => (
              <TabsTrigger key={region} value={region}>
                {region}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      {loading ? (
        <TableSkeleton />
      ) : (
        <div className="w-full overflow-x-auto py-10">
          <div className="min-w-[600px] md:min-w-0">
            <DataTable columns={columns} data={leaderboard} />
          </div>
        </div>
      )}
    </section>
  );
};

export default LeaderboardPage;
