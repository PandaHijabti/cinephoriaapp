import { Routes } from '@angular/router';
import { FilmsComponent } from './pages/films/films';

export const routes: Routes = [
  { path: '', redirectTo: 'films', pathMatch: 'full' },
  { path: 'films', component: FilmsComponent },
  { path: '**', redirectTo: 'films' }
];