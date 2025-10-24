// src/app/services/film.service.ts
import { Injectable } from '@angular/core';


export type Film = {
  id: number;
  title: string;
  year: number;
  poster: string;
  rating: number;
};

export type ShowtimesByDate = Record<string, string[]>; // "2025-10-26": ["14:00","17:30"]

const FILMS: Film[] = [
  { id: 1, title: 'Inception',        year: 2010, poster: 'https://placehold.co/400x600?text=Inception',     rating: 8.8 },
  { id: 2, title: 'The Dark Knight',  year: 2008, poster: 'https://placehold.co/400x600?text=Dark+Knight',   rating: 9.0 },
  { id: 3, title: 'Interstellar',     year: 2014, poster: 'https://placehold.co/400x600?text=Interstellar',  rating: 8.6 },
  { id: 4, title: 'Parasite',         year: 2019, poster: 'https://placehold.co/400x600?text=Parasite',      rating: 8.6 },
  { id: 5, title: 'The Matrix',       year: 1999, poster: 'https://placehold.co/400x600?text=The+Matrix',    rating: 8.7 },
];

// Mock séances : filmId -> date ISO -> horaires
const SHOWTIMES: Record<number, ShowtimesByDate> = {
  1: { '2025-10-26': ['14:00', '17:30', '20:15'], '2025-10-27': ['13:45', '16:10'] },
  2: { '2025-10-26': ['15:00', '18:20'],          '2025-10-28': ['14:10', '21:00'] },
  3: { '2025-10-27': ['11:00', '19:30'] },
  4: { '2025-10-26': ['16:00'],                   '2025-10-29': ['18:00', '20:30'] },
  5: { '2025-10-30': ['20:00'] },
};

@Injectable({ providedIn: 'root' }) 
export class FilmService {
  getAll(): Film[] {
    return FILMS.slice();
  }

  getById(id: number): Film | undefined {
    return FILMS.find(f => f.id === id);
  }

  getShowDates(filmId: number): string[] {
    return Object.keys(SHOWTIMES[filmId] || {}).sort();
  }

  getShowTimes(filmId: number, isoDate: string): string[] {
    return (SHOWTIMES[filmId]?.[isoDate] ?? []).slice();
  }
}
