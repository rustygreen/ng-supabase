// Angular.
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  signal,
  OnInit,
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';

// 3rd party.
import { Message } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { DividerModule } from 'primeng/divider';
import { PasswordModule } from 'primeng/password';
import { MessagesModule } from 'primeng/messages';
import { AuthError } from '@supabase/supabase-js';

// @ng-supabase.
import { SetPasswordComponent as CoreSetPasswordComponent } from '@ng-supabase/core';

@Component({
  selector: 'supabase-set-password',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DividerModule,
    PasswordModule,
    MessageModule,
    MessagesModule,
    ReactiveFormsModule,
  ],
  templateUrl: './set-password.component.html',
  styleUrl: './set-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetPasswordComponent
  extends CoreSetPasswordComponent
  implements OnInit
{
  messages = signal<Message[]>([]);

  override ngOnInit(): void {
    super.ngOnInit();
  }

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
