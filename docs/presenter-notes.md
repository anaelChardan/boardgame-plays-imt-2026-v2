# Conducteur de séance · 150 minutes

Public : première année du cycle ingénieur, Bac+3. La séance analyse les changements d’une même application, leurs coûts et les propriétés vérifiées par les tests. Le professeur réalise les démonstrations. Les échanges oraux portent sur les décisions de conception.

## 1 · SOLID et architecture hexagonale

0–2 min. Public : première année du cycle ingénieur, Bac+3. Présenter brièvement le contexte professionnel. Objectif : argumenter une séparation à partir des changements qu’elle rend moins coûteux. 150 minutes au total, pause comprise.

## 2 · Le service : enregistrer une partie

2–5 min. Exécuter la démonstration00. Distinguer comportement observable et structure interne. Le point de départ ne persiste pas encore les données. Demander où la règle sera vérifiée si une seconde entrée apparaît. Brass désigne Brass: Birmingham dans les exemples du dépôt.

## 3 · Trois évolutions du même service

5–8 min. Annoncer les changements concrets que la séance va introduire. Les étudiants proposent des options et examinent leurs conséquences pendant que le professeur code. L’activité orale reste dans la conduite de séance, pas dans la mise en scène des slides.

## 4 · Les critères de conception

8–11 min. Faire expliciter un compromis : un fichier unique facilite parfois la lecture, mais plusieurs sources de changement peuvent le rendre fragile. Vérifier les prérequis TypeScript au fil de la lecture du code. Expliquer brièvement une syntaxe si nécessaire, sans faire un cours de vocabulaire.

## 5 · Le point de départ couplé

11–15 min. Extrait abrégé de examples/00-coupled.ts. Le stockage reste simulé. Identifier quelles lignes changeraient pour un nouveau payload, une règle différente ou un schéma SQL différent. Les changements externes motivent la séparation, pas la longueur de la fonction.

## 6 · SOLID : cinq critères de conception

15 min. Carte des cinq principes. Annoncer leur rôle comme critères d’analyse, sans les présenter comme une recette mécanique. Les exemples restent centrés sur les parties de jeux de société. Source : https://www.cs.odu.edu/~zeil/cs330/latest/Public/solid/

## 7 · SRP : les axes de changement

15–18 min. SRP = une raison cohérente de changer, pas une fonction qui ne ferait qu’une instruction. Demander quelle équipe ou quel besoin déclencherait chaque changement.
Discussion possible : Quel changement justifie chaque séparation ?

## 8 · Validation indépendante du transport

18–21 min. Ouvrir principles.ts et le test du validateur. Le parsing et la conversion SQL sont aux frontières. SRP ne se démontre pas seulement en découpant une grosse interface.
Discussion possible : Ce test a-t-il besoin d’un serveur ?

## 9 · OCP : remplacer le catalogue

21–24 min. OCP dépend d’un axe d’évolution identifié. On ne prévoit pas tous les futurs possibles. Faire proposer une substitution de catalogue.
Discussion possible : Quel point de variation avons-nous choisi ?

## 10 · Le câblage concentre le changement

24–27 min. Comparaison de deux configurations, pas deux déclarations dans le même scope. Le port du catalogue sera introduit à03 et le writer à06. L’exemple annonce le câblage final. Les petits exemples autonomes sont disponibles à01. L’OCP protège un axe choisi, pas tous les changements possibles.

## 11 · LSP : le contrat observable du catalogue

27–29 min. Contrat précis utilisé dans tout le cours. LSP concerne comportement et attentes du client, même sans héritage de classes.

## 12 · Une signature compatible ne suffit pas

29–31 min. Une implémentation qui refuse un cas prévu par le contrat ne se substitue pas correctement. Ne pas confondre absence et indisponibilité.
Discussion possible : Que devient le code qui attend null ?

## 13 · Le contrat commun des catalogues

31–33 min. Extraits alignés sur le port réel, disponible à03 et les tests de contrat à05. À01, l’exemple autonome utilise find et les noms courts Game.min/max. Montrer la continuité des contrats plutôt que le détail des noms. Le contrat doit aussi distinguer une panne du fournisseur.

## 14 · ISP : le contrat vu par le consommateur

