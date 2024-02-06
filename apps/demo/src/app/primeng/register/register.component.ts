// Angular.
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

// Supabase.
import { RegisterComponent as PrimeNgRegisterComponent } from '@ng-supabase/primeng';

@Component({
  selector: 'ng-supabase-register',
  standalone: true,
  imports: [CommonModule, PrimeNgRegisterComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {}
