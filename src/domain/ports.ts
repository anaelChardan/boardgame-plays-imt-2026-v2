import type { Boardgame, Play } from './model.js';
/** Nom inconnu : null. Panne technique : CatalogUnavailable. */
export interface BoardgameInventory {
  getBoardgameByName(name: string): Promise<Boardgame | null>;
}

export interface PlayWriter {
  save(play: Play): Promise<void>;
}
export interface PlayReader {
  all(): Promise<Play[]>;
}
