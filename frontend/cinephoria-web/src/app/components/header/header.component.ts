import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [RouterModule],
  template: `
  <nav style="display:flex;gap:16px;padding:12px;border-bottom:1px solid #ddd;align-items:center">
    <a routerLink="/" style="font-weight:bold;font-size:18px">🎬 Cinéphoria</a>
    <a routerLink="/films">Films</a>
    <a routerLink="/reservation">Réservation</a>
    <a routerLink="/contact">Contact</a>
    <a routerLink="/login" style="margin-left:auto">Se connecter</a>
  </nav>
  `
})
export class HeaderComponent {}

