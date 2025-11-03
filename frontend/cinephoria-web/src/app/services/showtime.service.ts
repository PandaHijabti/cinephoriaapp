import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export type Showtime = {
  id: string;
  start: string;
  end: string;
  room: { id: string; name: string; capacity: number };
  quality: '2D'|'3D'|'4DX'|'4K';
  price: number;
};

export type SeatMap = {
  showtimeId: string;
  quality: string;
  seats: { seat: number; taken: boolean; accessible: boolean }[];
};

@Injectable({ providedIn: 'root' })
export class ShowtimeService {
  private http = inject(HttpClient);

  search(params: { cinemaId?: string; filmId?: string; date?: string; people?: number }): Observable<Showtime[]> {
    let p = new HttpParams();
    if (params.cinemaId) p = p.set('cinemaId', params.cinemaId);
    if (params.filmId)   p = p.set('filmId', params.filmId);
    if (params.date)     p = p.set('date', params.date);
    if (params.people)   p = p.set('people', String(params.people));
    return this.http.get<Showtime[]>('/api/showtimes', { params: p });
  }

  seats(showtimeId: string): Observable<SeatMap> {
    return this.http.get<SeatMap>(`/api/showtimes/${showtimeId}/seats`);
  }
}

