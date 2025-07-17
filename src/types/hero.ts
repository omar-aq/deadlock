export interface Hero {
  id: number;
  class_name: string;
  name: string;
  description: {
    lore: string;
    role: string;
    playstyle: string;
  };
  recommended_upgrades: string[];
  recommended_ability_order: string[];
  player_selectable: boolean;
  disabled: boolean;
  in_development: boolean;
  needs_testing: boolean;
  assigned_players_only: boolean;
  limited_testing: boolean;
  complexity: number;
  skin: number;
  images: {
    icon_hero_card: string;
    icon_hero_card_webp: string;
    icon_image_small: string;
    icon_image_small_webp: string;
    minimap_image: string;
    minimap_image_webp: string;
    selection_image: string;
    selection_image_webp: string;
    top_bar_image: string;
    top_bar_image_webp: string;
  };
  items: Record<string, string>;
  starting_stats: Record<string, { value: number; display_stat_name: string }>;
  item_slot_info: Record<string, { max_purchases_for_tier: number[] }>;
  physics: {
    collision_height: number;
    collision_radius: number;
    stealth_speed_meters_per_second: number;
    step_height: number;
  };
  colors: Record<string, number[]>;
  shop_stat_display: Record<string, unknown>;
  cost_bonuses: Record<
    string,
    Array<{ gold_threshold: number; bonus: number; percent_on_graph: number }>
  >;
  stats_display: Record<string, unknown>;
  hero_stats_ui: Record<string, unknown>;
  level_info: Record<string, unknown>;
  scaling_stats: Record<string, unknown>;
  purchase_bonuses: Record<
    string,
    Array<{ value_type: string; tier: number; value: string }>
  >;
  standard_level_up_upgrades: Record<string, number>;
}

export type Heroes = Hero[];

export type HeroTableRow = {
  id: number;
  heroImage: string;
  heroName: string;
  winRate: string;
  pickRate: string;
  kda: string;
  matches: number;
};

export interface HeroesStats {
  hero_id: number;
  bucket: string | null;
  wins: number;
  losses: number;
  matches: number;
  matches_per_bucket: number;
  players: number;
  total_kills: number;
  total_deaths: number;
  total_assists: number;
  total_net_worth: number;
  total_last_hits: number;
  total_denies: number;
  total_player_damage: number;
  total_player_damage_taken: number;
  total_boss_damage: number;
  total_creep_damage: number;
  total_neutral_damage: number;
  total_max_health: number;
  total_shots_hit: number;
  total_shots_missed: number;
}

export type HeroesStatsArray = HeroesStats[];

export type PatchGuid = {
  text: string;
  permaLink: boolean;
};

export type PatchCategory = {
  domain: string;
  text: string;
};

export type PatchInfo = {
  title: string;
  pubDate: string;
  link: string;
  guid: PatchGuid;
  author: string;
  category: PatchCategory;
  dcCreator: string;
  contentEncoded: string;
  slashComments: string;
  pubDateFormatted: string | null;
  versionDate: string;
  cleanContent: string;
};

export type PatchInfoArray = PatchInfo[];
