import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import type { steamProfileArray } from '@/types/steamProfile';

interface ProfileListProps {
  profileData: steamProfileArray;
  countryCodeToFlagEmoji: (code: string | null) => string | null;
}

const ProfileList: React.FC<ProfileListProps> = ({
  profileData,
  countryCodeToFlagEmoji,
}) => (
  <ul className="space-y-3">
    {profileData.map((player) => (
      <li
        key={player.account_id}
        className="group bg-card/50 hover:bg-accent/50 supports-[backdrop-filter]:bg-card/40 rounded-xl border p-4 shadow-sm backdrop-blur transition-colors"
      >
        <div className="flex items-center gap-4">
          <img
            src={player.avatarmedium || player.avatar || player.avatarfull}
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
              {player.realname || 'Unknown name'} · ID: {player.account_id}
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
);

export default ProfileList;
