import { Button } from '@/components/ui/button';

const HomePage = () => {
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
      <div className="flex justify-center pt-2">
        <Button className="ml-4">Get Started</Button>
      </div>
    </section>
  );
};

export default HomePage;
