// Angular.
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

// 3rd party.
import { Message } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { AuthError } from '@supabase/supabase-js';
import { MessagesModule } from 'primeng/messages';
import { InputTextModule } from 'primeng/inputtext';

// @ng-supabase.
import { ResetPasswordComponent as CoreResetPasswordComponent } from '@ng-supabase/core';

// Local.
import { WaitMessageComponent } from '../wait-message/wait-message.component';

@Component({
  selector: 'supabase-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    MessagesModule,
    InputTextModule,
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
        detail: error.message,
      },
    ]);
  }
}
