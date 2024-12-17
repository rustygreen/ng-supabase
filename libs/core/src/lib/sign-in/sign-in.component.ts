// Angular.
import { UrlTree } from '@angular/router';
import {
  Input,
  signal,
  OnInit,
  inject,
  Component,
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

// Local.
import { WaitMessage } from '../wait-message';
import { RouteService } from '../route.service';
import { LogService } from '../logging/log.service';
import { SupabaseConfig } from '../supabase-config';
import { SupabaseService } from '../supabase.service';
import { PersistentStorageService } from '../storage/persistent-storage.service';

@Component({
  selector: 'supabase-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent implements OnInit {
  @Input() title = '';
  @Input() email = '';
  @Input() password = '';
  @Input() usePassword = false;
  @Input() redirectTo = '';
  @Input() rememberMe: boolean | undefined;

  /**
   * The absolute route to redirect to from the email link. This should not
   * be used in conjunction with "redirectToPath" (use one or the other).
   */
  @Input() redirectToUrl = '';

  /**
   * A route path to redirect to from the email link (as apposed to an absolute path).
   * This path will be appended to the app's root URL and will be the URL that is
   * targeted from the email link. This should not be used in conjunction with
   * "redirectTo" (use one or the other).
   */
  @Input() redirectToPath = '';

  forgotPassword = false;
  signingIn = new Subject<boolean>();
  form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl(''),
    usePassword: new FormControl(false),
    rememberMe: new FormControl(true),
  });

  readonly errorMessage = signal<string | null>(null);
  readonly wait = signal<WaitMessage | null>(null);
  readonly verifyingOtp = signal(false);

  protected readonly log = inject(LogService);
  protected readonly config = inject(SupabaseConfig);
  protected readonly supabase = inject(SupabaseService);
  protected readonly routeService = inject(RouteService);
  protected readonly storage = inject(PersistentStorageService);

  ngOnInit(): void {
    this.title = this.title ?? this.config.signIn.title;
    const rememberMe = this.rememberMe ?? this.config.signIn.rememberMe;
    this.form.controls.email.setValue(this.email);
    this.form.controls.usePassword.setValue(this.usePassword);
    this.form.controls.password.setValue(this.password);
    this.form.controls.rememberMe.setValue(rememberMe);
    this.tryLoadRememberMe();
  }

  showSignInWithPassword(event?: MouseEvent): void {
    event?.preventDefault();
    this.form.controls.usePassword.setValue(true);
    this.form.controls.password.setValidators([Validators.required]);
    this.revalidateAllControls();
  }

  showSignInWithEmail(event?: MouseEvent): void {
    event?.preventDefault();
    this.form.controls.usePassword.setValue(false);
    this.form.controls.password.setValidators([]);
    this.revalidateAllControls();
  }

  showForgotPassword(event?: MouseEvent): void {
    event?.preventDefault();
    this.forgotPassword = true;
  }

  signIn(): void {
    if (this.form.disabled || this.form.invalid) {
      return;
    }

    this.form.value.usePassword
      ? this.signInWithPassword()
      : this.signInWithMagicLink();
  }

  async verifyOtp(token: string): Promise<void> {
    this.verifyingOtp.set(true);
    const email = this.form.value.email as string;
    const { error } = await this.supabase.client.auth.verifyOtp({
      email,
      token,
      type: 'email',
    });

    if (error) {
      this.errorMessage.set(error.message);
      return;
    }

    const redirectUrl = this.getRedirectTo();
    this.routeService.goTo(redirectUrl);
  }

  protected revalidateAllControls(): void {
    Object.values(this.form.controls).forEach((control) =>
      control.updateValueAndValidity()
    );
  }

  protected async signInWithPassword(): Promise<void> {
    try {
      this.log.debug('Logging in with password');
      this.signingIn.next(true);
      const email = this.form.value.email as string;
      const password = this.form.value.password as string;
      const { error } = await this.supabase.client.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        this.log.debug(`Sign in failed. ${error.message}`);
        this.errorMessage.set(error.message);
        return;
      }

      const redirect = this.getRedirectUrl();
      this.log.debug(`Signed in successfully. Redirecting to ${redirect}`);
      this.trySaveRememberMe();

      await this.supabase.waitForSignedIn();
      this.routeService.goTo(redirect as string);
    } catch (error) {
      this.log.error(`Failed to sign in`);
      // TODO: Handle - @rusty.green.
    } finally {
      this.signingIn.next(false);
    }
  }

  protected getRedirectUrl(): string | string[] | UrlTree {
    return (
      this.redirectTo ||
      this.routeService.getRedirectParamValue() ||
      this.config.signIn.redirectTo ||
      this.config.mainRoute
    );
  }

  protected async signInWithMagicLink(): Promise<void> {
    try {
      this.signingIn.next(true);
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
        this.errorMessage.set(error.message);
        return;
      }

      this.wait.set({
        icon: 'pi pi-envelope',
        title: 'Check your email',
        enableOtp: this.config.signIn.otpEnabled,
        message: `An email has been sent to <strong>${email}</strong> with a magic link to sign in. Simply click the link from your email and you will automatically be signed into this app.`,
      });

      this.trySaveRememberMe();
    } catch (error) {
      // TODO: Handle - @russell.green
    } finally {
      this.signingIn.next(false);
    }
  }

  protected tryLoadRememberMe(): void {
    const info = this.storage.getJson(this.config.signIn.rememberMeStorageKey);
    if (info) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.form.patchValue(info);
      this.form.value.usePassword
        ? this.showSignInWithPassword()
        : this.showSignInWithEmail();
    }
  }

  protected clearRememberMe(): void {
    this.storage.removeItem(this.config.signIn.rememberMeStorageKey);
  }

  protected trySaveRememberMe(): void {
    if (this.form.value.rememberMe) {
      const { email, usePassword } = this.form.value;
      const value = { email, usePassword };
      this.storage.setJson(this.config.signIn.rememberMeStorageKey, value);
    } else {
      this.clearRememberMe();
    }
  }

  protected getRedirectTo(): string {
    const fallback = this.config.routes.userProfile || this.config.routes.main;
    return this.redirectToPath
      ? this.routeService.appendRoute(this.redirectToPath)
      : this.redirectToUrl || this.routeService.appendRoute(fallback);
  }
}
