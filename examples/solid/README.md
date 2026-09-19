# Cinq principes, une application

Ouvrir `principles.ts`. Cinq minutes par principe : problème, explication du choix, modification du code et résultat. Les étudiants peuvent interrompre la démonstration pour poser leurs questions.

- **SRP** : JSON change avec le transport, le nombre de joueurs avec la règle, la ligne SQL avec le stockage. Séparer ces raisons de changer. Une fonction peut coordonner plusieurs opérations cohérentes.
- **OCP** : passer un autre catalogue à `makeValidator` étend un axe prévu. Une nouvelle règle peut toujours demander une modification du cas d’usage.
- **LSP** : un catalogue remplaçable respecte le contrat observable, y compris l’absence et les erreurs. `brokenCatalogue` compile mais viole « inconnu = null ». Une panne technique peut lever une erreur distincte.
- **ISP** : `countPlays` demande `PlayReader`. Il n’oblige pas son fournisseur à exposer `save`, `delete` ou l’administration du catalogue.
- **DIP** : le besoin métier définit `Catalogue`. Le fournisseur implémente ce besoin. Passer l’instance est l’injection de dépendance, une technique de câblage.

Pour chaque principe, expliquer le changement qu’il protège et le coût qu’il ajoute. Pas d’interface pour chaque classe par défaut.
