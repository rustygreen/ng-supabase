// Angular.
import { provideRouter } from '@angular/router';
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';

// ng-supabase.
import { provideSupabase } from '@ng-supabase/primeng';
import { LogLevel, ALL_SOCIAL_LOGINS } from '@ng-supabase/core';

// Local.
import { appRoutes } from './app.routes';

// const ALERT_SOCIAL_LOGIN

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideAnimations(),
    provideSupabase({
      apiUrl: 'https://dzyrspsuxgieqnvgvryp.supabase.co',
      apiKey:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6eXJzcHN1eGdpZXFudmd2cnlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQyMjQ5MDEsImV4cCI6MjAwOTgwMDkwMX0.d8Qqa07RrjW3OSAjSnlubYCXSiHJWW55y9sLN-Rjc6w',
      routes: {
        main: '/',
        setPassword: '/set-password',
      },
      login: {
        socials: ALL_SOCIAL_LOGINS,
        // onSocialLogin: ()=>
      },
      logging: {
        logLevel: LogLevel.Debug,
      },
    }),
  ],
};
