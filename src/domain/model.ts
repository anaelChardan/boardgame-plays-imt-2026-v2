export type Boardgame = {
  name: string;
  bggId: string;
  minNumberOfPlayers: number;
  maxNumberOfPlayers: number;
};
export type Play = { boardgameName: string; bggId: string; players: string[] };
export type PlayRequest = { boardgameName: string; players: string[] };
