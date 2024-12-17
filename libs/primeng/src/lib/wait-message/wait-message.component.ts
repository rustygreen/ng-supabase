// Angular.
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  Input,
  inject,
  Output,
  Component,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

// 3rd party.
import { DividerModule } from 'primeng/divider';
import { FieldsetModule } from 'primeng/fieldset';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputOtpChangeEvent, InputOtpModule } from 'primeng/inputotp';

// @ng-supabase
import { WaitMessage, SupabaseConfig } from '@ng-supabase/core';

@Component({
  selector: 'supabase-wait-message',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    DividerModule,
    FieldsetModule,
    InputOtpModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './wait-message.component.html',
  styleUrl: './wait-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WaitMessageComponent {
  @Input({ required: true }) message!: WaitMessage | null | undefined;
  @Input() mainTitle = `Didn't receive it?`;
  @Input() sendAgainLabel = `send again`;
  @Input() cancelLabel = `cancel`;
  @Input() showSendAgain = true;
  @Input() showCancel = true;
  @Input() subTitle = '';
  @Input() otpMessage = 'Enter the code from your email';
  @Input() loading = false;

  @Output() cancel = new EventEmitter<void>();
  @Output() sendAgain = new EventEmitter<void>();
  @Output() verifyOtp = new EventEmitter<string>();

  readonly config = inject(SupabaseConfig);
  otp = '';

  checkOtpValue(event: InputOtpChangeEvent): void {
    const digits = (event.value || '').length;
    const doOtpCheck = digits === this.config.signIn.otpLength;
    if (doOtpCheck) {
      this.verifyOtp.emit(event.value);
    }
  }
}
