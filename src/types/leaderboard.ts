export type leaderboard = {
  account_name: string;
  possible_account_ids: Array<number>;
  rank: number;
  top_hero_ids: Array<number>;
  badge_level: number;
  ranked_rank: number;
  ranked_subrank: number;
};

export type leaderboardArray = leaderboard[];
