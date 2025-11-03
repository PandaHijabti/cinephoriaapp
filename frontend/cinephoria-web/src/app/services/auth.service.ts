import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

type LoginDto = { email: string; password: string };
type SignupDto = { email: string; password: string; role?: 'USER'|'EMPLOYEE'|'ADMIN' };

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  isLoggedIn = signal<boolean>(false);
  role       = signal<'USER'|'EMPLOYEE'|'ADMIN'|null>(null);

  async refresh(): Promise<void> {
    try {
      await this.http.get('/api/auth/me').toPromise();
      this.isLoggedIn.set(true);
    } catch {
      this.isLoggedIn.set(false);
      this.role.set(null);
    }
  }

  login(dto: LoginDto) {
    return this.http.post<{ ok: true; role: 'USER'|'EMPLOYEE'|'ADMIN' }>('/api/auth/login', dto);
  }

  signup(dto: SignupDto) {
    return this.http.post<{ ok: true; role: 'USER'|'EMPLOYEE'|'ADMIN' }>('/api/auth/signup', dto);
  }

  logout() {
    return this.http.post<{ ok: true }>('/api/auth/logout', {});
  }
}
