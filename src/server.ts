import { compose } from './composition.js';
import { buildHttp } from './infrastructure/http.js';

const { play, store, close } = compose();
const app = buildHttp(play, store);
app.addHook('onClose', close);
await app.listen({ port: Number(process.env.PORT ?? 3000), host: '127.0.0.1' });
console.log(`POST http://127.0.0.1:${process.env.PORT ?? 3000}/plays`);

for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.once(signal, () => {
    void app.close();
  });
}
