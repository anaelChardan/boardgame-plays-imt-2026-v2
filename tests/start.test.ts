import { expect, it } from 'vitest';
import { recordFromJson } from '../examples/00-coupled.js';
it('montre une partie acceptée dans le point de départ couplé', async () => {
  expect(await recordFromJson(JSON.stringify({ boardgameName: 'Brass: Birmingham', players: ['Alice','Bob'] })))
    .toMatchObject({ game_id: '224517' });
});
it('refuse un joueur dans cet exemple', async () => {
  await expect(recordFromJson(JSON.stringify({boardgameName:'Brass: Birmingham',players:['Alice']}))).rejects.toThrow('Nombre');
});
