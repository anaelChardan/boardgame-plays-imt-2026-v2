# Conducteur de séance · 150 minutes

Public : première année du cycle ingénieur, Bac+3. Parcours par défaut : expliquer le besoin, montrer les diffs, lire le code préparé et commenter les démos. Toute la séance peut se dérouler sans écrire de code. Deux petites modifications restent optionnelles aux étapes 03 et 06. Les étudiants posent leurs questions au fil du cours. Les commandes course se lancent depuis le clone principal, puis les fichiers se lisent dans le dossier du checkpoint affiché.

## 1 · SOLID et architecture hexagonale

0–2 min. Public : première année du cycle ingénieur, Bac+3. Présenter brièvement le contexte professionnel. Objectif : argumenter une séparation à partir des changements qu’elle rend moins coûteux. 150 minutes au total, pause comprise.

## 2 · Le service : enregistrer une partie

2–5 min. Exécuter la démonstration00. Distinguer comportement observable et structure interne. Le point de départ ne persiste pas encore les données. Expliquer où la règle sera vérifiée si une seconde entrée apparaît. Brass désigne Brass: Birmingham dans les exemples du dépôt.

Passage au code : Lancer npm run course -- run 00 depuis le clone principal. Montrer le résultat au terminal ; la lecture du code vient à la slide 5.

## 3 · Trois évolutions du même service

5–8 min. Annoncer les trois évolutions du service. Expliquer le déroulé : besoin, diff entre checkpoints, lecture des fichiers préparés et résultat de la démo. Le cours entier peut être présenté sans écrire de code. Les étudiants posent leurs questions au fil des démonstrations. Aucun exercice en binôme, sondage ou prédiction imposée.

## 4 · Les critères de conception

8–11 min. Expliquer le compromis suivant : un fichier unique facilite parfois la lecture, mais plusieurs sources de changement peuvent le rendre fragile. Vérifier les prérequis TypeScript au fil de la lecture du code. Expliquer brièvement une syntaxe si nécessaire, sans faire un cours de vocabulaire.

## 5 · Le point de départ couplé

11–15 min. Extrait abrégé de examples/00-coupled.ts. Le stockage reste simulé. Identifier quelles lignes changeraient pour un nouveau payload, une règle différente ou un schéma SQL différent. Les changements externes motivent la séparation, pas la longueur de la fonction.

Passage au code : Ouvrir examples/00-coupled.ts dans le dossier affiché par npm run course -- prepare 00.

## 6 · SOLID : cinq critères de conception

15 min. Présenter SOLID comme cinq critères d’analyse des changements. Depuis le clone principal, lancer npm run course -- present 01 : le diff introduit les exemples préparés, puis la démo montre les cinq observations. Ouvrir examples/solid/principles.ts et tests/solid.test.ts dans 01. Revenir aux slides de chaque principe pendant les 25 minutes suivantes. Lire et expliquer les exemples sans les retaper. Source : https://www.cs.odu.edu/~zeil/cs330/latest/Public/solid/

## 7 · SRP : les axes de changement

15–17 min. SRP = une raison cohérente de changer, pas une fonction qui ne ferait qu’une instruction. Illustrer quelle équipe ou quel besoin déclencherait chaque changement.
Lecture du schéma : Les flèches relient chaque source de changement à la responsabilité concernée. Elles ne représentent pas des appels à l’exécution.

## 8 · Validation indépendante du transport

17–20 min. Ouvrir principles.ts et le test du validateur. Le parsing et la conversion SQL sont aux frontières. SRP ne se démontre pas seulement en découpant une grosse interface.

## 9 · OCP : remplacer le catalogue

20–22 min. OCP dépend d’un axe d’évolution identifié. On ne prévoit pas tous les futurs possibles. Montrer une substitution de catalogue.
Lecture du schéma : Le schéma représente les appels possibles via BoardgameInventory. Le câblage sélectionne un seul catalogue au démarrage. Les deux branches sont des alternatives, pas deux appels systématiques.

## 10 · Le câblage concentre le changement

22–25 min. Comparaison de deux configurations, pas deux déclarations dans le même scope. Le port du catalogue sera introduit à03 et le writer à06. L’exemple annonce le câblage final. Les petits exemples autonomes sont disponibles à01. L’OCP protège un axe choisi, pas tous les changements possibles.

