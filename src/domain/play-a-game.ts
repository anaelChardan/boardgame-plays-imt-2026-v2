import type { Play, PlayRequest } from './model.js';
import type { BoardgameInventory } from './ports.js';
import { BoardgameNotFound, InvalidPlayerCount, InvalidParticipants } from './errors.js';
export type PlayAGame = (request: PlayRequest) => Promise<Play>;
export function buildPlayAGame(inventory: BoardgameInventory): PlayAGame {
  return async ({boardgameName, players}) => {
    const names = players.map(name => name.trim());
    if (names.some(name => name.length === 0)) throw new InvalidParticipants();
    const game = await inventory.getBoardgameByName(boardgameName.trim());
    if (!game) throw new BoardgameNotFound();
    if (names.length < game.minNumberOfPlayers || names.length > game.maxNumberOfPlayers) {
      throw new InvalidPlayerCount(game.minNumberOfPlayers, game.maxNumberOfPlayers);
    }
    const play = {boardgameName:game.name,bggId:game.bggId,players:names};
    return play;
  };
}
