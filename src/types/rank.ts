export interface Rank {
  tier: number;
  name: string;
  images: Record<string, string>;
  color: string;
}
export interface SelectRankOption {
  tier: number;
  name: string;
  image: string;
}

export type Ranks = Rank[];
