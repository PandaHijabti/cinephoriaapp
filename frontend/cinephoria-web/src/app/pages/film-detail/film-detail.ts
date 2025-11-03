import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FilmService, type Film } from '../../services/film.service';
import { StarRatingComponent } from '../../components/star-rating/star-rating';

@Component({
  standalone: true,
  selector: 'app-film-detail',
  imports: [CommonModule,StarRatingComponent],
  templateUrl: './film-detail.html'
})
export class FilmDetailComponent {
  private route = inject(ActivatedRoute);
  private api = inject(FilmService);

  film: Film | null = null;

  ngOnInit(){
    const id = String(this.route.snapshot.paramMap.get('id') ?? '');
    this.api.getById(id).subscribe(f => this.film = f);
  }
}

