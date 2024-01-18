import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetPasswordComponent as PrimeNgSetPasswordComponent } from '@ng-supabase/primeng';

@Component({
  selector: 'ng-supabase-set-password',
  standalone: true,
  imports: [CommonModule, PrimeNgSetPasswordComponent],
  templateUrl: './set-password.component.html',
  styleUrl: './set-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetPasswordComponent {}
