// Angular.
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  Input,
  signal,
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';

// 3rd party.
import { AuthError } from '@supabase/supabase-js';

// Local.
import { WaitMessage } from '../wait-message';
import { RouteService } from '../route.service';
import { LogService } from '../logging/log.service';
import { SupabaseConfig } from '../supabase-config';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'supabase-register',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  @Input() title = 'Register Account';
  @Input() email = '';

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

  readonly errorMessage = signal('');
  readonly working = signal(false);
  readonly wait = signal<WaitMessage | null>(null);
  readonly form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
  });

  constructor(
    private readonly log: LogService,
    private readonly config: SupabaseConfig,
    private readonly supabase: SupabaseService,
    private readonly routeService: RouteService
  ) {}

  async register(): Promise<void> {
    if (this.form.invalid) {
      return;
    }

    this.form.disable();
    this.working.set(true);

    try {
      const email = this.form.value.email as string;
      const emailRedirectTo = this.getRedirectTo();
      const { error } = await this.supabase.client.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
          emailRedirectTo,
        },
      });

      if (error) {
        this.errorMessage.set(error.message);
        this.log.error(`Failed to save password. ${error.message}`);
        this.onError(error);
      }

      this.log.info(`Sent OTP email to '${email}'`);
      this.wait.set({
        icon: 'pi pi-envelope',
        title: 'Check your email',
        message: `An email has been sent to <strong>${email}</strong> with a link to verify your email address. Simply click the link from your email and follow the instructions to continue.`,
      });
    } finally {
      this.form.enable();
      this.working.set(false);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onError(error: AuthError): void {
    // Do nothing in here because this is just a hook for child
    // components to easily subscribe to when an error occurs.
  }

  protected getRedirectTo(): string {
    const fallback = this.config.routes.userProfile || this.config.routes.main;
    return this.redirectToPath
      ? this.routeService.appendRoute(this.redirectToPath)
      : this.redirectToUrl || this.routeService.appendRoute(fallback);
  }
}
