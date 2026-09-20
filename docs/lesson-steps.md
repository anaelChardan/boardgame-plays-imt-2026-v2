# Conduite pas à pas : slides, code et vérifications

Ce document est le support à garder ouvert pendant la séance. Les [notes par slide](presenter-notes.md) indiquent quoi expliquer. Le [guide des démonstrations](demo-runbook.md) détaille le démarrage, les requêtes HTTP et les solutions de secours.

Le format retenu : tu présentes les évolutions du code préparé, tu exécutes les démonstrations et tu réponds aux questions au fil du cours. **Toute la séance se déroule sans écrire de code.** Deux petites modifications sont proposées en option pour montrer un test rouge puis vert. Aucun travail autonome ni exercice en binôme n’est programmé.

## Le parcours par défaut : besoin, diff, code, résultat

**Prérequis : Git, Node 24 et npm. Aucun Docker, Bun ou service externe.** Après préparation, les démos fonctionnent hors ligne. BGG utilise des réponses contrôlées ; SQLite utilise une base temporaire pour sa démo.

Les checkpoints contiennent le code complet. Pour chaque transition : expliquer le nouveau besoin, montrer le diff ciblé, ouvrir les fichiers concernés, puis commenter le résultat et les tests. Le professeur explique pourquoi la modification appartient à cet endroit et ce qui reste inchangé.

Depuis le **clone principal** (`imt-lundi` si c’est ton clone de préparation) :

```sh
npm run course -- present 04
```

Cette commande prépare 04, affiche l’objectif, les résultats attendus et les chemins des fichiers, montre le diff ciblé 03 → 04, puis lance la démo. La sortie reste dans le terminal pour commenter le diff et le résultat. Elle ne modifie pas le code et ne lance pas de serveur permanent. Avec `present`, la démo est déjà exécutée : les commandes `npm run demo` indiquées plus bas servent seulement à la rejouer si nécessaire. Ouvrir ensuite les fichiers affichés dans l’éditeur pour les parcourir avec les étudiants.

Si tu veux séparer les temps d’explication et d’exécution :

```sh
npm run course -- prepare 04
npm run course -- diff 03 04
# Ouvrir et expliquer les fichiers affichés
npm run course -- run 04
```

`present` utilise un diff ciblé sur le changement pédagogique ; `diff` conserve le diff complet du code, des exemples et des tests. Les commandes de navigation récentes s’exécutent depuis le clone principal ; les tags conservent leurs scripts historiques.

| Moment | Ce que tu montres |
|---|---|
| SOLID | Les exemples écrits et leurs résultats |
| Validation | Le diff 02/03, la condition min/max et les cas de test |
| HTTP et BGG | Les adaptateurs ajoutés et les réponses contrôlées |
| Sauvegarde | Le diff 05/06, `PlayWriter`, l’écriture et ses effets |
| SQLite et CLI | Les adaptateurs supplémentaires et leurs démos |
| Règle finale | Le diff 08/09 et les doublons refusés par les deux entrées |

Le schéma se complète aux slides **27, 31, 35, 39, 42 et 44**. Consacrer une à deux minutes au repère visuel, dans le créneau de la démonstration, puis ouvrir le code. Les éléments verts correspondent à l’ajout de l’étape. La carte cible de la slide 21 montre déjà l’ensemble.

## Préparer les solutions avant le cours

Depuis le clone principal, avec Node 24 :

```sh
npm ci
npm run check
npm run course -- warmup
npm run course -- list
```

Chaque tag `course-2026-v3/00-start` à `course-2026-v3/09-challenge` contient **une solution complète qui fonctionne**. Le dépôt ne contient pas de versions à trous. Pour montrer un changement, comparer les checkpoints complets. Aucune saisie n’est nécessaire.

Garder deux fenêtres :

1. Le clone principal pour les commandes de navigation.
2. Le dossier de l’étape, affiché par `prepare`, pour lire le code et lancer ses tests.

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

