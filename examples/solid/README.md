# Cinq principes, une application

Ouvrir `principles.ts`. Six minutes par principe : problème, prédiction, petite modification, résultat.

- **SRP** : JSON change avec le transport, le nombre de joueurs avec la règle, la ligne SQL avec le stockage. Séparer ces raisons de changer. Une fonction peut coordonner plusieurs opérations cohérentes.
- **OCP** : passer un autre catalogue à `makeValidator` étend un axe prévu. Une nouvelle règle peut toujours demander une modification du cas d’usage.
- **LSP** : un catalogue remplaçable respecte le contrat observable, y compris l’absence et les erreurs. `brokenCatalogue` compile mais viole « inconnu = null ». Une panne technique peut lever une erreur distincte.
- **ISP** : `countPlays` demande `PlayReader`. Il n’oblige pas son fournisseur à exposer `save`, `delete` ou l’administration du catalogue.
- **DIP** : le besoin métier définit `Catalogue`. Le fournisseur implémente ce besoin. Passer l’instance est l’injection de dépendance, une technique de câblage.

Question pour chaque principe : quel changement protège-t-il ici, et quel coût ajoute-t-il ? Pas d’interface pour chaque classe par défaut.
