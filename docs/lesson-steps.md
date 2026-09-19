# Conduite pas à pas : slides, code et vérifications

Ce document est le support à garder ouvert pendant la séance. Les [notes par slide](presenter-notes.md) indiquent quoi expliquer. Le [guide des démonstrations](demo-runbook.md) détaille le démarrage, les requêtes HTTP et les solutions de secours.

Le format retenu : tu présentes et tu codes, les étudiants posent leurs questions au fil du cours. Les manipulations ci-dessous sont réalisées par toi. Aucun travail autonome ni exercice en binôme n’est programmé.

## Ce qui est prêt et ce que tu tapes

**Prérequis : Git, Node 24 et npm. Aucun Docker, Bun ou serveur de base externe.** SQLite utilise un fichier local. Le catalogue fixture évite tout accès à BGG pendant les démonstrations. Une connexion Internet sert à la première installation des dépendances et à la présentation en ligne. Préparer les checkpoints et garder le PDF pour travailler hors ligne.

Les checkpoints sont des solutions complètes. Le cours montre le code progressivement en ouvrant un dossier par étape. Passer au checkpoint suivant ne rejoue pas automatiquement une écriture de code. Tu ouvres les fichiers indiqués et expliques le diff.

| Moment | Ce que tu fais en direct |
|---|---|
| SOLID | Lire les exemples et lancer leurs tests. La mutation LSP est facultative. |
| Validation métier | Changer `>` en `>=`, montrer le test rouge, remettre `>`. |
| HTTP et BGG | Lire le code préparé, envoyer les requêtes, lancer les tests. |
| Sauvegarde | Commenter `await writer.save(play)`, observer l’échec, rétablir la ligne. |
| SQLite et CLI | Lancer les commandes préparées et montrer les résultats. |
| Règle finale | Ajouter le test des doublons puis la condition d’unicité, ou lire le diff 08/09 si le temps manque. |

Le schéma se complète aux slides **27, 31, 35, 39, 42 et 44**. Consacrer une à deux minutes au repère visuel, dans le créneau de la démonstration, puis ouvrir le code. Les éléments verts correspondent à l’ajout de l’étape. La carte cible de la slide 21 montre déjà l’ensemble.

## Préparer les solutions avant le cours

Depuis le clone principal, avec Node 24 :

```sh
npm ci
npm run check
npm run course -- warmup
npm run course -- list
```

Chaque tag `course-2026-v3/00-start` à `course-2026-v3/09-challenge` contient **une solution complète qui fonctionne**. Le dépôt ne contient pas de versions à trous. Pour montrer un changement, comparer deux tags ou modifier temporairement une petite portion de la solution dans son dossier préparé.

Garder deux fenêtres :

1. Le clone principal pour les commandes de navigation.
2. Le dossier de l’étape, affiché par `prepare`, pour lire le code, le modifier et lancer ses tests.

```sh
# Dans le clone principal
npm run course -- prepare 03
npm run course -- diff 02 03
npm run course -- next 03
```

`prepare 03` affiche un chemin se terminant par `.course-worktrees/v3/03-domain`. Ouvrir ce dossier dans l’éditeur. Les commandes de test indiquées ci-dessous s’exécutent **dans ce dossier**, sauf les commandes `course`, exécutées depuis le clone principal.

`next 03` prépare 04 sans effacer ce que tu as modifié dans 03. Il ne transporte pas tes modifications vers 04 et ne démarre aucun serveur. Pour une étape modifiée, lancer ses tests directement dans son dossier : le navigateur refuse de la réinitialiser. Les diffs entre tags montrent les solutions enregistrées, pas les modifications en cours.

## Les démos exécutables

Dans un dossier d’étape, `npm run demo` lance `src/demo.ts`, affiche les observations puis se termine. Depuis le clone principal, `npm run course -- run NN` choisit l’étape. Les démonstrations fonctionnent hors ligne après préparation ; les résultats attendus sont vérifiés par des assertions. Une régression fait échouer la commande.

