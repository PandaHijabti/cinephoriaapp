# Frontend (Angular) — Piste d'implémentation

## Création du projet
```bash
npm install -g @angular/cli
ng new cinephoria-web --routing --style=scss
cd cinephoria-web
npm install bootstrap
```

Ajoute Bootstrap dans `angular.json` (styles).
Crée un composant `Navbar` pour **US1** et inclus-le dans `app.component.html`.

## Exemple de Navbar (US1)
- Liens : Accueil, Films, Réservation, Contact, Se connecter
- Responsive (burger)
- `routerLink` pour la navigation

## Guards & Auth
- `AuthGuard` + `RoleGuard` (ADMIN/EMPLOYEE/USER)
- Appels API avec `withCredentials: true` (cookies HttpOnly)
