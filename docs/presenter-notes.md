# Conducteur de séance · 150 minutes


Le professeur code. Les étudiants prédisent, comparent leurs réponses et expliquent les choix.


## 1 · SOLID et architecture hexagonale

0–2 min. Présentation personnelle courte. Objectif : comprendre les choix de séparation en regardant évoluer la même application. Durée totale 150 minutes, pause comprise.


## 2 · Une partie acceptée, une partie refusée

2–5 min. Montrer immédiatement le résultat de npm run demo à l’étape 00. Faire prédire le résultat avant de lancer. Ne pas encore expliquer toute l’architecture.


## 3 · Vous décidez, je code

5–8 min. Les étudiants regardent les démonstrations. Faire participer aux choix plutôt que dicter du code à recopier. Si toute la promotion a déjà le projet prêt, proposer seulement le défi final en binôme 4 minutes, sans dépasser le créneau de 10 minutes.


## 4 · Le vocabulaire utile

8–11 min. Pointer un objet, une fonction async et une assertion dans l’éditeur. Ne pas enseigner TypeScript en entier. Demander un signal si Promise ou interface est inconnu.


## 5 · Le point de départ couplé

11–15 min. Extrait simplifié, pas le fichier complet. Ouvrir examples/00-coupled.ts. Le stockage est encore simulé. Faire nommer les raisons différentes de modifier le code.


## 6 · Les cinq principes SOLID

15 min. Carte du parcours, moins d’une minute. 6 minutes environ pour chaque lettre avec le même cas. Exemples dans examples/solid/principles.ts.


## 7 · S · Les raisons de changer

15–18 min. SRP = une raison cohérente de changer, pas une fonction qui ne ferait qu’une instruction. Demander quelle équipe ou quel besoin déclencherait chaque changement.


## 8 · S · La règle isolée

18–21 min. Ouvrir principles.ts et le test du validateur. Le parsing et la conversion SQL sont aux frontières. SRP ne se démontre pas seulement en découpant une grosse interface.


## 9 · O · Le catalogue peut varier

21–24 min. OCP dépend d’un axe d’évolution identifié. On ne prévoit pas tous les futurs possibles. Faire proposer une substitution de catalogue.


## 10 · O · Une extension par remplacement

24–27 min. Les noms illustrent la composition, exemples autonomes à l’étape01. Insister sur le coût de l’abstraction et le périmètre protégé. OCP ne veut pas dire ne jamais éditer un fichier.


## 11 · L · Un contrat observable

27–29 min. Contrat précis utilisé dans tout le cours. LSP concerne comportement et attentes du client, même sans héritage de classes.


## 12 · L · Cela compile, mais cela casse

29–31 min. Une implémentation qui refuse un cas prévu par le contrat ne se substitue pas correctement. Ne pas confondre absence et indisponibilité.


## 13 · L · Un contrat commun

31–33 min. Extrait pédagogique avec les types courts de principles.ts. Plus tard tests/catalogue.test.ts applique le même contrat aux noms métier complets. Demander quel test manque pour une panne technique.


## 14 · I · Une interface trop large

33–36 min. Le problème est le couplage du consommateur à des opérations inutiles, pas le nombre arbitraire de méthodes.


## 15 · I · Un besoin de lecture

36–39 min. Une même classe ou un même objet peut implémenter lecture et écriture. Chaque consommateur reçoit seulement le contrat dont il a besoin.


## 16 · D · Une dépendance vers la technique

39–42 min. Montrer le problème d’import et le vocabulaire SQL qui entre dans le métier. Demander comment on testerait les bornes sans base.


## 17 · D · Le besoin appartient au métier

42–45 min. DIP et injection ne sont pas synonymes. Pas besoin de conteneur DI. Une fonction suffit. Le domaine n’importe pas Prisma.


## 18 · SOLID dans notre application

45–46 min. Faire rappeler une lettre par un étudiant. Pas un nouvel exposé des définitions. Transition : comment placer ces séparations dans l’application ?


## 19 · Les frontières de l’application

46–48 min. Les couches aident à classer le code mais il faut regarder les dépendances. Source : https://alistair.cockburn.us/hexagonal-architecture


## 20 · Ports et adaptateurs

48–51 min. Tracer les relations au tableau en parallèle. Les ports nomment des besoins. Le nombre six ne définit pas le nombre de ports. Source : https://alistair.cockburn.us/hexagonal-architecture


## 21 · Les dépendances du code

51–53 min. Ces relations sont les imports à la compilation. Ne pas les confondre avec le sens des appels à l’exécution. Le fichier composition.ts connaît les implémentations pour assembler le programme.


## 22 · Les appels pendant une requête

53–55 min. Comparer avec la slide précédente. L’appel atteint Prisma à l’exécution, mais le domaine compile contre PlayWriter. L’écriture sera ajoutée à l’étape06.


