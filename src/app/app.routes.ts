import { Routes } from '@angular/router';
import { FilmsComponent } from './pages/films/films';
import { FilmDetailComponent } from './pages/film-detail/film-detail';
import { ReservationComponent } from './pages/reservation/reservation';
import { LoginComponent } from './pages/login/login';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'films', pathMatch: 'full' },
  { path: 'films', component: FilmsComponent },
  { path: 'films/:id', component: FilmDetailComponent },
  { path: 'reservation', component: ReservationComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'films' }
];
