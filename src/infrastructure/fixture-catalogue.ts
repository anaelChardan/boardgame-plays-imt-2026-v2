import type { BoardgameInventory } from '../domain/ports.js';
import { games } from './fixtures.js';
export const fixtureCatalogue: BoardgameInventory = {
  async getBoardgameByName(name) {
    const game = games.find(game => game.name.toLowerCase() === name.toLowerCase());
    return game ? {...game} : null;
  },
};