## 11 · LSP : le contrat observable du catalogue

25–27 min. Contrat précis utilisé dans tout le cours. LSP concerne comportement et attentes du client, même sans héritage de classes.

## 12 · Une signature compatible ne suffit pas

27–28 min. Une implémentation qui refuse un cas prévu par le contrat ne se substitue pas correctement. Ne pas confondre absence et indisponibilité.

## 13 · Le contrat commun des catalogues

28–30 min. Extraits alignés sur le port réel, disponible à03 et les tests de contrat à05. À01, l’exemple autonome utilise find et les noms courts Game.min/max. Montrer la continuité des contrats plutôt que le détail des noms. Le contrat doit aussi distinguer une panne du fournisseur.

## 14 · ISP : le contrat vu par le consommateur

30–32 min. Le problème est le couplage du consommateur à des opérations inutiles, pas le nombre arbitraire de méthodes.

## 15 · Des ports distincts pour lire et écrire

32–35 min. Revenir au consommateur countPlays dans principles.ts. Il demande PlayReader. L’ISP porte sur le besoin des clients, pas sur l’obligation de créer de nombreux petits objets. Une implémentation commune reste possible.
Lecture du schéma : Les flèches de gauche signifient « utilise ce contrat ». Celles de droite signifient « implémente ce contrat ». Un rapport peut recevoir PlayReader, tandis que PlayAGame ne demande que PlayWriter. Un même adaptateur peut réaliser les deux ports.

## 16 · DIP : le métier dépend du stockage

35–37 min. Montrer le problème d’import et le vocabulaire SQL qui entre dans le métier. Montrer comment tester les bornes sans base.

## 17 · Le domaine définit le port

37–40 min. DIP et injection ne sont pas synonymes. Pas besoin de conteneur DI. Une fonction suffit. Le domaine n’importe pas Prisma.

## 18 · Les décisions obtenues avec SOLID

40–41 min. Synthèse des décisions effectivement prises. Expliquer pourquoi certaines de ces séparations seraient superflues pour un script jetable. Les lettres servent à argumenter, elles ne remplacent pas l’analyse du contexte.

## 19 · Couches et frontière applicative

41–42 min. Éviter l’opposition artificielle entre couches et architecture hexagonale. Les dossiers ne prouvent pas la règle de dépendance. Examiner les imports et les contrats. Source : https://alistair.cockburn.us/hexagonal-architecture

## 20 · L’inversion de dépendance, dans le schéma initial

42–43 min. Schéma repris de la présentation initiale, slide 51. Ici les flèches se lisent comme des dépendances de code vers le domaine. La persistance dépend du contrat défini à l’intérieur. Le cas d’usage pourra appeler cet adaptateur à l’exécution : cela ne renverse pas les imports. Source : deck original d’Anaël Chardan, https://slides.com/anaelchardan/hexagonal-architecture-and-beyond-0e45d4

## 21 · L’hexagone : les contrats à la frontière

43–45 min. Cartographie des conversations à l’exécution, pas graphe d’imports. PlayAGame est le port d’entrée. Le catalogue et l’écriture sont les ports de sortie. Fixture/BGG et mémoire/Prisma sont des alternatives. Source : https://alistair.cockburn.us/hexagonal-architecture Reprendre la frontière du schéma d’origine. Le cœur regroupe ici cas d’usage et règles métier dans domain/. Les rectangles sur la frontière représentent les contrats. Le port primaire PlayAGame est un type de fonction, pas nécessairement une interface orientée objet. Les six côtés ne prescrivent ni six ports ni six dossiers. Cette carte montre la cible, les diapositives de démonstration montreront seulement les pièces déjà présentes.

## 22 · Ports primaires et secondaires

