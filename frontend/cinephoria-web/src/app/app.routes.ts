import { Routes } from '@angular/router';
import { canActivateAuth } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/films/films').then(m => m.FilmsComponent) },
  { path: 'films', loadComponent: () => import('./pages/films/films').then(m => m.FilmsComponent) },
  { path: 'film/:id', loadComponent: () => import('./pages/film-detail/film-detail').then(m => m.FilmDetailComponent) },
  { path: 'reservation',
    canActivate: [canActivateAuth],
    loadComponent: () => import('./pages/reservation/reservation').then(m => m.ReservationComponent)
  },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact').then(m => m.ContactComponent) },
  { path: 'login', loadComponent: () => import('./pages/login/login').then(m => m.LoginComponent) },
  { path: '**', redirectTo: '' }
];

