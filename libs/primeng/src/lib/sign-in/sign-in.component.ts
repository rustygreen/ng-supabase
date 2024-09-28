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
import { MenuItem } from 'primeng/api';
import { Message } from 'primeng/message';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

// ng-supabase.
import { SignInComponent as CoreSignInComponent } from '@ng-supabase/core';

// Local.
import { SocialsGridComponent } from '../socials-grid/socials-grid.component';
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
    MessageModule,
    CheckboxModule,
    PasswordModule,
    FieldsetModule,
    IconFieldModule,
    InputIconModule,
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
  readonly id = `ng-sign-in_${id++}`;
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
    this.errorMsgSubscription = this.errorMessage.subscribe((content) => {
      const message = {
        severity: 'error',
        summary: 'Error',
        content,
      } as any; // TODO: Fix when primeng is finalized - @russell.green

      this.messages = content ? [message] : [];
      this.changeDetector.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.errorMsgSubscription.unsubscribe();
  }
}