45–48 min. Primaire = entrant = driver/driving : un acteur extérieur demande un service à l’application. Secondaire = sortant = driven : l’application sollicite une capacité externe. HTTP et CLI sont des adaptateurs primaires, PlayAGame est leur contrat. BGG et Prisma sont des adaptateurs secondaires, BoardgameInventory et PlayWriter sont les contrats qu’ils implémentent. Un retour de données ne change pas le rôle : le catalogue est secondaire même lorsqu’il renvoie un jeu. Un port décrit une conversation métier, pas un port TCP. Un test qui appelle PlayAGame joue le rôle de pilote, un catalogue en mémoire remplace une dépendance secondaire. Source : https://alistair.cockburn.us/hexagonal-architecture

## 23 · Dépendances à la compilation

48–49 min. Chaque flèche signifie « importe le type de ». Le domaine ne connaît aucun adaptateur concret. composition.ts connaît les deux côtés pour les assembler. Comparer avec les appels de la slide suivante.

## 24 · Séquence d’un enregistrement

49–51 min. Séquence nominale de la version finale. L’étape03 valide, puis l’étape06 ajoute l’écriture. Une exception de validation interrompt la séquence avant save. Les interfaces sont définies dans le domaine même quand l’appel atteint un adaptateur externe.

## 25 · Retrouver l’architecture dans le code

51–55 min. Ouvrir src/domain/play-a-game.ts dans main comme aperçu de la cible, puis src/domain/ports.ts et src/composition.ts. PlayAGame annonce une capacité métier, BoardgameInventory et PlayWriter ses besoins. Le contrat primaire est un type de fonction dans play-a-game.ts, les secondaires sont regroupés dans ports.ts. Montrer les imports : aucune référence à Fastify ni Prisma dans le cas d’usage. Les noms des dossiers aident, les contrats et imports constituent la preuve. Dans ce petit dépôt, domain/ regroupe domaine et cas d’usage. Montrer HTTP/CLI comme appelants. Le GET /plays délègue directement à PlayReader dans cette démo : il ne traverse pas PlayAGame. Ne pas présenter ce raccourci de lecture comme un deuxième cas d’usage métier explicite. Revenir ensuite au checkpoint 02 pour construire progressivement.

## 26 · Le modèle manipulé par le cas d’usage

55–59 min. Depuis le clone principal, lancer npm run course -- present 02. Le diff 01/02 introduit Boardgame, PlayRequest, Play et les fixtures. Ouvrir src/domain/model.ts puis src/infrastructure/fixtures.ts dans 02. La démo montre une demande bien typée qui ne respecte pourtant pas le nombre de joueurs. Distinguer forme des données et invariant métier. bggId reste un identifiant de référence, sans XML dans le domaine.

## 27 · Un premier hexagone piloté par les tests

59–61 min. Présenter le premier hexagone : les tests pilotent PlayAGame, qui utilise BoardgameInventory avec une fixture. Depuis le clone principal, lancer npm run course -- present 03. Le diff 02/03 montre le cas d’usage et son port ; la démo montre les bornes acceptées et refusées. Ouvrir src/domain/play-a-game.ts, src/domain/ports.ts et tests/domain.test.ts dans 03. Aucun HTTP ni stockage à cette étape.

## 28 · La validation dans le cas d’usage

61–67 min. Lire la solution 03 préparée. Expliquer recherche du jeu, normalisation des noms et validation min/max ; relier chaque branche aux résultats de la démo. Montrer le contrat du catalogue et les imports du cas d’usage. On retourne le Play sans sauvegarde. Aucun code à saisir. Les variables de l’extrait sont abrégées, le fichier complet est src/domain/play-a-game.ts.

## 29 · Les tests aux frontières de l’intervalle

67–75 min. Parcours par défaut : ouvrir tests/domain.test.ts dans 03 et lancer npm test -- tests/domain.test.ts. Lire les cas 1, 2, 4, 5 et jeu inconnu, puis les relier à la condition métier. Expliquer comment le test à 4 protège la borne supérieure et pourquoi cette suite fonctionne sans réseau ni base. Répondre aux questions sur le choix des exemples. Option seulement, une à deux minutes dans ce créneau : changer > en >=, constater le test rouge à 4, remettre > puis relancer. Sans cette modification, commenter directement l’assertion de la borne supérieure. Le parcours reste complet sans saisie.

## 30 · Pause

75–85 min. Pause. Annoncer l’heure de reprise. Préparer04 depuis le clone principal si nécessaire.

## 31 · HTTP rejoint le port primaire

