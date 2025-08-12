import React from 'react';
import { formatNumberCompact } from '@/lib/utils';

interface TeamProps {
  team: Array<{
    account_id: number;
    hero_id: number;
  }>;
  heroIdToImage: Map<number, string>;
  playerRankImageById: Map<number, string>;
  teamName: string;
  netWorth: number;
  colorClass: string;
}

const Team: React.FC<TeamProps> = ({
  team,
  heroIdToImage,
  playerRankImageById,
  teamName,
  netWorth,
  colorClass,
}) => (
  <div className="rounded-lg border p-3">
    <div className="mb-3 flex items-center justify-between gap-2">
      <span className={`inline-flex items-center gap-2 text-sm font-medium`}>
        <span className={`size-2 rounded-full ${colorClass}`} />
        {teamName}
      </span>
      <span
        className="rounded-md border px-2 py-1 text-xs"
        title={`Net Worth: ${netWorth.toLocaleString()}`}
      >
        NW: {formatNumberCompact(netWorth)}
      </span>
    </div>
    <ul className="space-y-2">
      {team.map((player) => {
        const heroSrc = heroIdToImage.get(player.hero_id);
        const rankSrc = playerRankImageById.get(player.account_id);
        return (
          <li
            key={player.account_id}
            className="flex items-center justify-between gap-3"
          >
            <div className="flex min-w-0 items-center gap-3">
              {heroSrc ? (
                <img
                  src={heroSrc}
                  alt={`Hero ${player.hero_id}`}
                  className="ring-border size-10 rounded-full object-cover ring-1"
                  loading="lazy"
                />
              ) : (
                <div
                  className="bg-accent/30 size-10 rounded-full"
                  aria-hidden
                />
              )}
              <div className="flex min-w-0 items-center gap-2">
                {rankSrc ? (
                  <img
                    src={rankSrc}
                    alt="rank"
                    className="size-4 rounded"
                    loading="lazy"
                  />
                ) : (
                  <span
                    className="bg-accent/40 inline-block size-4 rounded"
                    aria-hidden
                  />
                )}
                <span className="text-muted-foreground truncate font-mono text-xs">
                  {player.account_id}
                </span>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  </div>
);

export default Team;
