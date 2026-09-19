import { expect, it } from 'vitest';
import { CatalogUnavailable } from '../src/domain/errors.js';
import { buildPlayAGame } from '../src/domain/play-a-game.js';
import { fixtureCatalogue } from '../src/infrastructure/fixture-catalogue.js';
import { buildHttp } from '../src/infrastructure/http.js';
import { buildMemoryStore } from '../src/infrastructure/memory-store.js';

it.each([
  [{ boardgameName: 'Azul', players: ['Alice', 'Bob'] }, 201],
  [{ boardgameName: 'Azul', players: ['Alice'] }, 422],
  [{ boardgameName: 'Inconnu', players: ['Alice', 'Bob'] }, 404],
  [{ boardgameName: 'Azul', players: 'Alice' }, 400],
])('traduit la requête et le résultat %j', async (payload, status) => {
  const app = buildHttp(buildPlayAGame(fixtureCatalogue, buildMemoryStore()));
  try {
    expect(
      (await app.inject({ method: 'POST', url: '/plays', payload })).statusCode,
    ).toBe(status);
  } finally {
    await app.close();
  }
});
it('distingue panne du catalogue et jeu inconnu', async () => {
  const app = buildHttp(async () => {
    throw new CatalogUnavailable();
  });
  try {
    expect(
      (
        await app.inject({
          method: 'POST',
          url: '/plays',
          payload: { boardgameName: 'Azul', players: ['A', 'B'] },
        })
      ).statusCode,
    ).toBe(503);
  } finally {
    await app.close();
  }
});
