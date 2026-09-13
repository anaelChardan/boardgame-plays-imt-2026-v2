import { buildPlayAGame } from './domain/play-a-game.js';
import { fixtureCatalogue } from './infrastructure/fixture-catalogue.js';
import { buildMemoryStore } from './infrastructure/memory-store.js';
import { buildHttp } from './infrastructure/http.js';
import { runCli } from './infrastructure/cli.js';
const store=buildMemoryStore();const play=buildPlayAGame(fixtureCatalogue,store);
const http=buildHttp(play,store);
try {
 console.log('HTTP :', (await http.inject({method:'POST',url:'/plays',payload:{boardgameName:'Azul',players:['Alice','Bob']}})).statusCode);
 console.log('CLI :');await runCli(['Azul','Chloé','David'],play,console.log);
 console.log('Refus métier commun :');await runCli(['Azul','Alice'],play,console.log);
 console.log('Parties enregistrées :', (await store.all()).length);
} finally {await http.close();}
