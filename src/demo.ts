import assert from 'node:assert/strict';
import { buildPlayAGame } from './domain/play-a-game.js';
import { fixtureCatalogue } from './infrastructure/fixture-catalogue.js';

console.log('03 · Port primaire PlayAGame et catalogue secondaire, sans serveur ni base');
const play = buildPlayAGame(fixtureCatalogue);
for (const players of [['Alice', 'Bob'], ['Alice', 'Bob', 'Chloé', 'David']]) {
  const result = await play({ boardgameName: ' azul ', players });
  assert.equal(result.boardgameName, 'Azul');
  console.log(`Borne acceptée : ${players.length} joueurs →`, result);
}
for (const players of [['Alice'], ['Alice', 'Bob', 'Chloé', 'David', 'Emma']]) {
  await assert.rejects(() => play({ boardgameName: 'Azul', players }), /entre 2 et 4/);
  console.log(`Hors limites : ${players.length} joueurs → refus attendu.`);
}
await assert.rejects(() => play({ boardgameName: 'Inconnu', players: ['Alice', 'Bob'] }), /Jeu introuvable/);
console.log('Jeu inconnu → refus distinct. Les parties sont retournées, pas sauvegardées.');
