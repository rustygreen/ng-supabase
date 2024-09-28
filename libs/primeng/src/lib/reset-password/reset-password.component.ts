// Angular.
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

// 3rd party.
import { Message } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { AuthError } from '@supabase/supabase-js';
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
    MessageModule,
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
        content: error.message,
      } as any, // TODO: Fix when primeng is finalized - @russell.green,
    ]);
  }
}
