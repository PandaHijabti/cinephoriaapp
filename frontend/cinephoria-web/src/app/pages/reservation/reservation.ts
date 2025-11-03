import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilmService, type Film } from '../../services/film.service';
import { ShowtimeService, type Showtime } from '../../services/showtime.service';

@Component({
  standalone: true,
  selector: 'app-reservation',
  imports: [CommonModule, FormsModule],
  templateUrl: './reservation.html'
})
export class ReservationComponent {
  private filmsApi = inject(FilmService);
  private showApi  = inject(ShowtimeService);

  films: Film[] = [];
  showtimes: Showtime[] = [];
  dates: string[] = [];
  filtered: Showtime[] = [];
  seats: { seat:number; taken:boolean; accessible:boolean }[] = [];

  form = {
    filmId: '' as string,
    date: '' as string,
    showtimeId: '' as string,
    selectedSeats: [] as number[]
  };

  ngOnInit() {
    this.filmsApi.getAll().subscribe(f => this.films = f);
  }

  onFilmChange() {
    this.form.date = '';
    this.form.showtimeId = '';
    this.seats = [];
    this.showApi.search({ filmId: this.form.filmId }).subscribe(sts => {
      this.showtimes = sts;
      this.dates = Array.from(new Set(sts.map(s => s.start.slice(0,10)))).sort();
      this.filtered = [];
    });
  }

  onDateChange() {
    this.form.showtimeId = '';
    this.seats = [];
    this.filtered = this.showtimes.filter(s => s.start.slice(0,10) === this.form.date);
  }

  onShowtimeChange() {
    this.seats = [];
    if (!this.form.showtimeId) return;
    this.showApi.seats(this.form.showtimeId).subscribe(r => this.seats = r.seats);
  }

  toggleSeat(n: number) {
    this.form.selectedSeats = this.form.selectedSeats.includes(n)
      ? this.form.selectedSeats.filter(x => x !== n)
      : [...this.form.selectedSeats, n];
  }
}

