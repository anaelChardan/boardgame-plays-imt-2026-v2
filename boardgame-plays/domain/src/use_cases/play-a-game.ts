import { Play } from "../model/play";

// This is the left side port of the hexagon
export type PlayAGame = {
  forBoardgame: (boardgameName: string, players: string[]) => Promise<Play>;
};
