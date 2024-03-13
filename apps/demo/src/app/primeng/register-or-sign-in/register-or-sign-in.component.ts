// Angular.
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

// ng-supabase.
import { RegisterOrSignInComponent as PrimeNgRegisterOrSignInComponent } from '@ng-supabase/primeng';

@Component({
  selector: 'ng-supabase-register-or-sign-in',
  standalone: true,
  imports: [CommonModule, PrimeNgRegisterOrSignInComponent],
  templateUrl: './register-or-sign-in.component.html',
  styleUrl: './register-or-sign-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterOrSignInComponent {}
