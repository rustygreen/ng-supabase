// Angular.
import { provideRouter } from '@angular/router';
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';

// ng-supabase.
import { provideSupabase } from '@ng-supabase/primeng';
import { LogLevel, ALL_SOCIAL_SIGN_INS } from '@ng-supabase/core';

// Local.
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideAnimations(),
    provideSupabase({
      project: 'YOUR_PROJECT',
      // project: 'bwufqwezcimnhvxjrseu',
      apiKey: 'YOUR_ANON_API_KEY',
      // apiKey:
      //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3dWZxd2V6Y2ltbmh2eGpyc2V1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM0ODI5OTksImV4cCI6MjAyOTA1ODk5OX0.-YrY07gcUtPi-kNtM30l0U6tpoJKrrttEHCEZkPBMAs',
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
