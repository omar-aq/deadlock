import React from 'react';
import Team from '@/components/Team';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import type { MatchArray } from '@/types/matches';

interface MatchesCarouselProps {
  topFiveMatches: MatchArray;
  heroIdToImage: Map<number, string>;
  playerRankImageById: Map<number, string>;
}

const MatchesCarousel: React.FC<MatchesCarouselProps> = ({
  topFiveMatches,
  heroIdToImage,
  playerRankImageById,
}) => {
  return (
    <Carousel
      className="relative"
      opts={{
        loop: true,
        align: 'start',
        skipSnaps: true,
      }}
    >
      <CarouselContent>
        {topFiveMatches.map((match, idx) => {
          const team0 = match.players.filter((player) => player.team === 0);
          const team1 = match.players.filter((player) => player.team === 1);
          return (
            <CarouselItem
              key={`${match.match_id}-${idx}`}
              className="basis-full"
            >
              <div className="bg-card/50 supports-[backdrop-filter]:bg-card/40 rounded-xl border p-6 shadow-sm backdrop-blur">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground text-sm font-medium">
                      Match
                    </span>
                    <span className="text-lg font-semibold">
                      #{match.match_id}
                    </span>
                    <span className="bg-border hidden h-4 w-px md:inline-block" />
                    <span className="text-muted-foreground text-sm">
                      {match.region_mode_parsed}
                    </span>
                  </div>
                </div>
                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <Team
                    team={team0}
                    heroIdToImage={heroIdToImage}
                    playerRankImageById={playerRankImageById}
                    teamName="Amber Hand"
                    netWorth={match.net_worth_team_0}
                    colorClass="bg-amber-500"
                  />
                  <Team
                    team={team1}
                    heroIdToImage={heroIdToImage}
                    playerRankImageById={playerRankImageById}
                    teamName="Sapphire Flame"
                    netWorth={match.net_worth_team_1}
                    colorClass="bg-sky-500"
                  />
                </div>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="-left-6 md:-left-9" />
      <CarouselNext className="-right-6 md:-right-9" />
    </Carousel>
  );
};

export default React.memo(MatchesCarousel);
