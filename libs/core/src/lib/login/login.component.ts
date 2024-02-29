// Angular.
import { UrlTree } from '@angular/router';
import {
  Input,
  OnInit,
  Component,
  inject,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';

// 3rd party.
import { Subject } from 'rxjs';
import { Provider } from '@supabase/supabase-js';

// Local.
import { WaitMessage } from '../wait-message';
import { RouteService } from '../route.service';
import { LogService } from '../logging/log.service';
import { SupabaseConfig } from '../supabase-config';
import { SupabaseService } from '../supabase.service';
import { SocialLogIn, SocialLoginItem } from './social-login';
import { PersistentStorageService } from '../storage/persistent-storage.service';

@Component({
  selector: 'supabase-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  @Input() title = '';
  @Input() email = '';
  @Input() password = '';
  @Input() usePassword = false;
  @Input() redirectTo = '';
  @Input() rememberMe: boolean | undefined;

  forgotPassword = false;
  wait: WaitMessage | null = null;
  loggingIn = new Subject<boolean>();
  errorMessage = new Subject<string>();
  socialItems: SocialLoginItem[] = [];
  form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl(''),
    usePassword: new FormControl(false),
    rememberMe: new FormControl(true),
  });

  get hasSocials(): boolean {
    return this.socialItems.length > 0;
  }

  get hasNoSocials(): boolean {
    return this.socialItems.length === 0;
  }

  protected readonly log = inject(LogService);
  protected readonly config = inject(SupabaseConfig);
  protected readonly supabase = inject(SupabaseService);
  protected readonly routeService = inject(RouteService);
  protected readonly storage = inject(PersistentStorageService);
  protected readonly changeDetector = inject(ChangeDetectorRef);

  constructor() {
    const { login } = inject(SupabaseConfig);
    this.socialItems = login.socialLoginItems;
  }

  ngOnInit(): void {
    this.title = this.title ?? this.config.login.title;
    const rememberMe = this.rememberMe ?? this.config.login.rememberMe;
    this.form.controls.email.setValue(this.email);
    this.form.controls.usePassword.setValue(this.usePassword);
    this.form.controls.password.setValue(this.password);
    this.form.controls.rememberMe.setValue(rememberMe);
    this.tryLoadRememberMe();
  }

  showLoginWithPassword(event?: MouseEvent): void {
    event?.preventDefault();
    this.form.controls.usePassword.setValue(true);
    this.form.controls.password.setValidators([Validators.required]);
    this.revalidateAllControls();
  }

  showLoginWithEmail(event?: MouseEvent): void {
    event?.preventDefault();
    this.form.controls.usePassword.setValue(false);
    this.form.controls.password.setValidators([]);
    this.revalidateAllControls();
  }

  showForgotPassword(event?: MouseEvent): void {
    event?.preventDefault();
    this.forgotPassword = true;
  }

  login(): void {
    if (this.form.disabled || this.form.invalid) {
      return;
    }

    this.form.value.usePassword
      ? this.loginWithPassword()
      : this.loginWithMagicLink();
  }

  async loginWithSocial(social: SocialLogIn): Promise<void> {
    const result = this.config.login.onSocialLogin?.(social);
    if (result === false) {
      return;
    }

    const { error } = await this.supabase.client.auth.signInWithOAuth({
      provider: social as Provider,
    });

    if (error) {
      this.log.debug(
        `Unable to login with social login '${social}'. ${error.message}`
      );
      this.errorMessage.next(error.message);
      return;
    }
  }

  protected revalidateAllControls(): void {
    Object.values(this.form.controls).forEach((control) =>
      control.updateValueAndValidity()
    );
  }

  protected async loginWithPassword(): Promise<void> {
    try {
      this.log.debug('Logging in with password');
      this.loggingIn.next(true);
      const email = this.form.value.email as string;
      const password = this.form.value.password as string;
      const { error } = await this.supabase.client.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        this.log.debug(`Login failed. ${error.message}`);
        this.errorMessage.next(error.message);
        return;
      }

      const redirect = this.getRedirectUrl();
      this.log.debug(`Logged in successfully. Redirecting to ${redirect}`);
      this.trySaveRememberMe();

      await this.supabase.waitForLoggedIn();
      this.routeService.goTo(redirect as string);
    } catch (error) {
      this.log.error(`Failed to login`);
      // TODO: Handle - @rusty.green.
    } finally {
      this.loggingIn.next(false);
    }
  }

  protected getRedirectUrl(): string | string[] | UrlTree {
    return (
      this.redirectTo ||
      this.routeService.getRedirectParamValue() ||
      this.config.login.redirectTo ||
      this.config.mainRoute
    );
  }

  protected async loginWithMagicLink(): Promise<void> {
    try {
      this.loggingIn.next(true);
      const email = this.form.value.email as string;
      const emailRedirectTo = this.getRedirectUrl().toString();
      const { error } = await this.supabase.client.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo,
          // TODO: Pass/configure other options (like "shouldCreateUser") - @rusty.green
        },
      });

      if (error) {
        this.errorMessage.next(error.message);
        return;
      }

      this.wait = {
        icon: 'pi pi-envelope',
        title: 'Check your email',
        message: `An email has been sent to <strong>${email}</strong> with a magic link to sign in. Simply click the link from your email and you will automatically be signed into this app.`,
      };
      this.changeDetector.markForCheck();
      this.trySaveRememberMe();
    } catch (error) {
      //todo
    } finally {
      this.loggingIn.next(false);
    }
  }

  protected tryLoadRememberMe(): void {
    const info = this.storage.getJson(this.config.login.rememberMeStorageKey);
    if (info) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.form.patchValue(info);
      this.form.value.usePassword
        ? this.showLoginWithPassword()
        : this.showLoginWithEmail();
    }
  }

  protected clearRememberMe(): void {
    this.storage.removeItem(this.config.login.rememberMeStorageKey);
  }

  protected trySaveRememberMe(): void {
    if (this.form.value.rememberMe) {
      const { email, usePassword } = this.form.value;
      const value = { email, usePassword };
      this.storage.setJson(this.config.login.rememberMeStorageKey, value);
    } else {
      this.clearRememberMe();
    }
  }
}
