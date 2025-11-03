import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CinemaService, type FooterInfo } from '../../services/cinema.service';

@Component({
  standalone: true,
  selector: 'app-footer',
  imports: [CommonModule],
  template: `
  <footer style="border-top:1px solid #ddd;padding:12px;margin-top:24px;background:#fafafa">
    <div *ngFor="let c of infos">
      <strong>{{c.name}}</strong> — {{c.address}} — {{c.phone}} — {{c.hours}}
    </div>
    <p style="margin-top:8px;text-align:center;color:#666">© 2025 Cinéphoria</p>
  </footer>
  `
})
export class FooterComponent {
  private cinema = inject(CinemaService);
  infos: FooterInfo[] = [];
  ngOnInit(){ this.cinema.getFooter().subscribe((x) => this.infos = x); }
}
