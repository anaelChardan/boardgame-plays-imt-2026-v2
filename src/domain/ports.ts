import type { Boardgame } from './model.js';
/** Nom inconnu : null. Panne technique : CatalogUnavailable. */
export interface BoardgameInventory {
  getBoardgameByName(name: string): Promise<Boardgame | null>;
}

import type { Play } from './model.js';
export interface PlayWriter { save(play: Play): Promise<void> }
export interface PlayReader { all(): Promise<Play[]> }
