export interface steamProfile {
  account_id: number;
  avatar: string;
  avatarfull: string;
  avatarmedium: string;
  countrycode: string | null;
  last_updated: number;
  personaname: string;
  profileurl: string;
  realname: string | null;
}
export type steamProfileArray = steamProfile[];
