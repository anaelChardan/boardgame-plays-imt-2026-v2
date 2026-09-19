import assert from 'node:assert/strict';
import { recordFromJson } from '../examples/00-coupled.js';

console.log(
  '00 · Point de départ couplé : JSON, règle métier, représentation du stockage',
);
const request = {
  boardgameName: 'Brass: Birmingham',
  players: ['Alice', 'Bob'],
};
const row = await recordFromJson(JSON.stringify(request));
assert.equal(row.players_json, JSON.stringify(request.players));
console.log('Partie acceptée → ligne simulée :', row);
await assert.rejects(
  () => recordFromJson(JSON.stringify({ ...request, players: ['Alice'] })),
  /Nombre de joueurs invalide/,
);
console.log(
  'Un joueur → refus attendu. Aucune écriture en base à cette étape.',
);
