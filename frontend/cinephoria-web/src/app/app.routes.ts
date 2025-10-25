import { Routes } from '@angular/router';
import { canActivateAuth } from './guards/auth.guard';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login',       loadComponent: () => import('./pages/login/login').then(m => m.LoginComponent) },
  { path: 'reservation', loadComponent: () => import('./pages/reservation/reservation').then(m => m.ReservationComponent),canActivate: [canActivateAuth]},

  { path: 'films',       loadComponent: () => import('./pages/films/films').then(m => m.FilmsComponent) },
  { path: 'film/:id',    loadComponent: () => import('./pages/film-detail/film-detail').then(m => m.FilmDetailComponent) },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact').then(m => m.ContactComponent) },


  { path: '**', redirectTo: 'films' },
];
