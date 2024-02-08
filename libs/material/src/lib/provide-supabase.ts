// Angular.
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

// @ng-supabase.
import {
  SupabaseConfig,
  SupabaseConfigProperties,
  NotifyService as CoreNotifyService,
} from '@ng-supabase/core';

export function provideSupabase(
  config: SupabaseConfigProperties
): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: SupabaseConfig,
      useValue: new SupabaseConfig(config),
    },
    {
      provide: CoreNotifyService,
      useValue: {},
      // TODO: Implement - @russell.green
      // useClass: NotifyService,
    },
  ]);
}
