import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { PrismaClient } from '@prisma/client';
import { buildPlayAGame } from './domain/play-a-game.js';
import { fixtureCatalogue } from './infrastructure/fixture-catalogue.js';
import { buildPrismaStore } from './infrastructure/prisma-store.js';

console.log('07 · Prisma / SQLite : une partie survit à la fermeture de la connexion');
const dir = mkdtempSync(resolve(tmpdir(), 'imt-demo-'));
const url = 'file:' + resolve(dir, 'demo.db');
let client: PrismaClient | undefined;
try {
  const setup = spawnSync(process.execPath, ['node_modules/prisma/build/index.js', 'db', 'push', '--skip-generate'], {
    env: { ...process.env, RUST_LOG: 'info', DATABASE_URL: url }, encoding: 'utf8',
  });
  if (setup.error) throw setup.error;
  assert.equal(setup.status, 0, setup.stderr || setup.stdout);
  client = new PrismaClient({ datasources: { db: { url } } });
  const store = buildPrismaStore(client);
  const play = buildPlayAGame(fixtureCatalogue, store);
  const result = await play({ boardgameName: 'Azul', players: ['Alice', 'Bob'] });
  console.log('Partie écrite dans une base SQLite temporaire :', result);
  await assert.rejects(() => play({ boardgameName: 'Azul', players: ['Alice'] }), /entre 2 et 4/);
  await client.$disconnect();
  console.log('Première connexion fermée. Nouvelle instance Prisma…');
  client = new PrismaClient({ datasources: { db: { url } } });
  const persisted = await buildPrismaStore(client).all();
  assert.deepEqual(persisted, [result]);
  console.log('Après reconnexion → 1 partie conservée :', persisted);
} finally {
  try { await client?.$disconnect(); }
  finally { rmSync(dir, { recursive: true, force: true }); }
}
console.log('Base temporaire supprimée ; votre base de travail reste intacte.');
