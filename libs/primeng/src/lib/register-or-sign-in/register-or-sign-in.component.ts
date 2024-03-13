// Angular.
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

// 3rd party.
import { TabViewModule } from 'primeng/tabview';
import { SelectButtonModule } from 'primeng/selectbutton';

// @ng-supabase.
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { RegisterOrSignInComponent as CoreRegisterOrSignInComponent } from '@ng-supabase/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'supabase-register-or-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RegisterComponent,
    LoginComponent,
    TabViewModule,
    SelectButtonModule,
  ],
  templateUrl: './register-or-sign-in.component.html',
  styleUrl: './register-or-sign-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterOrSignInComponent extends CoreRegisterOrSignInComponent {
  stateOptions: any[] = [
    { label: 'Register', value: 'register', icon: 'pi pi-user-plus' },
    { label: 'Sign in', value: 'sign-in', icon: 'pi pi-sign-in' },
  ];

  selection: string = 'register';
}
