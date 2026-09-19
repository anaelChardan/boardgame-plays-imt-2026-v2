import assert from 'node:assert/strict';
import { buildPlayAGame } from './domain/play-a-game.js';
import { CatalogUnavailable } from './domain/errors.js';
import { fixtureCatalogue } from './infrastructure/fixture-catalogue.js';
import { buildBggCatalogue } from './infrastructure/bgg.js';

console.log('05 · BGG : remplacer un adaptateur secondaire sans changer le cas d’usage');
console.log('Vrai adaptateur XML, réponses HTTP contrôlées : aucun réseau ni jeton réel.');
const searchXml = '<items><item id="230802"><name value="Azul"/></item></items>';
const detailsXml = '<items><item id="230802"><name type="primary" value="Azul"/><minplayers value="2"/><maxplayers value="4"/></item></items>';
const controlledFetch: typeof fetch = async input => {
  const url = new URL(String(input));
  console.log('Transport contrôlé →', url.pathname + url.search);
  return new Response(url.pathname.endsWith('/thing') ? detailsXml
    : url.searchParams.get('query') === 'Azul' ? searchXml : '<items total="0"/>');
};
const bgg = buildBggCatalogue('demo-offline', controlledFetch);
const request = { boardgameName: 'Azul', players: ['Alice', 'Bob'] };
const fixturePlay = await buildPlayAGame(fixtureCatalogue)(request);
const bggPlay = await buildPlayAGame(bgg)(request);
assert.deepEqual(bggPlay, fixturePlay);
console.log('Fixture et BGG donnent la même partie :', bggPlay);
assert.equal(await bgg.getBoardgameByName('Inconnu'), null);
console.log('Aucun résultat → null, absence métier.');
const unavailable = buildBggCatalogue('demo-offline', async () => new Response('', { status: 401 }));
await assert.rejects(() => unavailable.getBoardgameByName('Azul'), CatalogUnavailable);
console.log('HTTP 401 → CatalogUnavailable, panne technique distincte de l’absence.');
