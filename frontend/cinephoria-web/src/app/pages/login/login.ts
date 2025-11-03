import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html'
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  mode: 'login'|'signup' = 'login';
  error = '';

  async submit() {
    this.error = '';
    const payload = { email: this.email.trim(), password: this.password };
    try {
      if (this.mode === 'login') {
        const r = await this.auth.login(payload).toPromise();
        this.auth.isLoggedIn.set(true);
        this.auth.role.set(r?.role ?? 'USER');
      } else {
        const r = await this.auth.signup({ ...payload, role: 'USER' }).toPromise();
        this.auth.isLoggedIn.set(true);
        this.auth.role.set(r?.role ?? 'USER');
      }
      this.router.navigate(['/reservation']);
    } catch (e) {
      this.error = 'Identifiants invalides.';
    }
  }

  async logout() {
    await this.auth.logout().toPromise();
    this.auth.isLoggedIn.set(false);
    this.auth.role.set(null);
  }
}


