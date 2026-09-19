import { existsSync } from 'node:fs';
import { buildPlayAGame } from './domain/play-a-game.js';
import { buildBggCatalogue } from './infrastructure/bgg.js';
import { fixtureCatalogue } from './infrastructure/fixture-catalogue.js';
import { buildMemoryStore } from './infrastructure/memory-store.js';
export function compose() {
  if (existsSync('.env')) {
    process.loadEnvFile('.env');
  }
  const kind = process.env.CATALOG ?? 'fixture';
  if (!['fixture', 'bgg'].includes(kind)) {
    throw new Error('CATALOG : fixture ou bgg');
  }
  const inventory =
    kind === 'bgg'
      ? buildBggCatalogue(process.env.BGG_API_TOKEN ?? '')
      : fixtureCatalogue;
  const store = buildMemoryStore();
  return { play: buildPlayAGame(inventory, store), store };
}
