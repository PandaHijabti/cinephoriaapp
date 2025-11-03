import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  template: `
  <header>
  <nav class="navbar navbar-expand-lg">
    <div class="container container-narrow">
      <a class="navbar-brand fw-bold" routerLink="/" style="color:var(--text)">🎬 Cinéphoria</a>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav"
              aria-controls="nav" aria-expanded="false" aria-label="Menu">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div id="nav" class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a routerLink="/films" routerLinkActive="active" class="nav-link">Films</a>
          </li>
          <li class="nav-item">
            <a routerLink="/reservation" routerLinkActive="active" class="nav-link">Réservation</a>
          </li>
          <li class="nav-item">
            <a routerLink="/contact" routerLinkActive="active" class="nav-link">Contact</a>
          </li>
        </ul>
        <a routerLink="/login" class="btn btn-sm btn-accent">Se connecter</a>
      </div>
    </div>
  </nav>
</header>

  <main class="container container-narrow py-4">
    <router-outlet></router-outlet>
  </main>

  <footer class="mt-4 border-top py-3 text-muted" style="border-color:var(--border)!important">
    <div class="container container-narrow">
      © 2025 Cinéphoria — Tous droits réservés
    </div>
  </footer>
  `
})
export class App {}
