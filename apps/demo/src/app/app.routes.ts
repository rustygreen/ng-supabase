// Angular.
import { Routes } from '@angular/router';

// ng-supabase.
import { IsLoggedIn } from '@ng-supabase/core';

// Local.
import { MainComponent } from './main/main.component';
import { PrivateContentComponent } from './private-content/private-content.component';
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
import { RegisterOrSignInComponent as PrimeNgRegisterOrSignInComponent } from './primeng/register-or-sign-in/register-or-sign-in.component';
import { RegisterOrSignInComponent as MaterialRegisterOrSignInComponent } from './material/register-or-sign-in/register-or-sign-in.component';
import { RegisterOrSignInComponent as BootstrapRegisterOrSignInComponent } from './bootstrap/register-or-sign-in/register-or-sign-in.component';

export const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'login', redirectTo: 'primeng/login' },
  {
    path: 'private-content',
    component: PrivateContentComponent,
    canActivate: [IsLoggedIn],
  },

  // PrimeNG routes.
  { path: 'primeng/login', component: PrimeNgLoginComponent },
  { path: 'primeng/register', component: PrimeNgRegisterComponent },
  { path: 'primeng/set-password', component: PrimeNgSetPasswordComponent },
  { path: 'primeng/reset-password', component: PrimeNgResetPasswordComponent },
  { path: 'primeng/auth', component: PrimeNgRegisterOrSignInComponent },
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
  { path: 'bootstrap/auth', component: BootstrapRegisterOrSignInComponent },
  // Material routes.
  { path: 'material/login', component: MaterialLoginComponent },
  { path: 'material/register', component: MaterialRegisterComponent },
  { path: 'material/set-password', component: MaterialSetPasswordComponent },
  {
    path: 'material/reset-password',
    component: MaterialResetPasswordComponent,
  },
  { path: 'material/auth', component: MaterialRegisterOrSignInComponent },

  { path: '**', redirectTo: '' },
];