| Étape | Ce que montre `npm run demo` |
|---|---|
| 00 | JSON accepté, ligne de stockage simulée, refus à un joueur |
| 01 | Cinq observations SOLID : règle isolée, catalogues interchangeables, violation LSP, lecture seule, injection |
| 02 | Objets `Boardgame`, `PlayRequest`, `Play` et demande bien typée mais invalide métier |
| 03 | Bornes 2/4 acceptées, 1/5 refusées, jeu inconnu, sans stockage |
| 04 | Vraies routes HTTP via `inject()` : 200, 400, 404, 422 et 503 |
| 05 | Vrai adaptateur BGG, XML contrôlé : même résultat que la fixture, absence et panne distinguées |
| 06 | HTTP 201 après écriture mémoire, aucun ajout en cas de refus, échec du writer propagé |
| 07 | Écriture SQLite, fermeture, nouvelle connexion et relecture de la même partie |
| 08 | HTTP et CLI appellent le même cas d’usage ; mêmes résultats et refus |
| 09 | Doublons après normalisation refusés par HTTP et CLI, sans sauvegarde |

La démo 07 prépare et supprime sa propre base temporaire : aucun `db:setup` manuel et aucune modification de ta base. Les démos HTTP n’ouvrent aucun port réseau. Pour manipuler avec `curl`, utiliser `npm start`. Les démos 08/09 partagent la mémoire dans un seul processus ; deux commandes séparées nécessitent SQLite pour partager les données.

Pour une répétition complète : `npm run course -- verify`. Les checkpoints formatés avec Biome se trouvent dans `.course-worktrees/v3/`. Les anciens tags et dossiers sont conservés ; ils contiennent les versions précédentes.

Après les petites modifications en direct, `npm run lint:fix` rétablit le format. `npm run check` inclut désormais le lint ; `npm test` reste la commande rapide pour montrer un test rouge puis vert.

## Vue d’ensemble : 150 minutes

| Minutes | Slides | Étape | Séquence |
|---|---|---|---|
| 0–15 | 1–5 | 00 | Comportement attendu et point de départ couplé |
| 15–40 | 6–17 | 01 | Les cinq principes SOLID sur les mêmes besoins |
| 40–55 | 18–25 | 01 | Ports, adaptateurs, imports et appels |
| 55–59 | 26 | 02 | Modèle métier |
| 59–75 | 27–29 | 03 | Validation et manipulation des bornes |
| 75–85 | 30 | — | Pause de 10 minutes |
| 85–100 | 31–34 | 04 | HTTP, demandes invalides et politique d’erreur |
| 100–115 | 35–38 | 05 | Catalogue BGG et vérifications des adaptateurs |
| 115–124 | 39–41 | 06 | Écriture et effets observables |
| 124–130 | 42–43 | 07 | Persistance après reconnexion |
| 130–134 | 44–45 | 08 | Même cas d’usage depuis la CLI |
| 134–140 | 46–47 | 08 puis 09 | Ajout de la règle d’unicité |
| 140–150 | 48–49 | 09 | Coûts, limites et questions restantes |

Les durées intègrent les explications et les questions au fil du cours. Si une question exige un long détour, la conserver pour les 10 dernières minutes. Garder la pause.

## 00 · Le point de départ

**Préparer :** `npm run course -- prepare 00`.

**Ouvrir :** `examples/00-coupled.ts`, puis `tests/start.test.ts`.

**Faire :** lancer `npm run demo`. Montrer la partie valide puis le refus à un joueur. Relier les lignes au parsing JSON, à la règle du nombre de joueurs et à la représentation d’une ligne de stockage.

**Vérifier :** `npm test -- tests/start.test.ts`.

**Résultat :** les deux cas sont vérifiés. La ligne retournée simule le stockage, elle ne prouve pas une écriture SQL. Aucune réécriture complète à faire ici.

## 01 · Les cinq principes SOLID

**Préparer :** `npm run course -- prepare 01`.

**Ouvrir :** `examples/solid/principles.ts` et `tests/solid.test.ts`.

**Ordre et créneaux :**

- 15–20 : SRP, distinguer les raisons de modifier le code et montrer `validateCount`.
- 20–25 : OCP, montrer le fournisseur reçu par `makeValidator` et l’axe d’extension choisi.
- 25–30 : LSP, comparer `emptyCatalogue` et `brokenCatalogue` sur un nom inconnu.
- 30–35 : ISP, montrer que `countPlays` ne demande que `PlayReader`.
- 35–40 : DIP, distinguer la propriété du contrat et l’injection de l’instance.

**Démontrer :** `npm run demo` montre les cinq observations, puis ouvrir chaque fonction pendant son créneau.

**Vérifier :** `npm test -- tests/solid.test.ts`.

