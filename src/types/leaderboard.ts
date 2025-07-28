export type leaderboard = {
  account_name: string;
  rank: number;
  badge_level: number;
  badge_image: string;
  // possible_account_ids: Array<number>;
  // top_hero_ids: Array<number>;
  // ranked_rank: number;
  // ranked_subrank: number;
};

export type leaderboardArray = leaderboard[];
