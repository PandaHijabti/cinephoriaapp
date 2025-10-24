import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { NgClass } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FilmService, Film } from '../../services/film.service';

type Booking = {
  filmId: number | null;
  date: string;
  time: string | null;
  seats: number | null;
  name: string;
  email: string;
};

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, NgClass],
  templateUrl: './reservation.html',
  styleUrls: ['./reservation.scss'],
})
export class ReservationComponent {
  films: Film[] = [];

  // 🔽 options dynamiques
  availableDates: string[] = [];
  availableTimes: string[] = [];

  form: Booking = {
    filmId: null,
    date: '',
    time: null,
    seats: null,
    name: '',
    email: ''
  };

  submitted = false;
  confirmationMsg = '';

  constructor(
    private filmService: FilmService,
    private route: ActivatedRoute
  ) {
    this.films = this.filmService.getAll();

    // Pré-sélection depuis film-detail ? /reservation?filmId=2
    const filmIdParam = Number(this.route.snapshot.queryParamMap.get('filmId'));
    if (filmIdParam) {
      this.form.filmId = filmIdParam;
      this.refreshDates();
    }
  }

  private refreshDates() {
    if (!this.form.filmId) {
      this.availableDates = [];
      this.availableTimes = [];
      this.form.date = '';
      this.form.time = null;
      return;
    }
    this.availableDates = this.filmService.getShowDates(this.form.filmId);
    if (!this.availableDates.includes(this.form.date)) {
      this.form.date = '';
      this.availableTimes = [];
      this.form.time = null;
    } else {
      this.refreshTimes();
    }
  }

  onFilmChange() {
    this.refreshDates();
  }

  onDateChange() {
    this.refreshTimes();
  }

  private refreshTimes() {
    if (!this.form.filmId || !this.form.date) {
      this.availableTimes = [];
      this.form.time = null;
      return;
    }
    this.availableTimes = this.filmService.getShowTimes(this.form.filmId, this.form.date);
    if (!this.availableTimes.includes(this.form.time || '')) {
      this.form.time = null;
    }
  }

  isEmailValid(email: string | null | undefined): boolean {
    if (!email) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  get isValid(): boolean {
    return !!this.form.filmId
      && !!this.form.date
      && !!this.form.time
      && !!this.form.seats && this.form.seats > 0
      && !!this.form.name.trim()
      && this.isEmailValid(this.form.email);
  }

  submit() {
    this.submitted = true;
    if (!this.isValid) return;

    const film = this.films.find(f => f.id === this.form.filmId);
    this.confirmationMsg =
      `🎟️ Réservation confirmée : ${film?.title} · ${this.form.date} à ${this.form.time} · ${this.form.seats} place(s)`;

    this.form = { filmId: this.form.filmId, date: '', time: null, seats: null, name: '', email: '' };
    this.availableTimes = [];
    this.submitted = false;
  }
}

