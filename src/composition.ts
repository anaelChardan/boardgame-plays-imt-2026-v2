import { PrismaClient } from '@prisma/client';
import { buildPrismaStore } from './infrastructure/prisma-store.js';
import { buildMemoryStore } from './infrastructure/memory-store.js';
import { existsSync } from 'node:fs';
import { fixtureCatalogue } from './infrastructure/fixture-catalogue.js';
import { buildBggCatalogue } from './infrastructure/bgg.js';
import { buildPlayAGame } from './domain/play-a-game.js';
export function compose() {
  if (existsSync('.env')) process.loadEnvFile('.env');
  const kind = process.env.CATALOG ?? 'fixture';
  if (!['fixture','bgg'].includes(kind)) throw new Error('CATALOG : fixture ou bgg');
  const inventory = kind === 'bgg' ? buildBggCatalogue(process.env.BGG_API_TOKEN ?? '') : fixtureCatalogue;
  const storage = process.env.STORAGE ?? 'memory';
  if (!['memory','sqlite'].includes(storage)) throw new Error('STORAGE : memory ou sqlite');
  const client = storage === 'sqlite' ? new PrismaClient({datasources:{db:{url:process.env.DATABASE_URL ?? 'file:./classroom.db'}}}) : undefined;
  const store = client ? buildPrismaStore(client) : buildMemoryStore();
  return {play:buildPlayAGame(inventory, store),store, close:async()=>{await client?.$disconnect();}};
}