33–36 min. Le problème est le couplage du consommateur à des opérations inutiles, pas le nombre arbitraire de méthodes.
Discussion possible : De quoi le compteur de parties a-t-il besoin ?

## 15 · Des ports distincts pour lire et écrire

36–39 min. Revenir au consommateur countPlays dans principles.ts. Il demande PlayReader. L’ISP porte sur le besoin des clients, pas sur l’obligation de créer de nombreux petits objets. Une implémentation commune reste possible.

## 16 · DIP : le métier dépend du stockage

39–42 min. Montrer le problème d’import et le vocabulaire SQL qui entre dans le métier. Demander comment on testerait les bornes sans base.
Discussion possible : Faut-il une base pour vérifier la règle ?

## 17 · Le domaine définit le port

42–45 min. DIP et injection ne sont pas synonymes. Pas besoin de conteneur DI. Une fonction suffit. Le domaine n’importe pas Prisma.
Discussion possible : DIP : qui définit le contrat ? DI : qui fournit l’objet ?

## 18 · Les décisions obtenues avec SOLID

45–46 min. Synthèse des décisions effectivement prises. Demander laquelle serait superflue pour un script jetable. Les lettres servent à argumenter, elles ne remplacent pas l’analyse du contexte.

## 19 · Couches et frontière applicative

46–48 min. Éviter l’opposition artificielle entre couches et architecture hexagonale. Les dossiers ne prouvent pas la règle de dépendance. Examiner les imports et les contrats. Source : https://alistair.cockburn.us/hexagonal-architecture

## 20 · La frontière du domaine

48–51 min. Cartographie des conversations à l’exécution, pas graphe d’imports. PlayAGame est le port d’entrée. Le catalogue et l’écriture sont les ports de sortie. Fixture/BGG et mémoire/Prisma sont des alternatives. Source : https://alistair.cockburn.us/hexagonal-architecture

## 21 · Dépendances à la compilation

51–53 min. Chaque flèche signifie « importe le type de ». Le domaine ne connaît aucun adaptateur concret. composition.ts connaît les deux côtés pour les assembler. Comparer avec les appels de la slide suivante.

## 22 · Séquence d’un enregistrement

53–55 min. Séquence nominale de la version finale. L’étape03 valide, puis l’étape06 ajoute l’écriture. Une exception de validation interrompt la séquence avant save. Les interfaces sont définies dans le domaine même quand l’appel atteint un adaptateur externe.

## 23 · Le modèle manipulé par le cas d’usage

55–59 min. Ouvrir model.ts à02. Les types n’expriment pas à eux seuls la validité du nombre de joueurs. Distinguer forme des données et invariants. bggId reste un identifiant de référence dans le vocabulaire du cours, sans introduire le XML dans le domaine.

## 24 · La validation dans le cas d’usage

59–67 min. Extrait avec variables abrégées. Coder la condition avec la salle puis lancer tests/domain.test.ts. À cette étape on retourne le Play, sans prétendre l’avoir sauvegardé. Le test n’effectue aucun appel réseau.
Discussion possible : La règle se vérifie sans HTTP et sans BGG.

## 25 · Les tests aux frontières de l’intervalle

67–75 min. Faire la mutation temporaire > vers >= dans le worktree03. Lancer le test, observer la borne4 échouer, annuler uniquement cette petite édition manuellement. Garder 1 minute pour expliquer que les tests réseau et SQL vérifieront autre chose.
Discussion possible : Que se passe-t-il si « > » devient « >= » ?

## 26 · Pause

75–85 min. Pause. Annoncer l’heure de reprise. Préparer04 depuis le clone principal si nécessaire.

## 27 · HTTP : validation et traduction

85–91 min. Étape04 : validation seule, réponse200. À l’étape06 on passera à201 après l’écriture. Modifier un payload, laisser la salle prédire400 ou422. Extrait abrégé, fichier complet dans infrastructure/http.ts.
Discussion possible : Le JSON reste à la frontière.

## 28 · La politique d’erreur de l’API

91–95 min. Codes décidés par notre API, pas imposés par l’architecture hexagonale. Une autre API pourrait choisir d’autres conventions explicites. Le domaine expose des erreurs métier, pas des codes HTTP.

