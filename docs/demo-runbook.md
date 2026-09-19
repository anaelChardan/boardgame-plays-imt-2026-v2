# Démonstrations et conduite de séance

Public : troisième année après le baccalauréat, première année du cycle ingénieur. Objectif : argumenter des décisions de conception à partir des effets observables d’un changement. Les questions viennent des étudiants, qui peuvent interrompre les démonstrations. Le professeur répond au fil du cours. Les slides présentent le problème, le code et les compromis.

Le [conducteur pas à pas](lesson-steps.md) précise le point de départ, les manipulations et les résultats attendus pour chaque étape.

## Avant la séance

Aucun Docker ni serveur de base externe. SQLite conserve un fichier local. Utiliser **Node 24**, puis `npm ci`, `npm run check` et `npm run course -- warmup` dans le clone principal. La préparation installe les dépendances de chaque étape une fois. Prévoir plusieurs minutes et de l’espace disque. Les passages suivants réutilisent les étapes prêtes, sans téléchargement.

Garder deux fenêtres : le clone principal pour naviguer et le dossier d’une étape pour coder. Augmenter la taille du texte dans le terminal et l’éditeur. Les étudiants n’ont rien à installer pendant la séance.

```sh
npm run course -- list
npm run course -- prepare 03
npm run course -- next 03
npm run course -- diff 08 09
```

`prepare` affiche le dossier, le fichier à ouvrir et la slide. `next 03` prépare 04. Chaque étape est un worktree Git indépendant. Aucun changement de branche dans le dossier où vous codez. Aucun `reset --hard` ni nettoyage forcé.

Si une étape contient des modifications, le navigateur refuse de la réinitialiser. Les modifications restent disponibles : ouvrir son dossier et lancer `npm run demo` ou `npm test` directement. Pour passer à la solution, préparer **l’étape suivante depuis le clone principal**. `diff` compare les solutions enregistrées, pas les modifications en cours.

## Répéter les démos

