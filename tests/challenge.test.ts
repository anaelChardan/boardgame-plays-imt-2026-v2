import { expect, it } from 'vitest';
import { buildPlayAGame } from '../src/domain/play-a-game.js';
import { runCli } from '../src/infrastructure/cli.js';
import { fixtureCatalogue } from '../src/infrastructure/fixture-catalogue.js';
import { buildHttp } from '../src/infrastructure/http.js';
import { buildMemoryStore } from '../src/infrastructure/memory-store.js';

it.each([
  ['Alice', 'Alice'],
  ['Alice', ' alice '],
])(
  'refuse les doublons %j dans HTTP et CLI sans enregistrer',
  async (first, second) => {
    const store = buildMemoryStore();
    const play = buildPlayAGame(fixtureCatalogue, store);
    const app = buildHttp(play, store);
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/plays',
        payload: { boardgameName: 'Azul', players: [first, second] },
      });
      expect(response.statusCode).toBe(422);
      expect(await runCli(['Azul', first, second], play, () => {})).toBe(1);
      expect(await store.all()).toEqual([]);
    } finally {
      await app.close();
    }
  },
);
