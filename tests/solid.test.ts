import { expect, it } from 'vitest';
import {
  brokenCatalogue,
  countPlays,
  emptyCatalogue,
  makeValidator,
} from '../examples/solid/principles.js';

it('montre un contrat que TypeScript seul ne garantit pas', async () => {
  expect(await emptyCatalogue.find('Inconnu')).toBeNull();
  await expect(brokenCatalogue.find('Inconnu')).rejects.toThrow('Jeu inconnu');
});
it('remplace un catalogue sans modifier la validation', async () => {
  const validate = makeValidator({
    async find() {
      return { name: 'Brass', min: 2, max: 4 };
    },
  });
  await expect(validate('Brass', ['Alice', 'Bob'])).resolves.toBeUndefined();
  await expect(validate('Brass', ['Alice'])).rejects.toThrow('Nombre');
});
it('ne demande que la lecture', async () => {
  expect(
    await countPlays({
      async all() {
        return [['Alice', 'Bob']];
      },
    }),
  ).toBe(1);
});
