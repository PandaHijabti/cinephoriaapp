import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  successMessage = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // ✅ Vérifie si déjà connecté
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      this.router.navigate(['/films']);
    }
  }

  onSubmit() {
    if (this.email === 'admin@mail.com' && this.password === '1234') {
      // ✅ Simulation d'une connexion réussie
      localStorage.setItem('isLoggedIn', 'true');
      this.successMessage = 'Bienvenue, Admin 🎉';

      // Attendre 2 secondes avant la redirection
      setTimeout(() => {
        this.router.navigate(['/films']);
      }, 2000);
    } else {
      // ❌ Sinon, afficher une erreur
      this.error = 'Email ou mot de passe incorrect.';
      this.successMessage = '';
    }
  }
}
