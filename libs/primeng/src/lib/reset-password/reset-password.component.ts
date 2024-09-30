// Angular.
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

// 3rd party.
import { ButtonModule } from 'primeng/button';
import { AuthError } from '@supabase/supabase-js';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

// @ng-supabase.
import { ResetPasswordComponent as CoreResetPasswordComponent } from '@ng-supabase/core';

// Local.
import { Message } from '../messages/message';
import { MessagesComponent } from '../messages/messages.component';
import { WaitMessageComponent } from '../wait-message/wait-message.component';

@Component({
  selector: 'supabase-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    MessagesComponent,
    ReactiveFormsModule,
    WaitMessageComponent,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent extends CoreResetPasswordComponent {
  messages = signal<Message[]>([]);

  override onError(error: AuthError): void {
    super.onError(error);
    this.messages.set([
      {
        severity: 'error',
        closable: true,
        text: error.message,
      },
    ]);
  }
}
