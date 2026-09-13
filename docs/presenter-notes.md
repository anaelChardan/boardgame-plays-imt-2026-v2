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

15–18 min. SRP = une raison cohérente de changer, pas une fonction qui ne ferait qu’une instruction. Illustrer quelle équipe ou quel besoin déclencherait chaque changement.
Lecture du schéma : Les flèches relient chaque source de changement à la responsabilité concernée. Elles ne représentent pas des appels à l’exécution.

## 8 · Validation indépendante du transport

18–21 min. Ouvrir principles.ts et le test du validateur. Le parsing et la conversion SQL sont aux frontières. SRP ne se démontre pas seulement en découpant une grosse interface.

## 9 · OCP : remplacer le catalogue

21–24 min. OCP dépend d’un axe d’évolution identifié. On ne prévoit pas tous les futurs possibles. Montrer une substitution de catalogue.
Lecture du schéma : Le schéma représente les appels possibles via BoardgameInventory. Le câblage sélectionne un seul catalogue au démarrage. Les deux branches sont des alternatives, pas deux appels systématiques.

## 10 · Le câblage concentre le changement

24–27 min. Comparaison de deux configurations, pas deux déclarations dans le même scope. Le port du catalogue sera introduit à03 et le writer à06. L’exemple annonce le câblage final. Les petits exemples autonomes sont disponibles à01. L’OCP protège un axe choisi, pas tous les changements possibles.

## 11 · LSP : le contrat observable du catalogue

27–29 min. Contrat précis utilisé dans tout le cours. LSP concerne comportement et attentes du client, même sans héritage de classes.

## 12 · Une signature compatible ne suffit pas

29–31 min. Une implémentation qui refuse un cas prévu par le contrat ne se substitue pas correctement. Ne pas confondre absence et indisponibilité.

## 13 · Le contrat commun des catalogues

31–33 min. Extraits alignés sur le port réel, disponible à03 et les tests de contrat à05. À01, l’exemple autonome utilise find et les noms courts Game.min/max. Montrer la continuité des contrats plutôt que le détail des noms. Le contrat doit aussi distinguer une panne du fournisseur.

## 14 · ISP : le contrat vu par le consommateur

33–36 min. Le problème est le couplage du consommateur à des opérations inutiles, pas le nombre arbitraire de méthodes.

## 15 · Des ports distincts pour lire et écrire

36–39 min. Revenir au consommateur countPlays dans principles.ts. Il demande PlayReader. L’ISP porte sur le besoin des clients, pas sur l’obligation de créer de nombreux petits objets. Une implémentation commune reste possible.
Lecture du schéma : Les flèches de gauche signifient « utilise ce contrat ». Celles de droite signifient « implémente ce contrat ». Un rapport peut recevoir PlayReader, tandis que PlayAGame ne demande que PlayWriter. Un même adaptateur peut réaliser les deux ports.

## 16 · DIP : le métier dépend du stockage

39–42 min. Montrer le problème d’import et le vocabulaire SQL qui entre dans le métier. Montrer comment tester les bornes sans base.

## 17 · Le domaine définit le port

42–45 min. DIP et injection ne sont pas synonymes. Pas besoin de conteneur DI. Une fonction suffit. Le domaine n’importe pas Prisma.

## 18 · Les décisions obtenues avec SOLID

45–46 min. Synthèse des décisions effectivement prises. Expliquer pourquoi certaines de ces séparations seraient superflues pour un script jetable. Les lettres servent à argumenter, elles ne remplacent pas l’analyse du contexte.

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

59–67 min. Extrait avec variables abrégées. Coder et expliquer la condition puis lancer tests/domain.test.ts. À cette étape on retourne le Play, sans prétendre l’avoir sauvegardé. Le test n’effectue aucun appel réseau.

## 25 · Les tests aux frontières de l’intervalle

67–75 min. Faire la mutation temporaire > vers >= dans le worktree03. Lancer le test, observer la borne4 échouer, annuler uniquement cette petite édition manuellement. Garder 1 minute pour expliquer que les tests réseau et SQL vérifieront autre chose.

## 26 · Pause

75–85 min. Pause. Annoncer l’heure de reprise. Préparer04 depuis le clone principal si nécessaire.

## 27 · HTTP : validation et traduction

