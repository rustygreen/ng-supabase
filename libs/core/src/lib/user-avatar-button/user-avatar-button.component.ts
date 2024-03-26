// Angular.
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'supabase-user-avatar-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-avatar-button.component.html',
  styleUrl: './user-avatar-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserAvatarButtonComponent {}
