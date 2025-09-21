import { Boardgame } from "../model/boardgame";

export type BoardgameInventory = {
  getBoardgameByName: (name: string) => Promise<Boardgame | null>;
};

export const boardgameInventoryStub = {
  getBoardgameByName: async (name: string) => {
    return {
      name,
      bggId: "224517",
      maxNumberOfPlayers: 4,
      minNumberOfPlayers: 2,
    };
  },
};
