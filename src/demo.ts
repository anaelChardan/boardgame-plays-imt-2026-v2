import assert from 'node:assert/strict';
import { buildPlayAGame } from './domain/play-a-game.js';
import { runCli } from './infrastructure/cli.js';
import { fixtureCatalogue } from './infrastructure/fixture-catalogue.js';
import { buildHttp } from './infrastructure/http.js';
import { buildMemoryStore } from './infrastructure/memory-store.js';

const store = buildMemoryStore();
const play = buildPlayAGame(fixtureCatalogue, store);
const http = buildHttp(play, store);

console.log(
  '08 · HTTP et CLI : deux adaptateurs primaires, le même cas d’usage',
);
console.log(
  'Démonstration dans un processus, avec une mémoire partagée et HTTP interne.',
);
try {
  const request = { boardgameName: 'Azul', players: ['Alice', 'Bob'] };
  const response = await http.inject({
    method: 'POST',
    url: '/plays',
    payload: request,
  });
  assert.equal(response.statusCode, 201);
  const output: string[] = [];
  const status = await runCli(['Azul', 'Alice', 'Bob'], play, (line) =>
    output.push(line),
  );
  assert.equal(status, 0);
  assert.ok(output[0]);
  assert.deepEqual(JSON.parse(output[0]), response.json());
  console.log('HTTP 201 et CLI code 0 → même résultat :', response.json());
  assert.equal((await store.all()).length, 2);
  const refused = await http.inject({
    method: 'POST',
    url: '/plays',
    payload: { ...request, players: ['Alice'] },
  });
  assert.equal(refused.statusCode, 422);
  assert.equal(await runCli(['Azul', 'Alice'], play, console.log), 1);
  assert.equal((await store.all()).length, 2);
  console.log(
    'Un joueur → HTTP 422 et CLI code 1 ; toujours 2 parties sauvegardées.',
  );
} finally {
  await http.close();
}
