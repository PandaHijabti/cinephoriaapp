import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { FilmService, Film } from '../../services/film.service';

@Component({
  selector: 'app-film-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './film-detail.html',
  styleUrls: ['./film-detail.scss'],
})
export class FilmDetailComponent {
  film?: Film;

  constructor(
    private route: ActivatedRoute,
    private filmService: FilmService
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.film = this.filmService.getById(id);
  }
}
