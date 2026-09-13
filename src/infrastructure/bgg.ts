import { XMLParser, XMLValidator } from 'fast-xml-parser';
import { z } from 'zod';
import type { BoardgameInventory } from '../domain/ports.js';
import { CatalogUnavailable } from '../domain/errors.js';
const parser = new XMLParser({ignoreAttributes:false,attributeNamePrefix:'',parseAttributeValue:false});
const asArray = (value: unknown): unknown[] => value == null ? [] : Array.isArray(value) ? value : [value];
const searchItem = z.object({id:z.string().regex(/^\d+$/),name:z.object({value:z.string()})});
const details = z.object({
  id:z.string(), name:z.union([z.object({type:z.string(),value:z.string()}),z.array(z.object({type:z.string(),value:z.string()}))]),
  minplayers:z.object({value:z.coerce.number().int().positive()}),
  maxplayers:z.object({value:z.coerce.number().int().positive()}),
});
export function buildBggCatalogue(token: string, fetcher: typeof fetch = fetch): BoardgameInventory {
  if (!token.trim()) throw new Error('BGG_API_TOKEN requis pour le catalogue bgg');
  async function get(path: string) {
    const response = await fetcher('https://boardgamegeek.com/xmlapi2/'+path, {
      headers:{Authorization:`Bearer ${token}`},signal:AbortSignal.timeout(5000),
    });
    if (response.status !== 200) throw new CatalogUnavailable();
    const xml = await response.text();
    if (XMLValidator.validate(xml) !== true) throw new CatalogUnavailable();
    const document = parser.parse(xml);
    if (!document || !('items' in document)) throw new CatalogUnavailable();
    return document.items;
  }
  return {
    async getBoardgameByName(name) {
      try {
        const result = await get('search?type=boardgame&exact=1&query='+encodeURIComponent(name));
        const candidates = asArray(result?.item).map(item=>searchItem.parse(item));
        const found = candidates.find(item=>item.name.value.toLowerCase()===name.toLowerCase());
        if (!found) return null;
        const body = await get('thing?id='+found.id);
        const game = details.parse(asArray(body?.item)[0]);
        const names = Array.isArray(game.name) ? game.name : [game.name];
        const primary = names.find(n=>n.type==='primary');
        if (!primary || game.id !== found.id || game.minplayers.value > game.maxplayers.value) throw new CatalogUnavailable();
        return {name:primary.value,bggId:game.id,minNumberOfPlayers:game.minplayers.value,maxNumberOfPlayers:game.maxplayers.value};
      } catch { throw new CatalogUnavailable(); }
    },
  };
}