85–87 min. HTTP devient un adaptateur primaire du même port PlayAGame. Depuis le clone principal, lancer npm run course -- present 04. Le diff 03/04 se concentre sur src/infrastructure/http.ts ; la démo appelle réellement les routes via inject(), sans ouvrir de port réseau. Ouvrir ce fichier et tests/http.test.ts dans 04. Repérer play(parsed.data) et vérifier que la règle reste dans le cas d’usage.

## 32 · HTTP : validation et traduction

87–91 min. Lire le décodage et la traduction HTTP dans le code préparé à 04. Commenter les demandes déjà présentes dans la démo : forme invalide, jeu inconnu, nombre invalide, succès. Aucune saisie de payload nécessaire ; curl avec npm start reste une variante facultative du conducteur. Réponse 200 à 04 ; réponse 201 seulement après la sauvegarde à 06. Les variables de l’extrait sont abrégées.

## 33 · La politique d’erreur de l’API

91–95 min. Codes décidés par notre API, pas imposés par l’architecture hexagonale. Une autre API pourrait choisir d’autres conventions explicites. Le domaine expose des erreurs métier, pas des codes HTTP.

## 34 · Absence métier ou panne technique

95–100 min. Présenter le scénario « BGG répond401 » et expliquer le comportement attendu à partir des deux colonnes. Les codes de notre API sont une décision explicite. Aucun fallback silencieux vers des fixtures.

## 35 · BGG réalise le port secondaire de catalogue

100–102 min. Présenter BGG comme un adaptateur secondaire réalisant BoardgameInventory. Depuis le clone principal, lancer npm run course -- present 05. Le diff 04/05 montre bgg.ts et la composition ; la démo utilise le vrai adaptateur XML avec des réponses HTTP contrôlées. Ouvrir src/domain/ports.ts, src/infrastructure/bgg.ts et src/composition.ts dans 05. Fixture et BGG sont des alternatives ; le retour du jeu ne transforme pas BGG en adaptateur primaire.

## 36 · Intégration du catalogue BGG

102–105 min. Lire le câblage préparé dans src/composition.ts, sans modifier la configuration. Le parcours du cours reste hors ligne : npm run course -- present 05 montre la substitution avec des réponses contrôlées. Aucun jeton réel ni appel au service BGG pendant la séance. Distinguer le choix de l’adaptateur dans l’application et le transport contrôlé de la démo. Un accès réel, hors séance, demanderait un jeton BGG valide. Source : https://boardgamegeek.com/wiki/page/BGG_XML_API2

## 37 · La traduction au niveau de l’adaptateur

105–109 min. Lire la recherche exacte puis le détail par identifiant dans le parseur préparé de bgg.ts. Relier le XML contrôlé aux champs de Boardgame. Expliquer délai maximum, validation de réponse et panne technique distincte de l’absence métier. Aucune implémentation à saisir.

## 38 · Les niveaux de vérification

109–115 min. Lancer catalogue.test.ts. Le faux transport valide notre conversion, pas la disponibilité de BGG ni un jeton réel. Temps et hasard peuvent aussi rendre un test variable, même sans réseau.

## 39 · Un nouveau besoin : enregistrer la partie

115–117 min. Un nouveau besoin fait apparaître PlayWriter. Depuis le clone principal, lancer npm run course -- present 06 : le diff 05/06 montre le port, l’appel de sauvegarde et la mémoire ; la démo vérifie 201 après écriture, refus sans ajout et panne du writer. Ouvrir src/domain/ports.ts, src/domain/play-a-game.ts, src/infrastructure/memory-store.ts et tests/save.test.ts dans 06. La sauvegarde est déjà implémentée.

## 40 · La sauvegarde fait partie du cas d’usage

117–121 min. Lire await writer.save(play) dans la solution 06 et expliquer pourquoi la réussite attend l’écriture. Comparer le cas d’usage à 05, qui retournait seulement une partie. Commenter les résultats de la démo, puis lancer npm test -- tests/save.test.ts dans 06. Aucune ligne à ajouter. Option seulement : commenter toute la ligne await writer.save(play), observer le test rouge, rétablir la ligne et relancer. Ne pas retirer seulement await. Sans cette option, lire l’assertion sur le contenu du stockage.

