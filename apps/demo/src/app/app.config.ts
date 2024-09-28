// Angular.
import { provideRouter } from '@angular/router';
import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// ng-supabase.
import { provideSupabase } from '@ng-supabase/primeng';
import { LogLevel, ALL_SOCIAL_SIGN_INS } from '@ng-supabase/core';

// Local.
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    provideSupabase({
      apiUrl: 'https://dzyrspsuxgieqnvgvryp.supabase.co',
      apiKey:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6eXJzcHN1eGdpZXFudmd2cnlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQyMjQ5MDEsImV4cCI6MjAwOTgwMDkwMX0.d8Qqa07RrjW3OSAjSnlubYCXSiHJWW55y9sLN-Rjc6w',
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
