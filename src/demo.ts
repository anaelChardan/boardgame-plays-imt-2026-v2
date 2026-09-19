import assert from 'node:assert/strict';
import {
  brokenCatalogue,
  type Catalogue,
  countPlays,
  emptyCatalogue,
  type Game,
  makeValidator,
  type PlayReader,
  validateCount,
} from '../examples/solid/principles.js';

console.log('01 · SOLID : cinq principes, cinq observations');
const azul: Game = { name: 'Azul', min: 2, max: 4 };
validateCount(azul, ['Alice', 'Bob']);
assert.throws(() => validateCount(azul, ['Alice']), /Nombre invalide/);
console.log(
  'S · La règle accepte 2 joueurs et refuse 1 joueur, sans JSON ni SQL.',
);

const catalogueA: Catalogue = {
  async find(name) {
    return name === azul.name ? azul : null;
  },
};
const games = new Map([[azul.name, azul]]);
const catalogueB: Catalogue = {
  async find(name) {
    return games.get(name) ?? null;
  },
};
for (const catalogue of [catalogueA, catalogueB]) {
  await makeValidator(catalogue)('Azul', ['Alice', 'Bob']);
}
console.log(
  'O · Deux catalogues différents, le même validateur accepte la partie.',
);

assert.equal(await emptyCatalogue.find('Inconnu'), null);
await assert.rejects(() => brokenCatalogue.find('Inconnu'), /Jeu inconnu/);
console.log(
  'L · Inconnu : null avec le contrat respecté, exception avec le contre-exemple.',
);
console.log(
  '    Cette exception est attendue ici pour montrer la violation du contrat.',
);

const reader: PlayReader = {
  async all() {
    return [['Alice', 'Bob']];
  },
};
assert.equal(await countPlays(reader), 1);
console.log(
  'I · Une partie comptée avec all() seulement ; aucune méthode save() exigée.',
);

await assert.rejects(
  () => makeValidator(emptyCatalogue)('Azul', ['Alice', 'Bob']),
  /Jeu inconnu/,
);
console.log(
  'D · makeValidator dépend du contrat Catalogue ; le câblage fournit son instance.',
);
console.log(
  '    Avec le catalogue vide injecté, la même politique refuse le jeu inconnu.',
);
