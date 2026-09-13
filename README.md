# SOLID et architecture hexagonale · IMT 2026 v2

Cours de conception logicielle de 2h30 pour étudiants en troisième année après le baccalauréat, en première année du cycle ingénieur. Les démonstrations examinent les effets de nouvelles exigences sur une application, les contrats entre modules et le coût des abstractions.

[Présentation v2](https://slides.com/anaelchardan/solid-et-architecture-hexagonale-imt-2026-v2) · [Dépôt original 2026](https://github.com/anaelChardan/boardgame-plays-imt-2026)

## Démarrer

Node 24 LTS requis (`.node-version`), npm fourni avec Node. Aucune base externe et aucun compte BGG nécessaires pour les démonstrations par défaut.

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

Les checkpoints ne sont disponibles qu’après récupération des tags (`git fetch --tags`). Les démonstrations ont été vérifiées sous macOS avec Node 24. Les exemples de variables d’environnement utilisent la syntaxe des terminaux macOS/Linux.

## Résultat final

Le cas d’usage valide le nombre de joueurs, enregistre une partie via un port, puis fonctionne via HTTP ou CLI. Le catalogue de démonstration fonctionne hors ligne. BGG et SQLite/Prisma sont des implémentations interchangeables de dépendances.

## Supports

Consulter `docs/` pour le déroulé, les contrats, les questions et les correspondances entre diapositives et étapes. Les exemples SOLID se trouvent dans `examples/solid/` à partir de l’étape 01.

L’historique 2025/2026 reste accessible avant les commits v2. Le README historique est conservé dans `docs/legacy-README.md`.

## Pour animer la séance

- [Conducteur détaillé des 40 slides](docs/presenter-notes.md)
- [Commandes, séquences de code et plans de secours](docs/demo-runbook.md)
- [PDF pour présenter hors ligne](slides/course.pdf)
- [Source éditable du deck](slides/deck.html) et [contenu structuré](slides/slides.json)

Avant le cours : `npm run course -- warmup`. Pendant le cours : `npm run course -- prepare 03` puis `npm run course -- next 03` depuis le clone principal. Les premières étapes montrent volontairement une validation sans écriture. Les scripts `start` et `cli` deviennent utilisables respectivement à 04 et 08.

Le deck est en français. Les étudiants analysent les décisions de conception pendant les démonstrations. Les invitations à discuter restent dans les notes du présentateur. Un exercice de code de 4 minutes peut remplacer le défi oral final uniquement si leurs environnements sont déjà prêts.

## Sources

- [Ports and Adapters, article original d’Alistair Cockburn](https://alistair.cockburn.us/hexagonal-architecture)
- [SOLID, cours de Steven Zeil](https://www.cs.odu.edu/~zeil/cs330/latest/Public/solid/)
- [Documentation XML API2 de BoardGameGeek](https://boardgamegeek.com/wiki/page/BGG_XML_API2)

Les tests BGG utilisent un transport contrôlé. Ils ne vérifient pas un compte, un jeton ou la disponibilité du service en direct.
