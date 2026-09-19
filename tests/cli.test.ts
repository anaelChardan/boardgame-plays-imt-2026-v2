import { expect, it } from 'vitest';
import { runCli } from '../src/infrastructure/cli.js';
import { buildPlayAGame } from '../src/domain/play-a-game.js';
import { fixtureCatalogue } from '../src/infrastructure/fixture-catalogue.js';
import { buildMemoryStore } from '../src/infrastructure/memory-store.js';
it('appelle le vrai cas métier et partage les données',async()=>{
 const store=buildMemoryStore();const play=buildPlayAGame(fixtureCatalogue,store);const lines:string[]=[];
 expect(await runCli(['Azul','Alice','Bob'],play,s=>lines.push(s))).toBe(0);
 expect(JSON.parse(lines[0]!).players).toEqual(['Alice','Bob']);
 expect(await runCli(['Azul','Alice'],play,s=>lines.push(s))).toBe(1);
 expect(await store.all()).toHaveLength(1);
});
it('explique les arguments attendus',async()=>{
 expect(await runCli([],buildPlayAGame(fixtureCatalogue,buildMemoryStore()),()=>{})).toBe(2);
});
