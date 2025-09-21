import { Boardgame } from "../model/boardgame";

export type BoardgameInventory = {
  getBoardgameByName: (name: string) => Promise<Boardgame | null>;
};
