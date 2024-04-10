// Angular.
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

// 3rd party.
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';

// ng-supabase.
import { UserAvatarButtonComponent as CoreUserAvatarButtonComponent } from '@ng-supabase/core';

// Local.
import { UserAvatarComponent } from '../user-avatar/user-avatar.component';

@Component({
  selector: 'supabase-user-avatar-button',
  standalone: true,
  imports: [CommonModule, MenuModule, UserAvatarComponent],
  templateUrl: './user-avatar-button.component.html',
  styleUrl: './user-avatar-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserAvatarButtonComponent extends CoreUserAvatarButtonComponent {
  @Input() items: MenuItem[] = [];
  @Input() initials = '';
  @Input() title = '';
  @Input() subtitle = '';
  @Input() image: string | null | undefined = '';
  @Input() loading: boolean | null | undefined = false;
}