85–91 min. Étape04 : validation seule, réponse200. À l’étape06 on passera à201 après l’écriture. Modifier un payload et expliquer pourquoi la réponse devient400 ou422. Extrait abrégé, fichier complet dans infrastructure/http.ts.

## 28 · La politique d’erreur de l’API

91–95 min. Codes décidés par notre API, pas imposés par l’architecture hexagonale. Une autre API pourrait choisir d’autres conventions explicites. Le domaine expose des erreurs métier, pas des codes HTTP.

## 29 · Absence métier ou panne technique

95–100 min. Présenter le scénario « BGG répond401 » et expliquer le comportement attendu à partir des deux colonnes. Les codes de notre API sont une décision explicite. Aucun fallback silencieux vers des fixtures.

## 30 · Intégration du catalogue BGG

100–104 min. Ouvrir composition.ts, montrer le choix CATALOG. Le mode live est facultatif et demande un jeton BGG valide. Ne pas réutiliser le jeton Slides. Les tests BGG utilisent des réponses HTTP contrôlées. Source : https://boardgamegeek.com/wiki/page/BGG_XML_API2

## 31 · La traduction au niveau de l’adaptateur

104–109 min. Montrer recherche exacte puis détail par identifiant dans bgg.ts. Expliquer le délai maximum, la validation de réponse et la panne distincte. Éviter de taper le parsing complet en direct.

## 32 · Les niveaux de vérification

109–115 min. Lancer catalogue.test.ts. Le faux transport valide notre conversion, pas la disponibilité de BGG ni un jeton réel. Temps et hasard peuvent aussi rendre un test variable, même sans réseau.

## 33 · La sauvegarde fait partie du cas d’usage

115–121 min. Ajouter await writer.save(play) et expliquer son rôle. Étape06 retourne201 après succès. Sans await, on pourrait annoncer une création avant un échec. Montrer le test de stockage indisponible.

## 34 · Deux propriétés à vérifier

121–124 min. Montrer save.test.ts. Une partie invalide ne provoque aucun enregistrement. Une erreur du writer doit empêcher201. Reformuler la première propriété comme absence d’appel au writer dans une variante de test avec spy, et comme stockage inchangé dans la version présente.

## 35 · Persistance après reconnexion

124–130 min. Démonstration préparée. npm run db:setup, puis STORAGE=sqlite npm run cli à partir de08 ou test Prisma à07. Le test ferme la connexion, rouvre la même base temporaire et relit la partie. Aucun Docker. Ne pas taper tout le schéma.
Lecture du schéma : Le client A écrit puis se déconnecte. Le client B est une nouvelle connexion au même fichier SQLite et relit la partie. Le maintien du résultat après reconnexion établit la persistance.

## 36 · Une entrée CLI sur le même cas d’usage

130–134 min. Montrer runCli puis le domaine pour établir la réutilisation du cas d’usage. Mode memory : chaque processus a son propre magasin. Pour partager avec le serveur, choisir sqlite et la même DATABASE_URL. Comparer une acceptation et un refus.

## 37 · Unicité des participants

134–138 min. Partir de08. Présenter la nouvelle exigence, montrer quels modules doivent changer, puis réaliser la modification et expliquer les régressions à vérifier. Répondre aux questions au fil de la démonstration. L’unicité par nom est une simplification explicite, pas un modèle universel des personnes.

## 38 · Une règle commune aux deux entrées

138–140 min. Passer à09, montrer le diff08→09 et lancer challenge.test.ts. Définition simplifiée de l’identité par le nom dans cette démonstration. En production deux personnes peuvent porter le même nom : un identifiant serait un autre besoin.

## 39 · Le coût des frontières

140–144 min. Expliquer les compromis et répondre aux questions qui se présentent. Pas d’interface automatique pour chaque classe. Hors périmètre : DDD complet, CQRS, microservices. Pistes après cours : idempotence, vrais identifiants joueurs, transaction si plusieurs écritures doivent réussir ensemble.

## 40 · Les limites du modèle et la suite

144–150 min. Synthèse orale des cinq critères SOLID et de la frontière applicative, puis questions. Les prolongements sont hors périmètre du code livré. L’idempotence ne découle pas automatiquement des ports. Sources : https://alistair.cockburn.us/hexagonal-architecture ; https://www.cs.odu.edu/~zeil/cs330/latest/Public/solid/ ; https://boardgamegeek.com/wiki/page/BGG_XML_API2