## 41 · Deux propriétés à vérifier

121–124 min. Lire les tests préparés de tests/save.test.ts. Une partie invalide n’ajoute rien ; une panne du writer empêche la réponse 201. Montrer les assertions portant sur le stockage et le statut HTTP. Expliquer pourquoi une simple assertion sur la valeur retournée ne suffirait pas. Aucun nouveau test à écrire.

## 42 · SQLite remplace l’adaptateur mémoire

124–125 min. Présenter Prisma comme une autre réalisation de PlayWriter. Depuis le clone principal, lancer npm run course -- present 07. Le diff 06/07 montre l’adaptateur et son câblage ; la démo écrit dans SQLite puis relit après reconnexion. Ouvrir src/infrastructure/prisma-store.ts et prisma/schema.prisma dans 07. Le port et les règles métier restent identiques. SQLite est un fichier local, aucun conteneur nécessaire.

## 43 · Persistance après reconnexion

125–130 min. Commenter la démo déjà lancée par present 07 ; pour la rejouer séparément, npm run course -- run 07. Le client A écrit puis ferme sa connexion ; une nouvelle instance Prisma relit le même fichier SQLite. Ouvrir src/demo.ts et tests/prisma.test.ts dans 07. La base temporaire est créée et supprimée automatiquement, sans db:setup manuel ni saisie du schéma. Relier cette preuve à la propriété de persistance, distincte des tests métier.

## 44 · La CLI réutilise le même port primaire

130–131 min. La CLI devient une seconde entrée du même port primaire. Depuis le clone principal, lancer npm run course -- present 08. Le diff 07/08 montre src/infrastructure/cli.ts et src/cli.ts ; la démo compare HTTP et CLI avec le même cas d’usage. Ouvrir ces fichiers dans 08. Les arguments deviennent une PlayRequest et les règles ne sont pas dupliquées.

## 45 · Une entrée CLI sur le même cas d’usage

131–134 min. Lire runCli puis le domaine pour montrer la réutilisation. Commenter les résultats déjà affichés par present 08 : même partie acceptée, même refus à un joueur. La démo partage la mémoire dans un seul processus. Deux processus séparés nécessiteraient SQLite et le même fichier de base ; cette variante reste facultative. Aucun code à saisir.

## 46 · Unicité des participants

134–138 min. Présenter la nouvelle exigence : Alice et « alice » avec espaces représentent le même nom normalisé dans ce modèle. Depuis le clone principal, lancer npm run course -- present 09. Lire le diff 08/09 : condition d’unicité, message d’erreur et tests d’intégration déjà écrits. Ouvrir src/domain/play-a-game.ts, src/domain/errors.ts et tests/challenge.test.ts dans 09. Le parcours par défaut consiste à expliquer ces modifications et leurs effets, sans ajouter de test ni taper la condition.

## 47 · Une règle commune aux deux entrées

138–140 min. Relier le diff 08/09 aux résultats de la démo 09 : HTTP 422, CLI code 1, stockage vide pour les doublons ; Alice et Bob restent acceptés. Si nécessaire, lancer npm test -- tests/challenge.test.ts dans 09. Montrer que les adaptateurs HTTP et CLI réutilisent la même politique. L’unicité par nom reste une convention de la démonstration ; les homonymes demanderaient un autre modèle.

## 48 · Le coût des frontières

140–144 min. Expliquer les compromis et répondre aux questions qui se présentent. Pas d’interface automatique pour chaque classe. Hors périmètre : DDD complet, CQRS, microservices. Pistes après cours : idempotence, vrais identifiants joueurs, transaction si plusieurs écritures doivent réussir ensemble.

## 49 · Les limites du modèle et la suite

144–150 min. Synthèse orale des cinq critères SOLID et de la frontière applicative, puis questions. Les prolongements sont hors périmètre du code livré. L’idempotence ne découle pas automatiquement des ports. Sources : https://alistair.cockburn.us/hexagonal-architecture ; https://www.cs.odu.edu/~zeil/cs330/latest/Public/solid/ ; https://boardgamegeek.com/wiki/page/BGG_XML_API2