## 23 · Les objets métier

55–59 min. Rester dans le vocabulaire des jeux. Faire choisir un exemple accepté et un exemple rejeté.


## 24 · Le cas d’usage hors ligne

59–67 min. Extrait avec variables abrégées. Coder la condition avec la salle puis lancer tests/domain.test.ts. À cette étape on retourne le Play, sans prétendre l’avoir sauvegardé. Le test n’effectue aucun appel réseau.


## 25 · Les limites font de bons exemples

67–75 min. Faire la mutation temporaire > vers >= dans le worktree03. Lancer le test, observer la borne4 échouer, annuler uniquement cette petite édition manuellement. Garder 1 minute pour expliquer que les tests réseau et SQL vérifieront autre chose.


## 26 · Pause

75–85 min. Pause réelle. Afficher l’heure de reprise à l’oral. Préparer le worktree04 si nécessaire.


## 27 · HTTP est un adaptateur

85–91 min. Étape04 : validation seule, réponse200. À l’étape06 on passera à201 après l’écriture. Modifier un payload, laisser la salle prédire400 ou422. Extrait abrégé, fichier complet dans infrastructure/http.ts.


## 28 · Des erreurs qui disent ce qui arrive

91–95 min. Codes décidés par notre API, pas imposés par l’architecture hexagonale. Une autre API pourrait choisir d’autres conventions explicites. Le domaine expose des erreurs métier, pas des codes HTTP.


## 29 · Prédiction : panne ou règle ?

95–100 min. Réponse B. 401 vient du fournisseur, notre API répond503. Montrer le test correspondant à l’étape05. Ne pas transformer une panne en null ou accepter silencieusement une fixture.


## 30 · Le catalogue externe

100–104 min. Ouvrir composition.ts, montrer le choix CATALOG. Le mode live est facultatif et demande un jeton BGG valide. Ne pas réutiliser le jeton Slides. Les tests BGG utilisent des réponses HTTP contrôlées. Source : https://boardgamegeek.com/wiki/page/BGG_XML_API2


## 31 · La traduction de BGG

104–109 min. Montrer recherche exacte puis détail par identifiant dans bgg.ts. Expliquer le délai maximum, la validation de réponse et la panne distincte. Éviter de taper le parsing complet en direct.


## 32 · Ce que chaque test vérifie

109–115 min. Lancer catalogue.test.ts. Le faux transport valide notre conversion, pas la disponibilité de BGG ni un jeton réel. Temps et hasard peuvent aussi rendre un test variable, même sans réseau.


## 33 · Enregistrer par un port

115–121 min. Faire écrire await writer.save(play) avec la salle. Étape06 retourne201 après succès. Sans await, on pourrait annoncer une création avant un échec. Montrer le test de stockage indisponible.


## 34 · Une partie refusée ne s’enregistre pas

121–124 min. Lancer save.test.ts et relire le magasin mémoire. Montrer pourquoi un test qui inspecte seulement le retour aurait manqué l’absence de sauvegarde dans l’ancien cours.


## 35 · La preuve par SQLite et Prisma

124–130 min. Démonstration préparée. npm run db:setup, puis STORAGE=sqlite npm run cli à partir de08 ou test Prisma à07. Le test ferme la connexion, rouvre la même base temporaire et relit la partie. Aucun Docker. Ne pas taper tout le schéma.


## 36 · Une deuxième entrée : le terminal

130–134 min. Réponse non, montrer runCli puis le domaine. Mode memory : chaque processus a son propre magasin. Pour partager avec le serveur, choisir sqlite et la même DATABASE_URL. Comparer une acceptation et un refus.


## 37 · Défi : deux fois la même personne

134–138 min. Rester à l’étape08 pour ne pas révéler la solution09. 30 secondes seul, 60 secondes en binôme, puis propositions orales. Si environnement déjà prêt : 4 minutes de code optionnel. Aucun setup à ce moment.


## 38 · La règle change une seule fois

138–140 min. Passer à09, montrer le diff08→09 et lancer challenge.test.ts. Définition simplifiée de l’identité par le nom pour cet exercice. En production deux personnes peuvent porter le même nom : un identifiant serait un autre besoin.


## 39 · Le coût de la séparation

140–144 min. Discuter les compromis. Pas d’interface automatique pour chaque classe. Hors périmètre : DDD complet, CQRS, microservices. Pistes après cours : idempotence, vrais identifiants joueurs, transaction si plusieurs écritures doivent réussir ensemble.


## 40 · Ce que vous savez maintenant décider

144–150 min. Questions et marge. Demander une explication du DIP avec un fichier concret. Ressources et tags dans le README du dépôt. Sources : https://alistair.cockburn.us/hexagonal-architecture ; https://www.cs.odu.edu/~zeil/cs330/latest/Public/solid/ ; https://boardgamegeek.com/wiki/page/BGG_XML_API2
