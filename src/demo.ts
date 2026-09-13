import { recordFromJson } from '../examples/00-coupled.js';
console.log('00 · Point de départ : JSON, règle métier et stockage simulé sont mélangés.');
console.log(await recordFromJson(JSON.stringify({boardgameName:'Brass: Birmingham',players:['Alice','Bob']})));
try { await recordFromJson(JSON.stringify({boardgameName:'Brass: Birmingham',players:['Alice']})); }
catch (error) { console.log('Refus attendu :', (error as Error).message); }
