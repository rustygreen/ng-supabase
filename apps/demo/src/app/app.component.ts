// Angular.
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ChangeDetectionStrategy, Component } from '@angular/core';

// 3rd party.
import { Lara } from 'primeng/themes/lara';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  selector: 'ng-supabase-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'ng-supabase';

  constructor(private config: PrimeNGConfig) {
    this.config.theme.set({ preset: Lara });
  }
}
