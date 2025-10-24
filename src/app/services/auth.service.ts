import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoggedInSig = signal<boolean>(false);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      try {
        this.isLoggedInSig.set(localStorage.getItem('isLoggedIn') === 'true');
      } catch { this.isLoggedInSig.set(false); }
    }
  }

  login() {
    if (isPlatformBrowser(this.platformId)) {
      try { localStorage.setItem('isLoggedIn', 'true'); } catch {}
    }
    this.isLoggedInSig.set(true);
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      try { localStorage.removeItem('isLoggedIn'); } catch {}
    }
    this.isLoggedInSig.set(false);
  }

  isAuthenticated() {
    return this.isLoggedInSig();
  }
}