Après une modification optionnelle, `npm run lint:fix` rétablit le format. Le parcours principal ne nécessite aucune modification. `npm run check` inclut le lint ; les tests ciblés se lancent avec `npm test`.

## Vue d’ensemble : 150 minutes

| Minutes | Slides | Étape | Séquence |
|---|---|---|---|
| 0–15 | 1–5 | 00 | Comportement attendu et point de départ couplé |
| 15–40 | 6–17 | 01 | Les cinq principes SOLID sur les mêmes besoins |
| 40–55 | 18–25 | 01 | Ports, adaptateurs, imports et appels |
| 55–59 | 26 | 02 | Modèle métier |
| 59–75 | 27–29 | 03 | Validation et lecture des tests aux bornes |
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

**Parcours guidé :** `npm run course -- present 00` depuis le clone principal. Pour ouvrir seulement les fichiers : `npm run course -- prepare 00`.

**Ouvrir :** `examples/00-coupled.ts`, puis `tests/start.test.ts`.

**Faire :** lancer `npm run demo`. Montrer la partie valide puis le refus à un joueur. Relier les lignes au parsing JSON, à la règle du nombre de joueurs et à la représentation d’une ligne de stockage.

**Vérifier :** `npm test -- tests/start.test.ts`.

**Résultat :** les deux cas sont vérifiés. La ligne retournée simule le stockage, elle ne prouve pas une écriture SQL. Aucune réécriture complète à faire ici.

## 01 · Les cinq principes SOLID

**Parcours guidé :** `npm run course -- present 01` depuis le clone principal. Pour ouvrir seulement les fichiers : `npm run course -- prepare 01`.

**Ouvrir :** `examples/solid/principles.ts` et `tests/solid.test.ts`.

**Ordre et créneaux :**

- 15–20 : SRP, distinguer les raisons de modifier le code et montrer `validateCount`.
- 20–25 : OCP, montrer le fournisseur reçu par `makeValidator` et l’axe d’extension choisi.
- 25–30 : LSP, comparer `emptyCatalogue` et `brokenCatalogue` sur un nom inconnu.
- 30–35 : ISP, montrer que `countPlays` ne demande que `PlayReader`.
- 35–40 : DIP, distinguer la propriété du contrat et l’injection de l’instance.

**Démontrer :** `npm run demo` montre les cinq observations, puis ouvrir chaque fonction pendant son créneau.

**Vérifier :** `npm test -- tests/solid.test.ts`.

**Contre-exemple LSP :** lire la différence entre `emptyCatalogue` et `brokenCatalogue`. La démo montre déjà null puis l’exception attendue. La suite verte constate cette différence ; elle ne certifie pas la conformité de `brokenCatalogue` au contrat « inconnu = null ». Aucun changement du test à réaliser.

**40–55 :** parcourir les slides 18–25 : schéma d’origine, hexagone cible, ports primaires et secondaires, imports, appels et repérage dans le code. La slide 25 montre la version finale dans `main`, puis la construction reprend à 02. Cette partie ne nécessite pas de nouvelle étape Git.

## 02 · Le modèle

**Parcours guidé :** `npm run course -- present 02` depuis le clone principal. Pour ouvrir seulement les fichiers : `npm run course -- prepare 02`.

**Ouvrir :** `src/domain/model.ts` et `src/infrastructure/fixtures.ts`.

**Faire :** lancer `npm run demo`, puis expliquer les données manipulées : `Boardgame`, `Play`, `PlayRequest`. Pointer les limites min/max. La forme des données ne garantit pas à elle seule qu’une partie est valide.

**Transition :** depuis le clone principal, `npm run course -- diff 02 03` montre l’arrivée du port de catalogue, des erreurs et du cas d’usage.

## 03 · Validation et lecture des tests aux bornes

**Parcours guidé :** `npm run course -- present 03` depuis le clone principal. Pour ouvrir seulement les fichiers : `npm run course -- prepare 03`.

**Ouvrir :** `src/domain/play-a-game.ts`, `src/domain/ports.ts`, `tests/domain.test.ts`.

