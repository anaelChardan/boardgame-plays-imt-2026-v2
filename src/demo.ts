import assert from 'node:assert/strict';
import { CatalogUnavailable } from './domain/errors.js';
import { buildPlayAGame } from './domain/play-a-game.js';
import { fixtureCatalogue } from './infrastructure/fixture-catalogue.js';
import { buildHttp } from './infrastructure/http.js';

console.log(
  '04 · HTTP : un adaptateur primaire traduit les résultats du même cas d’usage',
);
console.log(
  'Requêtes internes avec inject() : aucun port réseau ouvert, aucune sauvegarde.',
);
const app = buildHttp(buildPlayAGame(fixtureCatalogue));
const unavailable = buildHttp(
  buildPlayAGame({
    async getBoardgameByName() {
      throw new CatalogUnavailable();
    },
  }),
);
const valid = { boardgameName: 'Azul', players: ['Alice', 'Bob'] };
try {
  const cases = [
    { label: 'Partie valide', payload: valid, status: 200 },
    {
      label: 'Forme invalide',
      payload: { ...valid, players: 'Alice' },
      status: 400,
    },
    {
      label: 'Jeu inconnu',
      payload: { ...valid, boardgameName: 'Inconnu' },
      status: 404,
    },
    {
      label: 'Un joueur',
      payload: { ...valid, players: ['Alice'] },
      status: 422,
    },
  ];
  for (const { label, payload, status } of cases) {
    const response = await app.inject({
      method: 'POST',
      url: '/plays',
      payload,
    });
    assert.equal(response.statusCode, status);
    console.log(`${label} → HTTP ${response.statusCode}`, response.json());
  }
  const response = await unavailable.inject({
    method: 'POST',
    url: '/plays',
    payload: valid,
  });
  assert.equal(response.statusCode, 503);
  console.log('Catalogue indisponible → HTTP 503', response.json());
} finally {
  await app.close();
  await unavailable.close();
}
