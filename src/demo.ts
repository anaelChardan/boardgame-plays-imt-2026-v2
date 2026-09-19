import assert from 'node:assert/strict';
import type { Boardgame, Play, PlayRequest } from './domain/model.js';
import { games } from './infrastructure/fixtures.js';

console.log('02 · Modèle : distinguer jeu, demande et partie');
const game: Boardgame | undefined = games.find(game => game.name === 'Azul');
assert.ok(game);
const request: PlayRequest = { boardgameName: game.name, players: ['Alice', 'Bob'] };
const example: Play = { ...request, bggId: game.bggId };
console.log('Boardgame → catalogue et limites :', game);
console.log('PlayRequest → demande reçue :', request);
console.log('Play → exemple de résultat, construit manuellement :', example);

const invalidRequest: PlayRequest = { boardgameName: game.name, players: ['Alice'] };
assert.ok(invalidRequest.players.length < game.minNumberOfPlayers);
console.log('Cette demande à un joueur est pourtant bien typée :', invalidRequest);
console.log('Les types ne valident pas les règles métier. Le cas d’usage arrive à 03.');
console.log('Aucune validation automatique et aucune sauvegarde à cette étape.');
