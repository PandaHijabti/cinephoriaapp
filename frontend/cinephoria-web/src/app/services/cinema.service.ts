import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type FooterInfo = { name: string; address: string; phone: string; hours: string; };

@Injectable({ providedIn: 'root' })
export class CinemaService {
  private http = inject(HttpClient);

  getFooter(): Observable<FooterInfo[]> {
    return this.http.get<FooterInfo[]>('/api/cinemas/footer');
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>('/api/cinemas');
  }
}
