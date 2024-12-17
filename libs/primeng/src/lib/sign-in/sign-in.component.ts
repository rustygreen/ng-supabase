// Angular.
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Component, ChangeDetectionStrategy, computed } from '@angular/core';

// 3rd party.
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

// ng-supabase.
import { SignInComponent as CoreSignInComponent } from '@ng-supabase/core';

// Local.
import { Message } from '../messages/message';
import { MessagesComponent } from '../messages/messages.component';
import { SocialsGridComponent } from '../socials-grid/socials-grid.component';
import { WaitMessageComponent } from '../wait-message/wait-message.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { LoadingOverlayComponent } from '../loading-overlay/loading-overlay.component';

let id = 0;

@Component({
  selector: 'supabase-sign-in',
  standalone: true,
  imports: [
    MenuModule,
    CommonModule,
    ButtonModule,
    CheckboxModule,
    PasswordModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    MessagesComponent,
    ReactiveFormsModule,
    WaitMessageComponent,
    SocialsGridComponent,
    ResetPasswordComponent,
    LoadingOverlayComponent,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent extends CoreSignInComponent {
  menuItems: MenuItem[] = [
    {
      label: 'Sign in with email',
      icon: 'pi pi-envelope',
      command: () => this.showSignInWithEmail(),
    },
  ];

  readonly id = `ng-sign-in_${id++}`;
  readonly messages = computed<Message[]>(() => {
    const text = this.errorMessage() || '';
    const message: Message = {
      severity: 'error',
      text,
    };

    return text ? [message] : [];
  });
}
