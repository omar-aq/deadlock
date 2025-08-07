import { Input } from '@/components/ui/input';
import useSearchQuery from '@/hooks/useSearchQuery';

const HomePage = () => {
  const { inputValue, handleInputChange } = useSearchQuery();

  return (
    <section className="container mx-auto px-4">
      <header className="pt-4">
        <h1 className="text-center text-3xl font-bold md:text-5xl">
          Welcome to Deadlock Stats
        </h1>
      </header>
      <p className="pt-2 text-center text-lg">
        Explore detailed statistics for items and heroes.
      </p>
      <div className="flex justify-center pt-4">
        <Input
          placeholder="Search for a player..."
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
    </section>
  );
};

export default HomePage;
