// Angular.
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  OnInit,
  Component,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';

// 3rd party.
import { Subscription } from 'rxjs';
import { Message } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { MessagesModule } from 'primeng/messages';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';

// ng-supabase.
import { LoginComponent as CoreLoginComponent } from '@ng-supabase/core';

// Local.
import { LoadingOverlayComponent } from '../loading-overlay/loading-overlay.component';

@Component({
  selector: 'supabase-login',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DividerModule,
    MessagesModule,
    CheckboxModule,
    PasswordModule,
    FieldsetModule,
    InputTextModule,
    ReactiveFormsModule,
    LoadingOverlayComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent
  extends CoreLoginComponent
  implements OnInit, OnDestroy
{
  messages: Message[] = [];

  private errorMsgSubscription = Subscription.EMPTY;

  override ngOnInit(): void {
    super.ngOnInit();
    this.errorMsgSubscription = this.errorMessage.subscribe((detail) => {
      this.messages = detail
        ? [{ severity: 'error', summary: 'Error', detail }]
        : [];
      this.changeDetector.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.errorMsgSubscription.unsubscribe();
  }
}
