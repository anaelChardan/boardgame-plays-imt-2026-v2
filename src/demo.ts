import { buildMemoryStore } from './infrastructure/memory-store.js';
import { buildPlayAGame } from './domain/play-a-game.js';
import { fixtureCatalogue } from './infrastructure/fixture-catalogue.js';
const play = buildPlayAGame(fixtureCatalogue, buildMemoryStore());
console.log('Cas métier, sans serveur ni réseau');
console.log(await play({boardgameName:'Brass: Birmingham',players:['Alice','Bob']}));
try { await play({boardgameName:'Brass: Birmingham',players:['Alice']}); }
catch (error) { console.log('Refus attendu :', (error as Error).message); }
