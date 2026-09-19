import assert from 'node:assert/strict';
import { buildPlayAGame } from './domain/play-a-game.js';
import { fixtureCatalogue } from './infrastructure/fixture-catalogue.js';
import { buildMemoryStore } from './infrastructure/memory-store.js';
import { buildHttp } from './infrastructure/http.js';

console.log('06 · PlayWriter : annoncer la création après la sauvegarde');
const store = buildMemoryStore();
const play = buildPlayAGame(fixtureCatalogue, store);
const app = buildHttp(play);
try {
  assert.equal((await store.all()).length, 0);
  console.log('Avant la demande : 0 partie en mémoire.');
  const response = await app.inject({ method: 'POST', url: '/plays', payload: { boardgameName: 'Azul', players: ['Alice', 'Bob'] } });
  assert.equal(response.statusCode, 201);
  assert.deepEqual(await store.all(), [response.json()]);
  console.log('HTTP 201 → partie effectivement sauvegardée :', await store.all());
  await assert.rejects(() => play({ boardgameName: 'Azul', players: ['Alice'] }), /entre 2 et 4/);
  assert.equal((await store.all()).length, 1);
  console.log('Partie refusée → toujours 1 partie en mémoire.');
  const failedWrite = new Error('Stockage indisponible');
  const fail = buildPlayAGame(fixtureCatalogue, { async save() { throw failedWrite; } });
  await assert.rejects(() => fail({ boardgameName: 'Azul', players: ['Alice', 'Bob'] }), error => error === failedWrite);
  console.log('Writer en panne → le cas d’usage échoue, aucune réussite annoncée.');
  console.log('Mémoire du processus uniquement ; la persistance arrive à 07.');
} finally { await app.close(); }