**Attention au contre-exemple LSP :** la suite verte contient une assertion qui constate volontairement l’exception de `brokenCatalogue`. Elle ne certifie pas sa conformité au contrat « inconnu = null ». Pour montrer la violation en rouge, remplacer temporairement cette assertion par une attente `resolves.toBeNull()`, lancer le test puis remettre l’assertion initiale.

**40–55 :** parcourir les slides 18–25 : schéma d’origine, hexagone cible, ports primaires et secondaires, imports, appels et repérage dans le code. La slide 25 montre la version finale dans `main`, puis la construction reprend à 02. Cette partie ne nécessite pas de nouvelle étape Git.

## 02 · Le modèle

**Préparer :** `npm run course -- prepare 02`.

**Ouvrir :** `src/domain/model.ts` et `src/infrastructure/fixtures.ts`.

**Faire :** lancer `npm run demo`, puis expliquer les données manipulées : `Boardgame`, `Play`, `PlayRequest`. Pointer les limites min/max. La forme des données ne garantit pas à elle seule qu’une partie est valide.

**Transition :** depuis le clone principal, `npm run course -- diff 02 03` montre l’arrivée du port de catalogue, des erreurs et du cas d’usage.

## 03 · Validation et manipulation des bornes

**Préparer :** `npm run course -- prepare 03`.

**Ouvrir :** `src/domain/play-a-game.ts`, `src/domain/ports.ts`, `tests/domain.test.ts`.

**59–67 :** parcourir la recherche du jeu, le cas inconnu, la normalisation des noms et la condition min/max. La solution est déjà écrite : expliquer ou retaper uniquement la condition si cela aide la démonstration.

**67–75 : manipulation concrète.**

1. Lancer `npm test -- tests/domain.test.ts` sur la solution correcte.
2. Dans la borne supérieure, remplacer seulement `>` par `>=`.
3. Relancer le même test : le cas à 4 joueurs échoue.
4. Remettre `>` et relancer : la suite redevient verte.
5. Montrer également les cas à 1 et 5 joueurs et le jeu inconnu.

**Résultat :** un test protège une limite précise sans serveur, réseau ni base. Le cas d’usage retourne une partie, il ne la sauvegarde pas encore.

**75–85 : pause.**

## 04 · HTTP et erreurs

**Préparer :** `npm run course -- prepare 04`.

**Ouvrir :** `src/infrastructure/http.ts` et `tests/http.test.ts`.

