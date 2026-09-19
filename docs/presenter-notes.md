# Conducteur de séance · 150 minutes

Public : première année du cycle ingénieur, Bac+3. La séance analyse les changements d’une même application, leurs coûts et les propriétés vérifiées par les tests. Le professeur réalise les démonstrations. Les étudiants peuvent interrompre le professeur pour poser leurs questions. Les réponses accompagnent les démonstrations, sans séquences de prédiction ni exercices en binôme.

## 1 · SOLID et architecture hexagonale

0–2 min. Public : première année du cycle ingénieur, Bac+3. Présenter brièvement le contexte professionnel. Objectif : argumenter une séparation à partir des changements qu’elle rend moins coûteux. 150 minutes au total, pause comprise.

## 2 · Le service : enregistrer une partie

2–5 min. Exécuter la démonstration00. Distinguer comportement observable et structure interne. Le point de départ ne persiste pas encore les données. Expliquer où la règle sera vérifiée si une seconde entrée apparaît. Brass désigne Brass: Birmingham dans les exemples du dépôt.

## 3 · Trois évolutions du même service

5–8 min. Annoncer les changements concrets que la séance va introduire. Préciser que les étudiants peuvent interrompre la démonstration pour poser leurs questions. Répondre au fil du cours. Aucun tour de table, sondage ou exercice en binôme prévu.

## 4 · Les critères de conception

8–11 min. Expliquer le compromis suivant : un fichier unique facilite parfois la lecture, mais plusieurs sources de changement peuvent le rendre fragile. Vérifier les prérequis TypeScript au fil de la lecture du code. Expliquer brièvement une syntaxe si nécessaire, sans faire un cours de vocabulaire.

## 5 · Le point de départ couplé

11–15 min. Extrait abrégé de examples/00-coupled.ts. Le stockage reste simulé. Identifier quelles lignes changeraient pour un nouveau payload, une règle différente ou un schéma SQL différent. Les changements externes motivent la séparation, pas la longueur de la fonction.

## 6 · SOLID : cinq critères de conception

15 min. Carte des cinq principes. Annoncer leur rôle comme critères d’analyse, sans les présenter comme une recette mécanique. Les exemples restent centrés sur les parties de jeux de société. Source : https://www.cs.odu.edu/~zeil/cs330/latest/Public/solid/

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

55–59 min. Ouvrir model.ts à02. Les types n’expriment pas à eux seuls la validité du nombre de joueurs. Distinguer forme des données et invariants. bggId reste un identifiant de référence dans le vocabulaire du cours, sans introduire le XML dans le domaine.

## 27 · Un premier hexagone piloté par les tests

59–61 min. Ouvrir tests/domain.test.ts puis le type PlayAGame et BoardgameInventory. Le test appelle le même port primaire que les futures entrées. Le catalogue fixture implémente le port secondaire. Aucun HTTP ni stockage à cette étape. Lancer la suite métier sans réseau.

## 28 · La validation dans le cas d’usage

61–67 min. Extrait avec variables abrégées. Coder et expliquer la condition puis lancer tests/domain.test.ts. À cette étape on retourne le Play, sans prétendre l’avoir sauvegardé. Le test n’effectue aucun appel réseau. Le code complet est déjà dans le checkpoint. Saisir uniquement les petites modifications indiquées dans le conducteur.

## 29 · Les tests aux frontières de l’intervalle

67–75 min. Faire la mutation temporaire > vers >= dans le worktree03. Lancer le test, observer la borne4 échouer, annuler uniquement cette petite édition manuellement. Garder 1 minute pour expliquer que les tests réseau et SQL vérifieront autre chose.

## 30 · Pause

75–85 min. Pause. Annoncer l’heure de reprise. Préparer04 depuis le clone principal si nécessaire.

## 31 · HTTP rejoint le port primaire

85–87 min. Ouvrir src/infrastructure/http.ts. Montrer le type PlayAGame reçu en paramètre et l’appel play(parsed.data). HTTP traduit JSON et erreurs, le domaine garde ses règles. Les tests existants restent des pilotes du même contrat. Préparer 04 depuis le clone principal, puis montrer le code déjà présent.

## 32 · HTTP : validation et traduction

87–91 min. Étape04 : validation seule, réponse200. À l’étape06 on passera à201 après l’écriture. Modifier un payload et expliquer pourquoi la réponse devient400 ou422. Extrait abrégé, fichier complet dans infrastructure/http.ts. Le code complet est déjà dans le checkpoint. Saisir uniquement les petites modifications indiquées dans le conducteur.

## 33 · La politique d’erreur de l’API

91–95 min. Codes décidés par notre API, pas imposés par l’architecture hexagonale. Une autre API pourrait choisir d’autres conventions explicites. Le domaine expose des erreurs métier, pas des codes HTTP.

## 34 · Absence métier ou panne technique

95–100 min. Présenter le scénario « BGG répond401 » et expliquer le comportement attendu à partir des deux colonnes. Les codes de notre API sont une décision explicite. Aucun fallback silencieux vers des fixtures.

## 35 · BGG réalise le port secondaire de catalogue

100–102 min. Ouvrir src/domain/ports.ts, src/infrastructure/bgg.ts puis src/composition.ts. Même BoardgameInventory, autre réalisation. Fixture et BGG sont des alternatives choisies au démarrage, pas deux appels successifs. Les flèches indiquent les appels. Le retour du jeu ne transforme pas BGG en adaptateur primaire.

