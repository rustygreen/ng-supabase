// Angular.
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

// 3rd party.
import { SelectButtonModule } from 'primeng/selectbutton';

// @ng-supabase.
import { SignInComponent } from '../sign-in/sign-in.component';
import { RegisterComponent } from '../register/register.component';
import { RegisterOrSignInComponent as CoreRegisterOrSignInComponent } from '@ng-supabase/core';

interface OptionItem {
  label: string;
  value: string;
  icon?: string;
}

@Component({
  selector: 'supabase-register-or-sign-in',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    SignInComponent,
    RegisterComponent,
    SelectButtonModule,
  ],
  templateUrl: './register-or-sign-in.component.html',
  styleUrl: './register-or-sign-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterOrSignInComponent extends CoreRegisterOrSignInComponent {
  @Input() type: string = 'register';

  stateOptions: OptionItem[] = [
    { label: 'Sign up', value: 'register', icon: 'pi pi-user-plus' },
    { label: 'Sign in', value: 'sign-in', icon: 'pi pi-sign-in' },
  ];
}
