export class BoardgameNotFound extends Error {
  constructor() {
    super('Jeu introuvable');
  }
}
export class InvalidPlayerCount extends Error {
  constructor(min: number, max: number) {
    super(`Il faut entre ${min} et ${max} joueurs`);
  }
}
export class InvalidParticipants extends Error {
  constructor() {
    super('Chaque joueur doit avoir un nom non vide');
  }
}
export class CatalogUnavailable extends Error {
  constructor() {
    super('Catalogue temporairement indisponible');
  }
}
