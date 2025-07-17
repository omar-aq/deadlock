export type ItemDescription = {
  desc: string;
  quip: string;
  t1_desc: string;
  t2_desc: string;
  t3_desc: string;
  active: string;
  passive: string;
};

export type ItemTooltipDetails = {
  info_sections: Array<{
    loc_string: string;
    property_upgrade_required: string;
    properties_block: Array<{
      loc_string: string;
      properties: Array<{
        requires_ability_upgrade: boolean;
        show_property_value: boolean;
        important_property: string;
        status_effect_value: string;
        status_effect_name: string;
        important_property_icon: string;
      }>;
    }>;
    basic_properties: string[];
  }>;
  additional_header_properties: string[];
};

export type ItemUpgrade = {
  property_upgrades: Array<{
    name: string;
    bonus: string;
    scale_stat_filter: string;
    upgrade_type: string;
  }>;
};

export type ItemVideos = {
  webm: string;
  mp4: string;
};

export type Item = {
  id: number;
  class_name: string;
  name: string;
  start_trained: boolean;
  image: string;
  image_webp: string;
  hero: number;
  heroes: number[];
  update_time: number;
  type: string;
  item_tier: number;
  shop_image_small: string;
  behaviours: string[];
  description: ItemDescription;
  tooltip_details: ItemTooltipDetails;
  upgrades: ItemUpgrade[];
  ability_type: string;
  boss_damage_scale: number;
  dependant_abilities: string[];
  videos: ItemVideos;
};

export type Items = Item[];

export type ItemStats = {
  bucket: string | null;
  item_id: number;
  losses: number;
  matches: number;
  players: number;
  wins: number;
};

export type ItemStatsArray = ItemStats[];

export type ItemStatsFormatted = {
  item_id: number;
  matches: number;
  name: string;
  item_tier: number;
  shop_image_small: string;
  win_rate: string;
};
