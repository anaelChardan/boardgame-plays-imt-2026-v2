import { expect, it } from 'vitest';
import { buildPlayAGame } from '../src/domain/play-a-game.js';
import { fixtureCatalogue } from '../src/infrastructure/fixture-catalogue.js';
const play = () => buildPlayAGame(fixtureCatalogue);
it.each([2,4])('accepte la borne %i', async n => {
  const result = await play()({boardgameName:'brass: birmingham',players:Array.from({length:n},(_,i)=>`J${i}`)});
  expect(result.boardgameName).toBe('Brass: Birmingham');
  expect(result.players).toHaveLength(n);
});
it.each([0,1,5])('refuse %i joueurs', async n => {
  await expect(play()({boardgameName:'Brass: Birmingham',players:Array.from({length:n},(_,i)=>`J${i}`)})).rejects.toThrow('entre 2 et 4');
});
it('distingue le jeu inconnu', async () => {
  await expect(play()({boardgameName:'Inconnu',players:['Alice','Bob']})).rejects.toThrow('Jeu introuvable');
});
it('refuse un nom vide', async () => {
  await expect(play()({boardgameName:'Azul',players:['Alice','  ']})).rejects.toThrow('nom non vide');
});
