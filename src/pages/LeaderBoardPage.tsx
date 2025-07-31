import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTable } from '@/components/ui/data-table';
import useLeaderboardHook from '@/hooks/useLeaderboardHook';
import TableSkeleton from '@/components/TableSkeleton';
import type { ColumnDef } from '@tanstack/react-table';
import type { leaderboard } from '@/types/leaderboard';
// Pagination components now imported in PaginatedNavigation
import PaginatedNavigation from '@/components/PaginatedTemplate';

const LeaderboardPage = () => {
  const {
    loading,
    error,
    region,
    Regions,
    // allPages,
    goToPage,
    totalPages,
    currentPage,
    paginatedData,
    onRegionChange,
  } = useLeaderboardHook();

  const columns: ColumnDef<leaderboard>[] = [
    {
      accessorKey: 'rank',
      header: 'Rank',
    },
    {
      accessorKey: 'account_name',
      header: 'Name',
    },
    {
      accessorKey: 'badge_image',
      header: 'Rank Badge',
      cell: ({ row }) => (
        <div className="flex justify-center">
          <img
            src={row.original.badge_image}
            alt="Rank badge"
            className="h-8 w-8 rounded-full"
            loading="lazy"
          />
        </div>
      ),
    },
  ];

  if (error) {
    return (
      <div className="flex items-center justify-center py-10">
        <span className="text-lg text-red-500 dark:text-red-400">{error}</span>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4">
      <header className="pt-4">
        <h1 className="text-center text-3xl font-bold md:text-5xl">
          Welcome to the Leaderboard
        </h1>
      </header>

      <div className="flex justify-center gap-2 pt-5">
        <Tabs
          value={region}
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
            <DataTable columns={columns} data={paginatedData} />
          </div>

          <PaginatedNavigation
            totalPages={totalPages}
            currentPage={currentPage}
            goToPage={goToPage}
          />
        </div>
      )}
    </section>
  );
};

export default LeaderboardPage;
