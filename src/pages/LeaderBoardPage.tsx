import useLeaderboardHook from '@/hooks/useLeaderboardHook';

const LeaderboardPage = () => {
  const { leaderboard } = useLeaderboardHook();
  console.log(leaderboard);

  return (
    <section className="container mx-auto px-4">
      <header className="pt-4">
        <h1 className="text-center text-3xl font-bold md:text-5xl">
          Welcome to the leaderBoard
        </h1>
      </header>
    </section>
  );
};

export default LeaderboardPage;