**59–67 :** utiliser `npm run course -- present 03`. Expliquer le diff 02/03 : contrat du catalogue, cas d’usage et règles métier. Parcourir recherche du jeu, normalisation et condition min/max dans la solution complète.

**67–75 :** ouvrir `tests/domain.test.ts` et relier chaque cas aux branches du cas d’usage. Lancer `npm test -- tests/domain.test.ts`. Montrer pourquoi 2 et 4 passent, pourquoi 1 et 5 sont refusés et pourquoi le jeu inconnu est distinct. Expliquer ce que détecterait une borne incorrecte. Répondre aux questions sur les tests hors infrastructure.

**Option, une à deux minutes dans ce créneau :** remplacer `>` par `>=`, lancer le même test, constater l’échec à 4 puis remettre `>` et relancer. Cette modification est facultative ; sans elle, consacrer ce temps à la lecture du test de borne supérieure.

**Résultat :** un test protège une limite précise sans serveur, réseau ni base. Le cas d’usage retourne une partie, il ne la sauvegarde pas encore.

**75–85 : pause.**

## 04 · HTTP et erreurs

**Parcours guidé :** `npm run course -- present 04` depuis le clone principal. Pour ouvrir seulement les fichiers : `npm run course -- prepare 04`.

**Ouvrir :** `src/infrastructure/http.ts` et `tests/http.test.ts`.

