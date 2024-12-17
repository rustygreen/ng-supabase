// Angular.
import { provideRouter } from '@angular/router';
import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// 3rd party.
import Aura from '@primeng/themes/aura';
import { providePrimeNG } from 'primeng/config';

// ng-supabase.
import { provideSupabase } from '@ng-supabase/primeng';
import { LogLevel, ALL_SOCIAL_SIGN_INS } from '@ng-supabase/core';

// Local.
import { appRoutes } from './app.routes';
import { STORAGE_KEYS } from './app.constants';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: { preset: Aura },
    }),
    provideSupabase({
      // NOTE: You can optionally set "project" instead of "apiUrl".
      apiUrl: localStorage.getItem(STORAGE_KEYS.apiUrl) || 'YOUR_PROJECT_URL',
      apiKey: localStorage.getItem(STORAGE_KEYS.apiKey) || 'YOUR_ANON_API_KEY',
      signIn: {
        socials: ALL_SOCIAL_SIGN_INS,
      },
      logging: {
        logLevel: LogLevel.Debug,
      },
      // Uncomment below to require first and last name during sign up
      // register: {
      //   metadata: [
      //     { field: 'first_name', label: 'First Name', required: true },
      //     { field: 'last_name', label: 'Last Name', required: true },
      //   ],
      // },
    }),
  ],
};
