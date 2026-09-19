import assert from 'node:assert/strict';
import { buildPlayAGame } from './domain/play-a-game.js';
import { fixtureCatalogue } from './infrastructure/fixture-catalogue.js';
import { buildMemoryStore } from './infrastructure/memory-store.js';
import { buildHttp } from './infrastructure/http.js';
import { runCli } from './infrastructure/cli.js';

const store = buildMemoryStore();
const play = buildPlayAGame(fixtureCatalogue, store);
const http = buildHttp(play, store);

console.log('09 · Nouvelle règle : noms uniques après suppression des espaces et normalisation de la casse');
try {
  const request = { boardgameName: 'Azul', players: ['Alice', ' alice '] };
  const response = await http.inject({ method: 'POST', url: '/plays', payload: request });
  assert.equal(response.statusCode, 422);
  assert.match(response.json().error, /unique/);
  console.log('Alice / " alice " via HTTP → 422 :', response.json());
  const output: string[] = [];
  const status = await runCli(['Azul', ...request.players], play, line => output.push(line));
  assert.equal(status, 1);
  assert.match(output[0]!, /unique/);
  assert.equal((await store.all()).length, 0);
  console.log('Même demande via CLI → code 1 :', output[0]);
  console.log('Les deux refus laissent le stockage vide. Une règle métier protège les deux entrées.');
  const accepted = await http.inject({ method: 'POST', url: '/plays', payload: { ...request, players: ['Alice', 'Bob'] } });
  assert.equal(accepted.statusCode, 201);
  assert.equal((await store.all()).length, 1);
  console.log('Alice / Bob → HTTP 201, 1 partie sauvegardée.');
} finally { await http.close(); }