**Faire :** lancer `npm run course -- present 04` depuis le clone principal. Lire le diff de l’adaptateur puis les résultats de la démo HTTP interne. Les demandes suivantes sont déjà préparées. Une session `curl` avec `npm start` reste une variante facultative décrite dans le [guide HTTP](demo-runbook.md#http).

| Modification | Réponse attendue à 04 |
|---|---|
| Azul, Alice et Bob | 200 |
| `players` devient une chaîne | 400 |
| Le nom du jeu devient `Inconnu` | 404 |
| Un seul participant | 422 |

**Vérifier :** `npm test -- tests/http.test.ts`.

La réponse 200 correspond ici à la validation. Le passage à 201 arrivera avec la sauvegarde en 06. Expliquer la panne catalogue 503 à partir du test contrôlé. Arrêter le serveur avant de démarrer une autre étape sur le même port.

## 05 · Catalogue externe

**Parcours guidé :** `npm run course -- present 05` depuis le clone principal. Pour ouvrir seulement les fichiers : `npm run course -- prepare 05`.

**Ouvrir :** `src/infrastructure/bgg.ts`, `src/composition.ts`, `tests/catalogue.test.ts`.

**Faire :** lancer `npm run demo` pour voir l’adaptateur BGG fonctionner avec des réponses contrôlées, puis montrer le choix fixture/BGG dans la composition, puis la traduction XML en `Boardgame`. Lire les réponses contrôlées utilisées par les tests. Montrer le cas 401 qui devient une indisponibilité, jamais une absence métier.

**Vérifier :** `npm test -- tests/catalogue.test.ts`.

**Résultat :** même contrat de catalogue, comportement d’absence compatible et erreurs techniques distinctes. La suite vérifie notre adaptateur avec des réponses contrôlées. Le cours utilise les réponses contrôlées, sans jeton réel ni disponibilité du service BGG. Lire le parseur préparé et sa traduction en objet métier.

## 06 · La sauvegarde

**Parcours guidé :** `npm run course -- present 06` depuis le clone principal. Pour ouvrir seulement les fichiers : `npm run course -- prepare 06`.

**Ouvrir :** `src/domain/ports.ts`, `src/domain/play-a-game.ts`, `src/infrastructure/memory-store.ts`, `tests/save.test.ts`.

**Transition à montrer :** `npm run course -- diff 05 06` depuis le clone principal. Le changement complet inclut le writer, son adaptateur, le câblage des appels et les tests. Il est préparé.

**115–124 : parcours préparé.** Lancer `npm run course -- present 06` depuis le clone principal. Lire le diff 05/06 : `PlayWriter`, l’appel `await writer.save(play)` et l’adaptateur mémoire. Commenter les observations de la démo : réponse 201 après écriture, stockage inchangé si la demande est refusée, erreur propagée si le writer échoue. Dans le dossier 06, ouvrir puis lancer `npm test -- tests/save.test.ts`.

**Option, une à deux minutes dans ce créneau :** commenter toute la ligne `await writer.save(play)`, lancer le test, puis rétablir la ligne et relancer. Ne pas supprimer uniquement `await`. Sans cette option, expliquer les assertions qui détecteraient l’absence de sauvegarde.

**Résultat :** montrer les effets de l’écriture, pas seulement la valeur retournée. La sauvegarde est déjà présente dans la solution 06.

## 07 · La persistance réelle

**Parcours guidé :** `npm run course -- present 07` depuis le clone principal. Pour ouvrir seulement les fichiers : `npm run course -- prepare 07`.

**Ouvrir :** `src/infrastructure/prisma-store.ts`, `prisma/schema.prisma`, `tests/prisma.test.ts`.

**Faire :** lancer `npm run demo` pour montrer une écriture réelle et sa relecture après reconnexion. Expliquer la conversion entre le type métier et la ligne SQL, puis suivre le test : écriture, déconnexion, nouvelle connexion et relecture.

**Vérifier :** `npm test -- tests/prisma.test.ts`.

**Résultat :** la partie est conservée dans le même fichier SQLite après reconnexion. Le test crée et nettoie sa base temporaire. Le schéma et l’adaptateur sont préparés, aucune installation ou configuration Docker pendant le cours.

## 08 · Une deuxième entrée

**Parcours guidé :** `npm run course -- present 08` depuis le clone principal. Pour ouvrir seulement les fichiers : `npm run course -- prepare 08`.

**Ouvrir :** `src/cli.ts` et `src/infrastructure/cli.ts`.

**Faire dans le dossier 08 :**

```sh
npm run cli -- "Azul" Alice Bob
npm run cli -- "Azul" Alice
npm test -- tests/cli.test.ts
```

**Résultat :** la première commande retourne une partie, la seconde refuse le nombre de joueurs. Les règles sont celles de `PlayAGame`. En mode mémoire, chaque processus dispose de ses propres données. Le [guide de persistance](demo-runbook.md#persistance-visible-dans-la-version-finale) permet de montrer une CLI et un serveur partageant SQLite.

## 08 → 09 · Lire l’évolution d’une règle

**134–140 : parcours préparé, sans saisie.**

1. Présenter la nouvelle exigence : Alice et « alice » avec espaces représentent le même nom normalisé dans ce modèle.
2. Depuis le clone principal, lancer `npm run course -- present 09`. Le diff ciblé 08/09 montre la condition d’unicité, le message d’erreur et les tests d’intégration déjà écrits.
3. Ouvrir les fichiers affichés dans le dossier 09 : `src/domain/play-a-game.ts`, `src/domain/errors.ts`, `tests/challenge.test.ts`.
4. Commenter la démo : HTTP renvoie 422, la CLI renvoie le code 1, le stockage reste vide ; Alice et Bob sont toujours acceptés.
5. Si nécessaire, lancer `npm test -- tests/challenge.test.ts` depuis 09. Montrer que les règles ne sont dupliquées ni dans HTTP ni dans la CLI.

**Résultat :** une seule évolution métier protège les deux entrées. L’unicité par nom est une convention limitée de cette démonstration ; en production, les homonymes demanderaient un autre modèle.

## Dernières 10 minutes

Expliquer les coûts des interfaces et les limites du modèle. Répondre aux questions restantes. Distinguer les prolongements possibles — identité des personnes, idempotence et transactions — des fonctionnalités effectivement démontrées.

Si le temps manque, supprimer les deux modifications optionnelles et raccourcir la lecture des adaptateurs. Conserver les résultats des démos 03 et 06, la réutilisation depuis la CLI et le diff 08/09. Le parcours reste complet sans saisie.
