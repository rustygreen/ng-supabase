// Angular.
import { Routes } from '@angular/router';

// Local.
import { MainComponent } from './main/main.component';
import { LoginComponent as PrimeNgLoginComponent } from './primeng/login/login.component';
import { LoginComponent as MaterialLoginComponent } from './material/login/login.component';
import { LoginComponent as BootstrapLoginComponent } from './bootstrap/login/login.component';
import { RegisterComponent as PrimeNgRegisterComponent } from './primeng/register/register.component';
import { RegisterComponent as MaterialRegisterComponent } from './material/register/register.component';
import { RegisterComponent as BootstrapRegisterComponent } from './bootstrap/register/register.component';
import { SetPasswordComponent as PrimeNgSetPasswordComponent } from './primeng/set-password/set-password.component';
import { SetPasswordComponent as MaterialSetPasswordComponent } from './material/set-password/set-password.component';
import { SetPasswordComponent as BootstrapSetPasswordComponent } from './bootstrap/set-password/set-password.component';
import { ResetPasswordComponent as PrimeNgResetPasswordComponent } from './primeng/reset-password/reset-password.component';
import { ResetPasswordComponent as MaterialResetPasswordComponent } from './material/reset-password/reset-password.component';
import { ResetPasswordComponent as BootstrapResetPasswordComponent } from './bootstrap/reset-password/reset-password.component';

export const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'login', redirectTo: 'primeng/login' },

  // PrimeNG routes.
  { path: 'primeng/login', component: PrimeNgLoginComponent },
  { path: 'primeng/register', component: PrimeNgRegisterComponent },
  { path: 'primeng/set-password', component: PrimeNgSetPasswordComponent },
  { path: 'primeng/reset-password', component: PrimeNgResetPasswordComponent },
  // Bootstrap routes.
  { path: 'bootstrap/login', component: BootstrapLoginComponent },
  { path: 'bootstrap/register', component: BootstrapRegisterComponent },
  {
    path: 'bootstrap/set-password',
    component: BootstrapSetPasswordComponent,
  },
  {
    path: 'bootstrap/reset-password',
    component: BootstrapResetPasswordComponent,
  },
  // Material routes.
  { path: 'material/login', component: MaterialLoginComponent },
  { path: 'material/register', component: MaterialRegisterComponent },
  { path: 'material/set-password', component: MaterialSetPasswordComponent },
  {
    path: 'material/reset-password',
    component: MaterialResetPasswordComponent,
  },

  { path: '**', redirectTo: '' },
];
