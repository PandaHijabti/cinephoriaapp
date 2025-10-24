import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Film = {
  id: number;
  title: string;
  year: number;
  poster: string;
  rating: number; // 0..10
};

@Component({
  selector: 'app-films',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './films.html',
  styleUrls: ['./films.scss'],
})
export class FilmsComponent {
  films: Film[] = [
    { id: 1, title: 'Inception', year: 2010, poster: 'https://placehold.co/200x300?text=Inception', rating: 8.8 },
    { id: 2, title: 'The Dark Knight', year: 2008, poster: 'https://placehold.co/200x300?text=The+Dark+Knight', rating: 9.0 },
    { id: 3, title: 'Interstellar', year: 2014, poster: 'https://placehold.co/200x300?text=Interstellar', rating: 8.6 },
    { id: 4, title: 'Parasite', year: 2019, poster: 'https://placehold.co/200x300?text=Parasite', rating: 8.6 },
    { id: 5, title: 'The Matrix', year: 1999, poster: 'https://placehold.co/200x300?text=The+Matrix', rating: 8.7 },
  ];

  query = '';
  minRating = 0;

  get filtered(): Film[] {
    const q = this.query.trim().toLowerCase();
    return this.films.filter(f => f.title.toLowerCase().includes(q) && f.rating >= this.minRating);
  }
}