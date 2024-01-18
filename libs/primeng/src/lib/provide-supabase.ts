// Angular.
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

// @ng-supabase.
import { ToastModule } from 'primeng/toast';
import {
  NotifyService as CoreNotifyService,
  SupabaseConfig,
  SupabaseConfigProperties,
} from '@ng-supabase/core';

// Local.
import { NotifyService } from './notify.service';
import { MessageService } from 'primeng/api';

export function provideSupabase(
  config: SupabaseConfigProperties
): EnvironmentProviders {
  return makeEnvironmentProviders([
    ToastModule,
    MessageService,
    {
      provide: SupabaseConfig,
      useValue: new SupabaseConfig(config),
    },
    {
      provide: CoreNotifyService,
      useClass: NotifyService,
    },
  ]);
}
