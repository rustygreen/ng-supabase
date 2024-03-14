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
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { MenuItem, Message } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { MessagesModule } from 'primeng/messages';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';

// ng-supabase.
import { SignInComponent as CoreSignInComponent } from '@ng-supabase/core';

// Local.
import { SocialsGridComponent } from '../socials-grid/socials-grid.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { LoadingOverlayComponent } from '../loading-overlay/loading-overlay.component';

@Component({
  selector: 'supabase-sign-in',
  standalone: true,
  imports: [
    MenuModule,
    CommonModule,
    ButtonModule,
    MessagesModule,
    CheckboxModule,
    PasswordModule,
    FieldsetModule,
    InputTextModule,
    ReactiveFormsModule,
    SocialsGridComponent,
    ResetPasswordComponent,
    LoadingOverlayComponent,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent
  extends CoreSignInComponent
  implements OnInit, OnDestroy
{
  messages: Message[] = [];
  menuItems: MenuItem[] = [
    {
      label: 'Sign in with email',
      icon: 'pi pi-envelope',
      command: () => this.showSignInWithEmail(),
    },
  ];

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
