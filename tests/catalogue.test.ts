import { describe, expect, it, vi } from 'vitest';
import type { BoardgameInventory } from '../src/domain/ports.js';
import { fixtureCatalogue } from '../src/infrastructure/fixture-catalogue.js';
import { buildBggCatalogue } from '../src/infrastructure/bgg.js';
const search = '<items><item id="230802"><name value="Azul"/></item></items>';
const thing = '<items><item id="230802"><name type="primary" value="Azul"/><minplayers value="2"/><maxplayers value="4"/></item></items>';
const fakeFetch: typeof fetch = async input => new Response(String(input).includes('thing?') ? thing : String(input).includes('Inconnu') ? '<items total="0"/>' : search);
function contract(label: string, catalogue: BoardgameInventory) {
 describe(label,()=>{
  it('retourne un jeu dans le langage métier',async()=>{
   expect(await catalogue.getBoardgameByName('Azul')).toEqual({name:'Azul',bggId:'230802',minNumberOfPlayers:2,maxNumberOfPlayers:4});
  });
  it('retourne null pour un jeu inconnu',async()=>{expect(await catalogue.getBoardgameByName('Inconnu')).toBeNull();});
 });
}
contract('Fixture',fixtureCatalogue);
contract('BGG avec réponses HTTP contrôlées',buildBggCatalogue('test-token',fakeFetch));
it.each([202,401,429,500])('traduit HTTP %i en panne technique',async status=>{
 await expect(buildBggCatalogue('test',async()=>new Response('',{status})).getBoardgameByName('Azul')).rejects.toThrow('indisponible');
});
it.each(['<html>erreur</html>','<items><item','<items><item id="bad"/></items>'])('refuse un document incorrect',async xml=>{
 await expect(buildBggCatalogue('test',async()=>new Response(xml)).getBoardgameByName('Azul')).rejects.toThrow('indisponible');
});
it('envoie le jeton et un délai maximum au transport',async()=>{
 const spy=vi.fn(fakeFetch);
 await buildBggCatalogue('test-only',spy).getBoardgameByName('Azul');
 expect(spy.mock.calls[0]?.[1]).toMatchObject({headers:{Authorization:'Bearer test-only'},signal:expect.any(AbortSignal)});
});
it('traduit aussi une erreur réseau',async()=>{
 await expect(buildBggCatalogue('test',async()=>{throw new Error('network');}).getBoardgameByName('Azul')).rejects.toThrow('indisponible');
});
it('requiert un jeton pour le mode live',()=>{expect(()=>buildBggCatalogue('')).toThrow('BGG_API_TOKEN');});
