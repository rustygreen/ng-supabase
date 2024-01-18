// Angular.
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

// ng-supabase.
import { LoginComponent as PrimeNgLoginComponent } from '@ng-supabase/primeng';

@Component({
  selector: 'ng-supabase-primeng-login',
  standalone: true,
  imports: [CommonModule, PrimeNgLoginComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {}
