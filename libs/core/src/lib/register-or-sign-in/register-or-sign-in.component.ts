import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'supabase-register-or-sign-in',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './register-or-sign-in.component.html',
  styleUrl: './register-or-sign-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterOrSignInComponent {}