## 36 · Intégration du catalogue BGG

102–105 min. Ouvrir composition.ts, montrer le choix CATALOG. Le mode live est facultatif et demande un jeton BGG valide. Ne pas réutiliser le jeton Slides. Les tests BGG utilisent des réponses HTTP contrôlées. Source : https://boardgamegeek.com/wiki/page/BGG_XML_API2 Le code complet est déjà dans le checkpoint. Saisir uniquement les petites modifications indiquées dans le conducteur.

## 37 · La traduction au niveau de l’adaptateur

104–109 min. Montrer recherche exacte puis détail par identifiant dans bgg.ts. Expliquer le délai maximum, la validation de réponse et la panne distincte. Éviter de taper le parsing complet en direct.

## 38 · Les niveaux de vérification

109–115 min. Lancer catalogue.test.ts. Le faux transport valide notre conversion, pas la disponibilité de BGG ni un jeton réel. Temps et hasard peuvent aussi rendre un test variable, même sans réseau.

## 39 · Un nouveau besoin : enregistrer la partie

115–117 min. Ouvrir le diff 05/06 puis PlayWriter dans ports.ts. Le cas d’usage a désormais besoin d’enregistrer : c’est un nouveau port secondaire, avec un adaptateur mémoire. Ouvrir play-a-game.ts pour montrer await writer.save(play). La manipulation suivante retire puis rétablit cette ligne.

## 40 · La sauvegarde fait partie du cas d’usage

117–121 min. Ajouter await writer.save(play) et expliquer son rôle. Étape06 retourne201 après succès. Sans await, on pourrait annoncer une création avant un échec. Montrer le test de stockage indisponible. Le code complet est déjà dans le checkpoint. Saisir uniquement les petites modifications indiquées dans le conducteur.

## 41 · Deux propriétés à vérifier

121–124 min. Montrer save.test.ts. Une partie invalide ne provoque aucun enregistrement. Une erreur du writer doit empêcher201. Reformuler la première propriété comme absence d’appel au writer dans une variante de test avec spy, et comme stockage inchangé dans la version présente.

## 42 · SQLite remplace l’adaptateur mémoire

124–125 min. Ouvrir src/infrastructure/prisma-store.ts et le câblage. Le port PlayWriter et le métier ne changent pas. Mémoire et Prisma sont des alternatives. SQLite est un fichier local, aucun conteneur ni service de base à lancer. La slide suivante prouve la persistance après reconnexion.

## 43 · Persistance après reconnexion

125–130 min. Démonstration préparée. npm run db:setup, puis STORAGE=sqlite npm run cli à partir de08 ou test Prisma à07. Le test ferme la connexion, rouvre la même base temporaire et relit la partie. Aucun Docker. Ne pas taper tout le schéma.
Lecture du schéma : Le client A écrit puis se déconnecte. Le client B est une nouvelle connexion au même fichier SQLite et relit la partie. Le maintien du résultat après reconnexion établit la persistance. Le code complet est déjà dans le checkpoint. Saisir uniquement les petites modifications indiquées dans le conducteur.

## 44 · La CLI réutilise le même port primaire

130–131 min. Ouvrir src/infrastructure/cli.ts puis src/cli.ts. Les arguments deviennent une PlayRequest, puis la CLI appelle PlayAGame. Aucune copie des règles métier. Exécuter une acceptation et un refus dans le créneau de la slide suivante. Pour montrer le partage avec HTTP, choisir SQLite et le même fichier de base.

## 45 · Une entrée CLI sur le même cas d’usage

131–134 min. Montrer runCli puis le domaine pour établir la réutilisation du cas d’usage. Mode memory : chaque processus a son propre magasin. Pour partager avec le serveur, choisir sqlite et la même DATABASE_URL. Comparer une acceptation et un refus. Le code complet est déjà dans le checkpoint. Saisir uniquement les petites modifications indiquées dans le conducteur.

## 46 · Unicité des participants

134–138 min. Partir de08. Présenter la nouvelle exigence, montrer quels modules doivent changer, puis réaliser la modification et expliquer les régressions à vérifier. Répondre aux questions au fil de la démonstration. L’unicité par nom est une simplification explicite, pas un modèle universel des personnes.

## 47 · Une règle commune aux deux entrées

138–140 min. Passer à09, montrer le diff08→09 et lancer challenge.test.ts. Définition simplifiée de l’identité par le nom dans cette démonstration. En production deux personnes peuvent porter le même nom : un identifiant serait un autre besoin.

## 48 · Le coût des frontières

140–144 min. Expliquer les compromis et répondre aux questions qui se présentent. Pas d’interface automatique pour chaque classe. Hors périmètre : DDD complet, CQRS, microservices. Pistes après cours : idempotence, vrais identifiants joueurs, transaction si plusieurs écritures doivent réussir ensemble.

## 49 · Les limites du modèle et la suite

144–150 min. Synthèse orale des cinq critères SOLID et de la frontière applicative, puis questions. Les prolongements sont hors périmètre du code livré. L’idempotence ne découle pas automatiquement des ports. Sources : https://alistair.cockburn.us/hexagonal-architecture ; https://www.cs.odu.edu/~zeil/cs330/latest/Public/solid/ ; https://boardgamegeek.com/wiki/page/BGG_XML_API2
