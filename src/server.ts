import { buildHttp } from './infrastructure/http.js';
import { compose } from './composition.js';
const {play} = compose();
const app = buildHttp(play);
await app.listen({port:Number(process.env.PORT ?? 3000),host:'127.0.0.1'});
console.log('POST http://127.0.0.1:' + (process.env.PORT ?? 3000) + '/plays');
