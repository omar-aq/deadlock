export type MatchPlayer = {
  account_id: number;
  team: number;
  team_parsed: string;
  abandoned: null | boolean;
  hero_id: number;
};

export type Match = {
  start_time: number;
  winning_team: null | number;
  winning_team_parsed: null | string;
  match_id: number;
  players: MatchPlayer[];
  lobby_id: number;
  game_mode_version: number;
  net_worth_team_0: number;
  net_worth_team_1: number;
  duration_s: null | number;
  spectators: number;
  open_spectator_slots: number;
  objectives_mask_team0: number;
  objectives_mask_team1: number;
  match_mode: number;
  match_mode_parsed: string;
  game_mode: number;
  game_mode_parsed: string;
  match_score: number;
  region_mode: number;
  region_mode_parsed: string;
  compat_version: number;
};

export type MatchArray = Match[];
