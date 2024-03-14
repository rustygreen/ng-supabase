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
import { SocialSignIn, SocialSignInItem } from './social-sign-in';
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

  forgotPassword = false;
  wait: WaitMessage | null = null;
  signingIn = new Subject<boolean>();
  errorMessage = new Subject<string>();
  socialItems: SocialSignInItem[] = [];
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
    const { signIn } = inject(SupabaseConfig);
    this.socialItems = signIn.socialSignInItems;
  }

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

  async signInWithSocial(social: SocialSignIn): Promise<void> {
    const result = this.config.signIn.onSocialSignIn?.(social);
    if (result === false) {
      return;
    }

    const { error } = await this.supabase.client.auth.signInWithOAuth({
      provider: social as Provider,
    });

    if (error) {
      this.log.debug(
        `Unable to sign in with social '${social}'. ${error.message}`
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
        this.errorMessage.next(error.message);
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
}
