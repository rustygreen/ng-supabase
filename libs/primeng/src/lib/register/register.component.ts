// Angular.
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

// 3rd party.
import { Message } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { AuthError } from '@supabase/supabase-js';
import { CheckboxModule } from 'primeng/checkbox';
import { MessagesModule } from 'primeng/messages';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { WaitMessageComponent } from '../wait-message/wait-message.component';
import { SocialsGridComponent } from '../socials-grid/socials-grid.component';

// @ng-supabase.
import { RegisterComponent as CoreRegisterComponent } from '@ng-supabase/core';

@Component({
  selector: 'supabase-register',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    MessagesModule,
    CheckboxModule,
    InputTextModule,
    ReactiveFormsModule,
    WaitMessageComponent,
    SocialsGridComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent extends CoreRegisterComponent {
  messages = signal<Message[]>([]);

  override onError(error: AuthError | string): void {
    super.onError(error);
    const detail = (error as AuthError)?.message || (error as string);
    this.messages.set([
      {
        severity: 'error',
        closable: true,
        detail,
      },
    ]);
  }
}
