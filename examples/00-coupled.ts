// Exemple volontairement couplé : un seul endroit connaît JSON, BGG et le stockage.
// Une fonction cohérente peut faire plusieurs opérations. La question est ce qui change.
export async function recordFromJson(json: string) {
  const { boardgameName, players } = JSON.parse(json);
  const game = { name: 'Brass: Birmingham', id: '224517', min: 2, max: 4 };
  if (boardgameName !== game.name) {
    throw new Error('Jeu introuvable');
  }
  if (players.length < game.min || players.length > game.max) {
    throw new Error('Nombre de joueurs invalide');
  }
  // Stockage simulé, pas une écriture SQL : à remplacer pendant le cours.
  const row = {
    game: game.name,
    game_id: game.id,
    players_json: JSON.stringify(players),
  };
  return row;
}
