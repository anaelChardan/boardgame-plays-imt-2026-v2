// Petits exemples autonomes. Le vrai cas d’usage arrive à l’étape 03.
export type Game = { name: string; min: number; max: number };
export interface Catalogue { find(name: string): Promise<Game | null> }
export interface PlayWriter { save(players: string[]): Promise<void> }
export interface PlayReader { all(): Promise<string[][]> }

// S : la règle ne connaît ni JSON ni la représentation SQL.
export function validateCount(game: Game, players: string[]) {
  if (players.length < game.min || players.length > game.max) throw new Error('Nombre invalide');
}

// O : le choix de catalogue varie sans modifier cette politique.
// D : cette fonction reçoit une abstraction appartenant à son besoin.
export function makeValidator(catalogue: Catalogue) {
  return async (name: string, players: string[]) => {
    const game = await catalogue.find(name);
    if (!game) throw new Error('Jeu inconnu');
    validateCount(game, players);
  };
}

// L : même signature, contrat différent. "Inconnu" doit retourner null.
export const brokenCatalogue: Catalogue = {
  async find() { throw new Error('Jeu inconnu'); },
};
export const emptyCatalogue: Catalogue = { async find() { return null; } };

// I : ce consommateur ne demande que la lecture.
export async function countPlays(reader: PlayReader) { return (await reader.all()).length; }
