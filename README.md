# SOLID et architecture hexagonale · IMT 2026 v2

Cours guidé de 2h30 pour élèves ingénieurs de première année. L’enseignant code ; la classe propose des tests et prédit les changements.

[Présentation v2](https://slides.com/anaelchardan/solid-et-architecture-hexagonale-imt-2026-v2) · [Dépôt original 2026](https://github.com/anaelChardan/boardgame-plays-imt-2026)

## Démarrer

Node 24 LTS recommandé (`.node-version`), npm fourni avec Node. Aucune base externe et aucun compte BGG nécessaires pour les démonstrations par défaut.

```sh
npm ci
npm run check
npm run demo
npm run course -- list
```

Chaque tag `course-2026/00-start` à `course-2026/09-challenge` est un état exécutable. `main` contient la version complète. Les dépendances et le schéma Prisma sont préparés dès le départ pour éviter les installations en cours de démonstration.

## Naviguer sans perdre les modifications

```sh
npm run course -- show 03
npm run course -- diff 03 04
npm run course -- prepare 04
npm run course -- run 04
npm run course -- test 04
npm run course -- next 04
```

Les commandes créent des worktrees détachés dans `.course-worktrees/`, sans changer votre checkout ni écraser vos modifications. `run` utilise la démonstration de l’étape ; `test` exécute sa vérification. `next` prépare l’étape suivante et affiche les chemins, sans démarrer de serveur. Exécuter ces commandes depuis le clone principal. Les worktrees modifiés sont conservés ; leur vérification refuse de les traiter comme des réponses intactes.

Les checkpoints ne sont disponibles qu’après récupération des tags (`git fetch --tags`). Les commandes sont identiques sous macOS, Linux et Windows avec Git et Node installés.

## Résultat final

Le cas d’usage valide le nombre de joueurs, enregistre une partie via un port, puis fonctionne via HTTP ou CLI. Le catalogue de démonstration fonctionne hors ligne. BGG et SQLite/Prisma sont des implémentations interchangeables de dépendances.

## Supports

Consulter `docs/` pour le déroulé, les contrats, les questions et les correspondances entre diapositives et étapes. Les exemples SOLID se trouvent dans `examples/solid/` à partir de l’étape 01.

L’historique 2025/2026 reste accessible avant les commits v2. Le README historique est conservé dans `docs/legacy-README.md`.
