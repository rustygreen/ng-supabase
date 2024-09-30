// Angular.
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { signal, Component, ChangeDetectionStrategy } from '@angular/core';

// 3rd party.
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { AuthError } from '@supabase/supabase-js';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';

// @ng-supabase.
import { SetPasswordComponent as CoreSetPasswordComponent } from '@ng-supabase/core';
import { MessagesComponent } from '../messages/messages.component';
import { Message } from '../messages/message';

@Component({
  selector: 'supabase-set-password',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DividerModule,
    PasswordModule,
    FloatLabelModule,
    MessagesComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './set-password.component.html',
  styleUrl: './set-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetPasswordComponent extends CoreSetPasswordComponent {
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