**Faire :** lancer `npm start` dans le dossier 04. Envoyer la requête du [guide HTTP](demo-runbook.md#http) depuis un deuxième terminal, puis modifier le payload :

| Modification | Réponse attendue à 04 |
|---|---|
| Azul, Alice et Bob | 200 |
| `players` devient une chaîne | 400 |
| Le nom du jeu devient `Inconnu` | 404 |
| Un seul participant | 422 |

**Vérifier :** `npm test -- tests/http.test.ts`.

La réponse 200 correspond ici à la validation. Le passage à 201 arrivera avec la sauvegarde en 06. Expliquer la panne catalogue 503 à partir du test contrôlé. Arrêter le serveur avant de démarrer une autre étape sur le même port.

## 05 · Catalogue externe

**Préparer :** `npm run course -- prepare 05`.

**Ouvrir :** `src/infrastructure/bgg.ts`, `src/composition.ts`, `tests/catalogue.test.ts`.

**Faire :** lancer `npm run demo` pour voir l’adaptateur BGG fonctionner avec des réponses contrôlées, puis montrer le choix fixture/BGG dans la composition, puis la traduction XML en `Boardgame`. Lire les réponses contrôlées utilisées par les tests. Montrer le cas 401 qui devient une indisponibilité, jamais une absence métier.

**Vérifier :** `npm test -- tests/catalogue.test.ts`.

**Résultat :** même contrat de catalogue, comportement d’absence compatible et erreurs techniques distinctes. La suite vérifie notre adaptateur avec des réponses contrôlées. Le mode live reste optionnel et requiert un jeton BGG valide. Aucun parsing XML complet à taper pendant ce créneau.

## 06 · La sauvegarde

**Préparer :** `npm run course -- prepare 06`.

**Ouvrir :** `src/domain/ports.ts`, `src/domain/play-a-game.ts`, `src/infrastructure/memory-store.ts`, `tests/save.test.ts`.

**Transition à montrer :** `npm run course -- diff 05 06` depuis le clone principal. Le changement complet inclut le writer, son adaptateur, le câblage des appels et les tests. Il est préparé.

**115–124 : manipulation concrète.**

1. Lancer `npm test -- tests/save.test.ts` dans 06.
2. Commenter temporairement toute la ligne `await writer.save(play)`.
3. Relancer : les assertions sur les effets de la sauvegarde échouent, même si une partie peut encore être retournée.
4. Remettre la ligne et relancer : la suite redevient verte.
5. Montrer le test où le writer échoue : l’API doit répondre 500, jamais 201.

**Résultat :** une partie refusée ne s’enregistre pas et l’annonce de création attend la réussite de l’écriture. Éviter de supprimer seulement `await` pendant cette manipulation, ce qui introduirait une promesse rejetée non attendue et brouillerait la démonstration.

## 07 · La persistance réelle

**Préparer :** `npm run course -- prepare 07`.

**Ouvrir :** `src/infrastructure/prisma-store.ts`, `prisma/schema.prisma`, `tests/prisma.test.ts`.

**Faire :** lancer `npm run demo` pour montrer une écriture réelle et sa relecture après reconnexion. Expliquer la conversion entre le type métier et la ligne SQL, puis suivre le test : écriture, déconnexion, nouvelle connexion et relecture.

**Vérifier :** `npm test -- tests/prisma.test.ts`.

**Résultat :** la partie est conservée dans le même fichier SQLite après reconnexion. Le test crée et nettoie sa base temporaire. Le schéma et l’adaptateur sont préparés, aucune installation ou configuration Docker pendant le cours.

## 08 · Une deuxième entrée

**Préparer :** `npm run course -- prepare 08`.

**Ouvrir :** `src/cli.ts` et `src/infrastructure/cli.ts`.

**Faire dans le dossier 08 :**

```sh
npm run cli -- "Azul" Alice Bob
npm run cli -- "Azul" Alice
npm test -- tests/cli.test.ts
```

**Résultat :** la première commande retourne une partie, la seconde refuse le nombre de joueurs. Les règles sont celles de `PlayAGame`. En mode mémoire, chaque processus dispose de ses propres données. Le [guide de persistance](demo-runbook.md#persistance-visible-dans-la-version-finale) permet de montrer une CLI et un serveur partageant SQLite.

## 08 → 09 · Ajouter une règle

**134–140 : manipulation concrète.** Rester d’abord dans le dossier 08.

1. Dans `tests/domain.test.ts`, ajouter le cas suivant. La fonction `play()` est déjà définie dans ce fichier.

```ts
it('refuse les noms dupliqués après normalisation', async () => {
  await expect(play()({
    boardgameName: 'Azul',
    players: ['Alice', ' alice '],
  })).rejects.toThrow('unique');
});
```

2. Lancer `npm test -- tests/domain.test.ts` : le nouveau test échoue à 08.
3. Dans `src/domain/play-a-game.ts`, compléter la validation de `names` avec le contrôle suivant :

```ts
new Set(names.map(name => name.toLowerCase())).size !== names.length
```

Combiner cette condition avec le contrôle existant des noms vides pour lever `InvalidParticipants`. Les espaces ont déjà été retirés lors du calcul de `names`.

4. Dans `src/domain/errors.ts`, adapter le message à « Chaque joueur doit avoir un nom non vide et unique ».
5. Relancer le test : il réussit.
6. Depuis le clone principal, afficher `npm run course -- diff 08 09`, puis `npm run course -- prepare 09` pour ouvrir la solution complète.
7. Dans le dossier 09, lancer `npm run demo` pour voir les deux refus, puis `npm test -- tests/challenge.test.ts` : HTTP et CLI rejettent les doublons, le stockage reste vide.

**Résultat :** une modification de la politique métier s’applique aux deux entrées. L’unicité par nom est une convention limitée de cette démonstration. La solution 09 ajoute aussi les vérifications d’intégration préparées, sans obliger à les saisir pendant les 6 minutes.

## Dernières 10 minutes

Expliquer les coûts des interfaces et les limites du modèle. Répondre aux questions restantes. Distinguer les prolongements possibles — identité des personnes, idempotence et transactions — des fonctionnalités effectivement démontrées.

Si le temps manque, conserver les démonstrations 03 et 06 et la réutilisation depuis la CLI. Montrer directement le diff 08/09 et sa suite de tests. Les solutions sont disponibles à chaque tag, même si une manipulation en direct reste inachevée.
