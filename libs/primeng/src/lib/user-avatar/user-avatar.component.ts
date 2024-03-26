// Angular.
import { CommonModule } from '@angular/common';
import { Input, Component, ChangeDetectionStrategy } from '@angular/core';

// 3rd party.
import { AvatarModule } from 'primeng/avatar';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'supabase-user-avatar',
  standalone: true,
  imports: [CommonModule, AvatarModule, SkeletonModule],
  templateUrl: './user-avatar.component.html',
  styleUrl: './user-avatar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserAvatarComponent {
  @Input() initials = '';
  @Input() title = '';
  @Input() subtitle = '';
  @Input() loading: boolean | null | undefined = false;
}
