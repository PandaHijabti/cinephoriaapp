// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private logged = false;

  isLoggedIn(): boolean {
    return this.logged;
  }

  login(): void {
    this.logged = true;
    try {
      localStorage.setItem('isLoggedIn', 'true');
    } catch {}
  }

  logout(): void {
    this.logged = false;
    try {
      localStorage.removeItem('isLoggedIn');
    } catch {}
  }

  constructor() {
    try {
      this.logged = localStorage.getItem('isLoggedIn') === 'true';
    } catch {}
  }
}
