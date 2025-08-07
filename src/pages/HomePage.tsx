import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ExternalLink } from 'lucide-react';
import useSearchQuery from '@/hooks/useSearchQuery';
import LestSkeleton from '@/components/ListSkeleton';

const HomePage = () => {
  const { inputValue, handleInputChange, profileData, loading } =
    useSearchQuery();

  const countryCodeToFlagEmoji = (code: string | null) => {
    if (!code) return null;
    const upper = code.trim().toUpperCase();
    if (upper.length !== 2) return upper;
    const OFFSET = 127397;
    const chars = Array.from(upper).map((c) =>
      String.fromCodePoint(c.charCodeAt(0) + OFFSET)
    );
    return chars.join('');
  };

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

      <div className="mx-auto w-full max-w-2xl">
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
        {loading ? (
          <LestSkeleton />
        ) : profileData && profileData.length > 0 ? (
          <ul className="space-y-3">
            {profileData.map((player) => (
              <li
                key={player.account_id}
                className="group bg-card/50 hover:bg-accent/50 supports-[backdrop-filter]:bg-card/40 rounded-xl border p-4 shadow-sm backdrop-blur transition-colors"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={
                      player.avatarmedium || player.avatar || player.avatarfull
                    }
                    alt={player.personaname}
                    className="size-12 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate text-base font-semibold">
                        {player.personaname}
                      </h3>
                      {player.countrycode && (
                        <span className="text-xl" title={player.countrycode}>
                          {countryCodeToFlagEmoji(player.countrycode)}
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground mt-0.5 line-clamp-1 text-sm">
                      {player.realname || 'Unknown name'} · ID:{' '}
                      {player.account_id}
                    </p>
                  </div>
                  <a
                    href={player.profileurl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="shrink-0"
                    aria-label={`Open ${player.personaname} on Steam`}
                  >
                    <Button variant="outline" size="sm">
                      View on Steam
                      <ExternalLink className="ml-1 size-4" />
                    </Button>
                  </a>
                </div>
              </li>
            ))}
          </ul>
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
