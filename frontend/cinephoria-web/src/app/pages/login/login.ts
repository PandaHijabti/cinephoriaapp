import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  imports: [FormsModule, NgIf],
})
export class LoginComponent {
  private router = inject(Router);
  private auth = inject(AuthService);

  email = '';
  password = '';
  error = '';
  successMessage = '';

  ngOnInit() {
    // ✅ Ne pas utiliser localStorage ici (SSR) :
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/films']);
    }
  }

  onLogin() {
    this.auth.login();              // ✅ persistance gérée dans AuthService
    this.router.navigate(['/films']);
  }

  onSubmit() {
    if (this.email === 'admin@mail.com' && this.password === '1234') {
      this.auth.login();            // ✅ au lieu de localStorage.setItem
      this.successMessage = 'Bienvenue, Admin 🎬';
      setTimeout(() => this.router.navigate(['/films']), 1000);
    } else {
      this.error = 'Email ou mot de passe incorrect.';
      this.successMessage = '';
    }
  }
}

