import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export type Film = {
  id: string;
  title: string;
  description: string;
  minAge: number;
  poster: string;
  genres: string[];
  staffPick: boolean;
  rating: number;
  addedAt: string;
  year: number; // aligné avec le backend
};

@Injectable({ providedIn: 'root' })
export class FilmService {
  private http = inject(HttpClient);

  getAll(): Observable<Film[]> {
    return this.http.get<Film[]>('/api/films');
  }

  getById(id: string): Observable<Film> {
    return this.http.get<Film>(`/api/films/${id}`);
  }

  list(params?: { cinemaId?: string; genre?: string; day?: string }): Observable<Film[]> {
    let p = new HttpParams();
    if (params?.cinemaId) p = p.set('cinemaId', params.cinemaId);
    if (params?.genre)    p = p.set('genre', params.genre);
    if (params?.day)      p = p.set('day', params.day);
    return this.http.get<Film[]>('/api/films', { params: p });
  }

  lastWednesday(): Observable<Film[]> {
    return this.http.get<Film[]>('/api/films/last-wednesday');
  }
}

