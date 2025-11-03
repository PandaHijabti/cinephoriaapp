import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div style="padding:16px">
      <h1>🎬 Cinéphoria</h1>
      <p>Angular tourne bien.</p>
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {}



