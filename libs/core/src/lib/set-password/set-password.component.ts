// Angular.
import { CommonModule } from '@angular/common';
import {
  Input,
  OnInit,
  inject,
  signal,
  Output,
  Component,
  OnDestroy,
  EventEmitter,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';

// 3rd party.
import { Subscription, debounceTime } from 'rxjs';
import { AuthError, User } from '@supabase/supabase-js';

// Local.
import { LogService } from '../logging/log.service';
import { SupabaseConfig } from '../supabase-config';
import { SupabaseService } from '../supabase.service';
import { RouteService } from '../route.service';
import { UrlTree } from '@angular/router';
import { NotifyService } from '../notify/notify.service';

@Component({
  selector: 'supabase-set-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './set-password.component.html',
  styleUrl: './set-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetPasswordComponent implements OnInit, OnDestroy {
  @Input() title = '';
  @Input() confirmPassword!: boolean;
  @Input() redirectTo: string | string[] | UrlTree | null | undefined;
  @Output() saved = new EventEmitter<User | null>();

  readonly saving = signal(false);
  readonly errorMessage = signal('');
  readonly confirmMisMatch = signal(false);
  readonly form: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required]),
  });

  protected readonly log = inject(LogService);
  protected readonly notify = inject(NotifyService);
  protected readonly config = inject(SupabaseConfig);
  protected readonly supabase = inject(SupabaseService);
  protected readonly routeService = inject(RouteService);
  protected readonly changeDetector = inject(ChangeDetectorRef);
  protected readonly subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.title = this.title ?? this.config.setPassword.title;
    this.confirmPassword =
      this.confirmPassword ?? this.config.setPassword.requireConfirm;

    if (this.confirmPassword) {
      const confirm = new FormControl('', [
        Validators.required,
        validatePasswordsMatch,
      ]);

      this.form.addControl('confirm', confirm);
      this.subscriptions.push(
        this.form.valueChanges.pipe(debounceTime(250)).subscribe(() => {
          const isMisMatch =
            !this.form.disabled &&
            confirm.dirty &&
            confirm.value !== this.form.value.password;

          this.confirmMisMatch.set(isMisMatch);
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  async submit(): Promise<void> {
    if (this.form.invalid) {
      return;
    }

    this.form.disable();
    this.saving.set(true);

    try {
      const { data, error } = await this.supabase.client.auth.updateUser({
        password: this.form.value.password,
      });

      if (error) {
        this.errorMessage.set(error.message);
        this.log.error(`Failed to save password. ${error.message}`);
        this.onError(error);
      }

      this.log.info(`Set password for '${data?.user?.email || ''}'`);
      this.saved.emit(data.user);

      if (this.config.setPassword.showMessageOnSave) {
        this.notify.showSuccess({
          title: 'Password Changed',
          message: 'Your password was successfully reset',
        });
      }

      if (this.redirectTo) {
        await this.routeService.goTo(this.redirectTo as string);
      }
    } finally {
      this.form.enable();
      this.saving.set(false);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onError(error: AuthError): void {
    // Do nothing in here because this is just a hook for child
    // components to easily subscribe to when an error occurs.
  }
}

function validatePasswordsMatch(
  c: AbstractControl
): null | { passwordsMatch: false } {
  const root = c.root as FormGroup;
  return root.value['password'] === c.value ? null : { passwordsMatch: false };
}
