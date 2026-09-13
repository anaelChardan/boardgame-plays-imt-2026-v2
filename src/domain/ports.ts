import type { Boardgame } from './model.js';
/** Nom inconnu : null. Panne technique : CatalogUnavailable. */
export interface BoardgameInventory {
  getBoardgameByName(name: string): Promise<Boardgame | null>;
}