`npm run course -- run NN` lance la démonstration propre à chaque étape. Le [tableau du conducteur](lesson-steps.md#les-démos-exécutables) indique le résultat attendu. `npm run course -- verify` vérifie le lint, compile, teste et exécute les dix étapes. Les tags formatés avec Biome sont `course-2026-v3/*`, préparés dans `.course-worktrees/v3/` ; les anciens restent disponibles.

La démo 05 appelle réellement le parseur et l’adaptateur BGG avec un transport contrôlé. La démo 07 utilise réellement SQLite, ferme la connexion et relit avec une nouvelle instance Prisma ; sa base temporaire est nettoyée. La démo 09 montre les doublons refusés dans HTTP et CLI. Aucun accès BGG live n’est nécessaire.

## Schémas de référence

Le deck comprend 49 slides. Les schémas de progression reprennent les mêmes positions et ajoutent seulement les éléments présents au checkpoint. Le schéma d’origine est conservé comme image, les nouveaux schémas restent éditables.

| Slide | Schéma | Point expliqué |
|---|---|---|
| 7 | Sources de changement et responsabilités | SRP |
| 9 | Deux adaptateurs pour un port | OCP et choix au démarrage |
| 15 | Consommateurs, interfaces et adaptateur commun | ISP |
| 20 | Schéma du deck d’origine | Inversion de dépendance vers le domaine |
| 21–22 | Hexagone cible et rôles des ports | Primaire / secondaire, port / adaptateur |
| 23–24 | Imports puis séquence des appels | Deux sens de flèches distincts |
| 25 | Correspondance avec les fichiers | Retrouver les intentions et les dépendances |
| 27 | Tests et catalogue fixture | Premier hexagone exécutable hors ligne |
| 31 | Ajout de HTTP | Adaptateur primaire |
| 35 | Ajout de BGG | Adaptateur secondaire de catalogue |
| 37 | XML et objet métier | Traduction à la frontière |
| 39 | Ajout de PlayWriter et de la mémoire | Nouveau besoin du cas d’usage |
| 42–43 | Prisma puis reconnexion | Substitution et preuve de persistance |
| 44 | Ajout de la CLI | Même port primaire et mêmes règles |

La carte représente le cas d’usage d’enregistrement. Le `GET /plays` de cette démo délègue directement à `PlayReader` et n’appelle pas `PlayAGame`.

## Démonstrations et revues de conception

| Minute | Étape | Action du professeur | Point expliqué |
|---|---|---|---|
| 11 | 00 | Montrer la fonction couplée | Identifier les raisons de changer |
| 15–40 | 01 | Analyser les cinq exemples SOLID | Comportement après remplacement |
| 59–67 | 03 | Écrire la condition min/max | Choix des exemples de test |
| 67–75 | 03 | Changer temporairement `>` en `>=` | Détection de la régression |
| 85–100 | 04 | Envoyer deux payloads | Traduction en 400, 404 ou 422 |
| 100–115 | 05 | Remplacer le catalogue dans la composition | Distinguer absence et panne |
| 115–124 | 06 | Ajouter `await writer.save(play)` | Dire quand annoncer une création |
| 124–130 | 07 | Exécuter le test Prisma préparé | Vérifier la preuve de persistance |
| 130–134 | 08 | Lancer la CLI | Repérer le cas métier réutilisé |
| 134–140 | 08 puis 09 | Ajouter les noms uniques | Justification du test et lecture du diff |

Les tests de l’étape 03 et la modification finale sont les meilleurs moments pour écrire du code en direct. Préparer le parsing XML, Fastify et Prisma : leur saisie n’est pas l’objectif pédagogique. La pause dure 10 minutes, entre la minute 75 et la minute 85. Les questions peuvent intervenir pendant toute la séance. Les 10 dernières minutes accueillent les questions restantes et absorbent un éventuel retard.

## HTTP

À partir de 04, dans le dossier préparé :

```sh
npm start
```

Dans un deuxième terminal :

```sh
curl -i http://127.0.0.1:3000/plays \
  -H 'Content-Type: application/json' \
  -d '{"boardgameName":"Azul","players":["Alice","Bob"]}'
```

À 04–05 : 200, partie validée mais pas sauvegardée. À 06 et après : 201 après sauvegarde. Remplacer la liste par `["Alice"]` pour obtenir 422. `GET /plays` devient disponible à 07. Arrêter le serveur avant de démarrer celui d’un autre worktree sur le même port, ou choisir `PORT=3001`.

## Persistance visible dans la version finale

Ces commandes s’exécutent **dans le même dossier**, à 08 ou après. Ne pas partager le chemin relatif d’une base entre plusieurs worktrees.

```sh
npm run db:setup
STORAGE=sqlite npm run cli -- "Azul" Alice Bob
STORAGE=sqlite npm start
```

Puis `curl http://127.0.0.1:3000/plays` dans un autre terminal. La partie de la CLI apparaît après son arrêt, preuve que la base la conserve. Par défaut, `STORAGE=memory` garde les données uniquement dans le processus courant.

`DATABASE_URL` accepte un autre fichier SQLite. Le chemin relatif se résout par rapport au schéma Prisma. `.env` est pris en compte par la composition et la préparation de base dans la version finale. Pour les anciens checkpoints, exporter explicitement `DATABASE_URL` si vous changez la base. `db:setup` ne réinitialise pas la base et n’accepte pas automatiquement les pertes de données.

## BGG et plan B

Tout le cours et tous les tests tournent sans BGG, avec `CATALOG=fixture`. Le mode live se choisit explicitement avec `CATALOG=bgg` et `BGG_API_TOKEN`. Il faut un jeton BGG valide pour une application autorisée. Le jeton Slides.com sert uniquement à Slides.com.

Ne pas placer de secret dans le code, les slides ou une commande projetée. Utiliser un fichier `.env` ignoré. Le catalogue traduit un statut 401/202/429, une panne réseau ou une réponse incorrecte en indisponibilité. Il ne bascule pas silencieusement sur la fixture.

Si le Wi-Fi tombe : conserver le mode fixture, lancer `npm test -- tests/catalogue.test.ts` et montrer les réponses XML contrôlées. Cela démontre l’adaptateur sans prétendre vérifier le service réel.

Si vous êtes en retard : conserver toutes les lettres de SOLID, les limites du domaine et le port d’écriture. Lire le diff Prisma préparé, puis garder au moins la démonstration CLI et deux minutes pour les questions. Repousser DDD, CQRS et les microservices à un autre cours.

## Périmètre pédagogique

Les noms identifient les joueurs uniquement dans cette démonstration. Ce choix ne convient pas à tous les homonymes. La version finale ne prétend pas être un service de production : aucune authentification utilisateur, pas d’idempotence et pas de stratégie de retry BGG. Ces sujets sont des prolongements, pas des prérequis pour comprendre SOLID et les ports.
