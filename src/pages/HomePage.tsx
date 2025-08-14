import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import TeamSkeleton from '@/components/Teamskeleton';
import useHome from '@/hooks/useHome';
import LestSkeleton from '@/components/ListSkeleton';
import MatchesCarousel from '@/components/MatchesCarousel';
import ProfileList from '@/components/ProfileList';

const HomePage = () => {
  const {
    inputValue,
    profileData,
    heroIdToImage,
    matchesLoading,
    profileLoading,
    topFiveMatches,
    handleInputChange,
    playerRankImageById,
    countryCodeToFlagEmoji,
  } = useHome();

  return (
    <section className="container mx-auto px-4">
      <header className="py-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="from-foreground to-foreground/60 bg-gradient-to-b bg-clip-text text-3xl font-bold text-balance text-transparent md:text-5xl">
            Welcome to Deadlock Stats
          </h1>
          <p className="text-muted-foreground mt-3 text-base md:text-lg">
            Search for players and explore detailed statistics across items and
            heroes.
          </p>
        </div>
      </header>

      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="from-foreground to-foreground/60 bg-gradient-to-b bg-clip-text text-2xl font-semibold text-balance text-transparent md:text-3xl">
            Top Active Matches
          </h2>
        </div>

        {matchesLoading ? (
          <TeamSkeleton />
        ) : (
          <MatchesCarousel
            topFiveMatches={topFiveMatches}
            heroIdToImage={heroIdToImage}
            playerRankImageById={playerRankImageById}
          />
        )}
      </div>

      <div className="mx-auto mt-10 w-full max-w-2xl">
        <div className="relative">
          <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2" />
          <Input
            placeholder="Search for a player..."
            value={inputValue}
            onChange={handleInputChange}
            className="h-11 pl-11"
            aria-label="Search for a player"
          />
        </div>
      </div>

      <div className="mx-auto mt-6 w-full max-w-3xl">
        {profileLoading ? (
          <LestSkeleton />
        ) : profileData && profileData.length > 0 ? (
          <ProfileList
            profileData={profileData}
            countryCodeToFlagEmoji={countryCodeToFlagEmoji}
          />
        ) : inputValue.trim().length > 0 ? (
          <div className="bg-card/50 text-muted-foreground rounded-xl border p-8 text-center">
            No players found. Try a different search term.
          </div>
        ) : (
          <div className="bg-card/50 text-muted-foreground rounded-xl border p-8 text-center">
            Start by searching for a player above.
          </div>
        )}
      </div>
    </section>
  );
};

export default HomePage;
