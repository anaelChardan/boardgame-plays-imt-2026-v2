# Lire les ports et les adaptateurs du cours

Le cœur de ce petit projet regroupe règles métier et cas d’usage dans `src/domain/`. Les imports, les contrats et les noms de cas d’usage rendent l’architecture observable. Une organisation de dossiers différente peut respecter les mêmes règles.

| Rôle | Contrat | Réalisation / appelant |
|---|---|---|
| Port primaire d’enregistrement | `PlayAGame`, dans `domain/play-a-game.ts` | HTTP, CLI et tests appellent cette fonction |
| Port secondaire de catalogue | `BoardgameInventory`, dans `domain/ports.ts` | Fixture ou BGG |
| Port secondaire d’écriture | `PlayWriter`, dans `domain/ports.ts` | Mémoire ou Prisma |

Un port primaire exprime ce que l’application offre, un secondaire ce dont elle a besoin. Un port peut être un type de fonction. Le retour de données ne décide pas du rôle primaire/secondaire. `composition.ts` choisit les adaptateurs et construit le cas d’usage.

Les schémas de progression montrent le **sens des appels**. Le schéma d’origine et la slide sur les imports montrent les **dépendances du code** : les adaptateurs connaissent les contrats du domaine, le domaine ne connaît pas leurs réalisations techniques.

Le périmètre du schéma est l’enregistrement d’une partie. Pour garder la démo courte, le GET de consultation délègue directement à `PlayReader`. Un cas d’usage de lecture explicite serait une évolution possible si une politique de lecture apparaît.

## Construction progressive

- 03 : un test pilote `PlayAGame`, qui utilise le catalogue fixture via son contrat. Pas de stockage.
- 04 : HTTP appelle le même port primaire.
- 05 : BGG réalise le contrat du catalogue. Le câblage choisit fixture ou BGG.
- 06 : le besoin d’enregistrer introduit `PlayWriter`, réalisé en mémoire.
- 07 : Prisma réalise le même contrat avec SQLite.
- 08 : la CLI appelle le même port primaire, sans dupliquer les règles.
- 09 : la règle des noms uniques change le cas d’usage, les deux entrées en bénéficient.

Le test métier pilote l’application sans serveur. Les fixtures contrôlent les dépendances secondaires. Les tests des adaptateurs et de persistance vérifient d’autres propriétés.

Référence : [article original de Cockburn](https://alistair.cockburn.us/hexagonal-architecture). Le schéma d’origine de la slide 20 provient du deck initial d’Anaël Chardan. L’organisation des schémas progressifs reprend son dessin des côtés driver/driven en l’appliquant au code du cours.
