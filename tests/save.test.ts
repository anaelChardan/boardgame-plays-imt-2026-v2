import assert from 'node:assert/strict';
import { expect, it } from 'vitest';
import { buildPlayAGame } from '../src/domain/play-a-game.js';
import { fixtureCatalogue } from '../src/infrastructure/fixture-catalogue.js';
import { buildHttp } from '../src/infrastructure/http.js';
import { buildMemoryStore } from '../src/infrastructure/memory-store.js';

it('enregistre une seule partie valide et aucune partie invalide', async () => {
  const store = buildMemoryStore();
  const play = buildPlayAGame(fixtureCatalogue, store);
  await play({ boardgameName: 'Azul', players: ['Alice', 'Bob'] });
  await expect(
    play({ boardgameName: 'Azul', players: ['Alice'] }),
  ).rejects.toThrow();
  await expect(
    play({ boardgameName: 'Inconnu', players: ['Alice', 'Bob'] }),
  ).rejects.toThrow();
  expect(await store.all()).toHaveLength(1);
});
it('protège les données des mutations externes', async () => {
  const store = buildMemoryStore();
  const play = buildPlayAGame(fixtureCatalogue, store);
  const result = await play({
    boardgameName: 'Azul',
    players: ['Alice', 'Bob'],
  });
  result.players.push('Eve');
  const read = await store.all();
  assert.ok(read[0]);
  read[0].players.push('Mallory');
  expect((await store.all())[0]?.players).toEqual(['Alice', 'Bob']);
});
it('ne répond pas créé si le stockage échoue', async () => {
  const play = buildPlayAGame(fixtureCatalogue, {
    async save() {
      throw new Error('disk failure');
    },
  });
  const app = buildHttp(play);
  try {
    expect(
      (
        await app.inject({
          method: 'POST',
          url: '/plays',
          payload: { boardgameName: 'Azul', players: ['Alice', 'Bob'] },
        })
      ).statusCode,
    ).toBe(500);
  } finally {
    await app.close();
  }
});
