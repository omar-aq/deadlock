import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useLeaderboardHook from '@/hooks/useLeaderboardHook';

const LeaderboardPage = () => {
  const { leaderboard, region, Regions, onRegionChange } = useLeaderboardHook();
  console.log(leaderboard);

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
    </section>
  );
};

export default LeaderboardPage;
