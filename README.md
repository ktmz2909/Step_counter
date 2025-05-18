# Step Counter - Application Angular de Suivi d'Activité Physique

## Description du projet

Step Counter est une application web Angular qui permet aux utilisateurs de suivre leur activité physique quotidienne en comptabilisant leurs pas. L'application offre une interface conviviale pour enregistrer les pas et visualiser des statistiques d'activité.

## Fonctionnalités

- **Compteur de pas :** Interface interactive pour suivre et mettre à jour le nombre de pas quotidiens
- **Suivi des objectifs :** Possibilité de définir et modifier des objectifs quotidiens
- **Statistiques visuelles :** Affichage de données sur la distance parcourue et les calories brûlées
- **Historique :** Consultation de l'historique des activités passées
- **Indicateurs de performance :** Visualisation des tendances et du taux de réalisation des objectifs

## Prérequis techniques

- Node.js (v14.0.0 ou supérieur)
- Angular CLI (v14.0.0 ou supérieur)

## Installation

1. Cloner le dépôt :
   ```bash
   git clone https://github.com/ktmz2909/Step_counter.git
   cd Step_counter
   ```

2. Installer les dépendances :
   ```bash
   npm install
   ```

3. Lancer l'application en mode développement :
   ```bash
   ng serve --open
   ```
   L'application s'ouvrira automatiquement dans votre navigateur à l'adresse `http://localhost:4200/`.

## Structure du projet

```
step-counter/
├── src/
│   ├── app/
│   │   ├── models/
│   │   │   └── step-counter.interface.ts
│   │   ├── components/
│   │   │   ├── counter/
│   │   │   │   ├── counter.component.ts
│   │   │   │   ├── counter.component.html
│   │   │   │   └── counter.component.css
│   │   │   └── statistics/
│   │   │       ├── statistics.component.ts
│   │   │       ├── statistics.component.html
│   │   │       └── statistics.component.css
│   │   ├── services/
│   │   │   └── step.service.ts
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   └── app.component.css
│   └── ...
└── ...
```
## Personnalisation

### Modifier l'objectif quotidien par défaut

Ouvrez `src/app/services/step.service.ts` et modifiez la valeur de la propriété `goal` dans la méthode `getCurrentEntry()`:

```typescript
const newEntry: StepEntry = {
  date: today,
  steps: 0,
  goal: 10000, // Modifiez cette valeur selon vos besoins
  distance: 0,
  calories: 0
};
```

## Développement futur

- Synchronisation avec un backend pour la persistance des données
- Intégration avec des appareils fitness pour l'importation automatique des données
- Ajout de graphiques avancés pour visualiser les tendances sur plusieurs semaines
- Fonctionnalité d'exportation de données au format CSV

## Contact

Toboure Khaled Michel ZANRE- 60683880khaled@gmail.com

Lien du projet : [https://github.com/ktmz2909/Step_counter](https://github.com/ktmz2909/Step_counter)
