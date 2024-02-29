// Angular.
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

// 3rd party.
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'ng-supabase-private-content',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonModule],
  templateUrl: './private-content.component.html',
  styleUrl: './private-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateContentComponent {}
