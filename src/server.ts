import { buildHttp } from './infrastructure/http.js';
import { buildPlayAGame } from './domain/play-a-game.js';
import { fixtureCatalogue } from './infrastructure/fixture-catalogue.js';
const app = buildHttp(buildPlayAGame(fixtureCatalogue));
await app.listen({port:Number(process.env.PORT ?? 3000),host:'127.0.0.1'});
console.log('POST http://127.0.0.1:' + (process.env.PORT ?? 3000) + '/plays');
