// Angular.
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

// ng-supabase.
import { SignInComponent as PrimeNgSignInComponent } from '@ng-supabase/primeng';

@Component({
  selector: 'ng-supabase-primeng-sign-in',
  standalone: true,
  imports: [CommonModule, PrimeNgSignInComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {}
