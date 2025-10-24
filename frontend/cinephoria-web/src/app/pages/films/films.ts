import { Component } from '@angular/core';
import {NgFor, NgIf}  from '@angular/common';
import { FormsModule } from '@angular/forms';
import {RouterLink} from '@angular/router';
import {FilmService, Film} from '../../services/film.service';


@Component({
  selector: 'app-films',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, RouterLink],
  templateUrl: './films.html',
  styleUrls: ['./films.scss'],
})
export class FilmsComponent {
  films: Film[] = [];
 query = '';
  minRating = 0;

  constructor(private filmService: FilmService) {
    this.films = this.filmService.getAll();
  }

  get filtered(): Film[] {
    const q = this.query.trim().toLowerCase();
    return this.films.filter(f => f.title.toLowerCase().includes(q) && f.rating >= this.minRating);
  }
}