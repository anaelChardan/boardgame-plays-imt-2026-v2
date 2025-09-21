import { BoardgameInventory, Boardgame } from "@boardava/domain";
import bgg from "bgg-sdk";
import { BggThing } from "./types";

export function buildBggBoardgameInventory(): BoardgameInventory {
  async function getBoardgameByName(
    boardgameName: string
  ): Promise<Boardgame | null> {
    const searchResult = await bgg.search({
      query: boardgameName,
      type: ["boardgame"],
      exact: true,
    });

    const boardgameSearchResult = searchResult.items[0];

    if (!boardgameSearchResult) {
      return null;
    }

    const thingResults = await bgg.thing({ id: [boardgameSearchResult.id] });

    const thingResult = thingResults.items[0];

    if (!thingResult) {
      return null;
    }

    return reshapeBggBoardgame(thingResult);
  }

  return {
    getBoardgameByName,
  };
}

function reshapeBggBoardgame(bggBoardgame: BggThing): Boardgame {
  return {
    name: bggBoardgame.names[0]!.value,
    bggId: bggBoardgame.id,
    minNumberOfPlayers: Number(bggBoardgame.minPlayers),
    maxNumberOfPlayers: Number(bggBoardgame.maxPlayers),
  };
}
