import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FilmService, type Film } from '../../services/film.service';
import { StarRatingComponent } from '../../components/star-rating/star-rating';

@Component({
  standalone: true,
  selector: 'app-films',
  imports: [CommonModule, RouterModule, StarRatingComponent],
  templateUrl: './films.html'
})
export class FilmsComponent {
  private api = inject(FilmService);
  films: Film[] = [];
  ngOnInit(){ this.api.getAll().subscribe(f => this.films = f); }
}
