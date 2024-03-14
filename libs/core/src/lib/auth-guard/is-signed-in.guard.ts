// Angular.
import { inject } from '@angular/core';
import {
  Router,
  CanActivateFn,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';

// Local.
import { KeyValue } from '../key-value';
import { RouteService } from '../route.service';
import { SupabaseConfig } from '../supabase-config';
import { LogService } from '../logging/log.service';
import { SupabaseService } from '../supabase.service';

export const IsSignedIn: CanActivateFn = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const log = inject(LogService);
  const supabase = inject(SupabaseService);
  const router = inject(Router);
  const config = inject(SupabaseConfig);
  const routeService = inject(RouteService);

  await supabase.clientReady;
  const signedIn = supabase.isSignedIn;

  if (!signedIn) {
    const queryParams: KeyValue = {};

    if (config.redirectParamName) {
      const redirect = routeService.constructAbsoluteUrl(state.url);
      queryParams[config.redirectParamName] = redirect;
    }

    log.info(
      `User cannot access route '${state.url}', redirecting to sign in page`
    );

    return router.createUrlTree([config.routes.signIn], { queryParams });
  }

  log.debug(`Activating route '${state.url}' for 'IsSignedIn' guard`);
  return supabase.isSignedIn;
};
