import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-contact',
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss'],
  imports: [ReactiveFormsModule, NgIf],
})
export class ContactComponent {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(3)]],
    message: ['', [Validators.required, Validators.minLength(10)]],
    agree: [false, [Validators.requiredTrue]],
    website: [''], // honeypot anti-spam
  });

  sending = false;
  success = '';
  error = '';

  get f() { return this.form.controls; }

  async onSubmit() {
    this.success = ''; this.error = '';

    // anti-spam
    if (this.form.value.website) { this.error = 'Échec de l’envoi (bot détecté).'; return; }

    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    this.sending = true;
    try {
      // TODO: branchement API si besoin (HttpClient.post)
      await new Promise(res => setTimeout(res, 900));
      this.success = 'Merci ! Ton message a bien été envoyé 🎬';
      this.form.reset({ agree: false, website: '' });
    } catch {
      this.error = 'Oups, une erreur est survenue. Réessaie plus tard.';
    } finally {
      this.sending = false;
    }
  }
}
