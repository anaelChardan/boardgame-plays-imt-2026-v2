# Architecture Logiciel - Hexagonal

- [Slides](https://slides.com/anaelchardan/hexagonal-architecture-and-beyond) du cours

## Installation

### Pré-requis

- [volta](https://volta.sh/)

### Makefile

Vous permet de lister tout ce que l'on peut faire

```sh
make
```

Par exemple pour installer

```sh
make install
```

### Contenu du dépôt

Ce dépôt est un monorepo géré avec [turbo](https://turbo.build/).

On a les packages:
- `domain` (qui représente notre métier)
- `glue` (qui execute vraiment le code et qui peut dépendre d'un peu tout)

Les tests sont executés par [vitest](https://vitest.dev/), différents types de tests sont disponibles (voir `make list`).

## Objectifs

Pouvoir enregistrer/vérifier des parties de jeux de société en étant sûr de rentrer le bon nombre de joueur (sans forcément rentrer le score).

Par exemple enregistrer une partie de [Brass Birmingham](https://boardgamegeek.com/boardgame/224517/brass-birmingham)

Nous pouvons utiliser l'API de boardgamegeek pour retrouver ces informations.

## Étapes

### 1. Domain

#### Model

J'ai des jeux de plateux et des parties

On a les notions de:

- **Jeu de plateau**: Il est composé d'un nom, d'un identifiant BGG, des nombres minimum et maximum de joueur.
- **Partie**: composé d'un nom d'un id de jeu (on peut prendre celui de bgg), d'une liste de joueurs (string[]);

#### Use cases (ports primaire)

Je veux pouvoir enregistrer un partie avec une fonction de ce type là

```ts
function forBoardgame(boardgameName: string, players: string[]) Play {
  // ...
}
```

**Besoins**:
- D'un port primaire de son implémentation (et de son test fonctionnel)
- D'un moyen de retrouver le jeu sur BGG (voir injection de dépendance, utilisation d'un port secondaire, et d'un stub).

**Règles**:
- Le domain ne doit jamais dépendre d'éléments extérieurs au domain!

### 2. Intéragir avec le domain (utilisation du port primaire)

On veut pouvoir maintenant exposer une API rest pour enregistrer/vérifier notre partie.

On peut utiliser [fastify](https://fastify.dev/) comme framework HTTP.

Tout est préconfigurer en allant sur la branche `2_controller`.

**Règles:**
- On veut un test qui ne dépende que du domain
- Je ne veux toujours pas appeler l'API de BGG.

**Questions:**
- Pourquoi est-ce que le stub serait en production ?

### BGG Client

On peut utiliser le SDK que l'on veut: [bgg-sdk](https://github.com/ColCross/bgg-sdk).

l'objectif est de parler les objets du domain (Anti-corruption-layer) donc notre adapter doit renvoyer des objets du domain

On écrit d'abord un test pour BGG pour créer notre adapter et on mock ensuite (on ne veut pas dépendre du réseau dans la CI)

### Aller plus loin

Concepts de command / query





### Crédits

- Inspiré du [talk](https://www.youtube.com/watch?v=YPmKHm7G19Q) de Julien Topçu