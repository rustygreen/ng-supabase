// Angular.
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

// Supabase.
import { ResetPasswordComponent as PrimeNgResetPasswordComponent } from '@ng-supabase/primeng';

@Component({
  selector: 'ng-supabase-reset-password',
  standalone: true,
  imports: [CommonModule, PrimeNgResetPasswordComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent {}