## 29 · Absence métier ou panne technique

95–100 min. Présenter le scénario « BGG répond401 » oralement. Laisser argumenter sur le comportement attendu avant de commenter les deux colonnes. Les codes de notre API sont une décision explicite. Aucun fallback silencieux vers des fixtures.

## 30 · Intégration du catalogue BGG

100–104 min. Ouvrir composition.ts, montrer le choix CATALOG. Le mode live est facultatif et demande un jeton BGG valide. Ne pas réutiliser le jeton Slides. Les tests BGG utilisent des réponses HTTP contrôlées. Source : https://boardgamegeek.com/wiki/page/BGG_XML_API2
Discussion possible : Le réseau peut échouer sans changer la règle.

## 31 · La traduction au niveau de l’adaptateur

104–109 min. Montrer recherche exacte puis détail par identifiant dans bgg.ts. Expliquer le délai maximum, la validation de réponse et la panne distincte. Éviter de taper le parsing complet en direct.
Discussion possible : Le XML ne traverse pas le port.

## 32 · Les niveaux de vérification

109–115 min. Lancer catalogue.test.ts. Le faux transport valide notre conversion, pas la disponibilité de BGG ni un jeton réel. Temps et hasard peuvent aussi rendre un test variable, même sans réseau.

## 33 · La sauvegarde fait partie du cas d’usage

115–121 min. Faire écrire await writer.save(play) avec la salle. Étape06 retourne201 après succès. Sans await, on pourrait annoncer une création avant un échec. Montrer le test de stockage indisponible.
Discussion possible : À quel moment peut-on annoncer « créée » ?

## 34 · Deux propriétés à vérifier

121–124 min. Montrer save.test.ts. Une partie invalide ne provoque aucun enregistrement. Une erreur du writer doit empêcher201. Reformuler la première propriété comme absence d’appel au writer dans une variante de test avec spy, et comme stockage inchangé dans la version présente.

## 35 · Persistance après reconnexion

124–130 min. Démonstration préparée. npm run db:setup, puis STORAGE=sqlite npm run cli à partir de08 ou test Prisma à07. Le test ferme la connexion, rouvre la même base temporaire et relit la partie. Aucun Docker. Ne pas taper tout le schéma.
Discussion possible : Même PlayWriter, stockage réellement persistant.

## 36 · Une entrée CLI sur le même cas d’usage

130–134 min. Réponse non, montrer runCli puis le domaine. Mode memory : chaque processus a son propre magasin. Pour partager avec le serveur, choisir sqlite et la même DATABASE_URL. Comparer une acceptation et un refus.
Discussion possible : Faut-il réécrire la règle du nombre de joueurs ?

## 37 · Unicité des participants

134–138 min. Partir de08. Demander quels modules doivent changer et quelles régressions vérifier. Laisser2minutes de discussion puis réaliser le changement. Option de4minutes de code seulement si les postes sont déjà prêts. L’unicité par nom est une simplification explicite, pas un modèle universel des personnes.

## 38 · Une règle commune aux deux entrées

138–140 min. Passer à09, montrer le diff08→09 et lancer challenge.test.ts. Définition simplifiée de l’identité par le nom pour cet exercice. En production deux personnes peuvent porter le même nom : un identifiant serait un autre besoin.
Discussion possible : HTTP et CLI refusent la même partie.

## 39 · Le coût des frontières

140–144 min. Discuter les compromis. Pas d’interface automatique pour chaque classe. Hors périmètre : DDD complet, CQRS, microservices. Pistes après cours : idempotence, vrais identifiants joueurs, transaction si plusieurs écritures doivent réussir ensemble.
Discussion possible : Un petit script jetable aurait-il besoin de tout cela ?

## 40 · Les limites du modèle et la suite

144–150 min. Synthèse orale des cinq critères SOLID et de la frontière applicative, puis questions. Les prolongements sont hors périmètre du code livré. L’idempotence ne découle pas automatiquement des ports. Sources : https://alistair.cockburn.us/hexagonal-architecture ; https://www.cs.odu.edu/~zeil/cs330/latest/Public/solid/ ; https://boardgamegeek.com/wiki/page/BGG_XML_API2
