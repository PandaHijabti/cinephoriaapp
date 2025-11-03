import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-star-rating',
  imports: [CommonModule],
  template: `
    <span class="stars" [title]="value.toFixed(1) + '/5'">
      <span class="stars-fill" [style.width.%]="(value/5)*100">★★★★★</span>
      <span class="stars-base">★★★★★</span>
    </span>
  `,
  styles: [`
    .stars{ position:relative; display:inline-block; font-size:1.05rem; line-height:1; }
    .stars-base{ color:#3b466a; opacity:.35 }
    .stars-fill{ position:absolute; top:0; left:0; white-space:nowrap; overflow:hidden; color:#ffd766 }
  `]
})
export class StarRatingComponent {
  @Input() value = 0; // 0..5
}
