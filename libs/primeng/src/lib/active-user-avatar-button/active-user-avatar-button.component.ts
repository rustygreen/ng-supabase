// Angular.
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

// 3rd party.
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

// ng-supabase.
import { UserAvatarButtonComponent } from '../user-avatar-button/user-avatar-button.component';
import {
  InitialsPipe,
  ActiveUserAvatarButtonComponent as CoreActiveUserAvatarButtonComponent,
} from '@ng-supabase/core';

@Component({
  selector: 'supabase-active-user-avatar-button',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    ButtonModule,
    InitialsPipe,
    UserAvatarButtonComponent,
  ],
  templateUrl: './active-user-avatar-button.component.html',
  styleUrl: './active-user-avatar-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActiveUserAvatarButtonComponent extends CoreActiveUserAvatarButtonComponent {
  @Input() items: MenuItem[] = [
    {
      label: 'Sign out',
      icon: 'pi pi-power-off',
      command: () => this.signOut(),
    },
  ];
}
