// Angular.
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

// 3rd party.
import { Message } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { AuthError } from '@supabase/supabase-js';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

// @ng-supabase.
import { RegisterComponent as CoreRegisterComponent } from '@ng-supabase/core';

// Local.
import { WaitMessageComponent } from '../wait-message/wait-message.component';
import { SocialsGridComponent } from '../socials-grid/socials-grid.component';

@Component({
  selector: 'supabase-register',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    MessageModule,
    CheckboxModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
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
        text: detail,
      } as any, // TODO,
    ]);
  }
}
