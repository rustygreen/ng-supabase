// Angular.
import { Injectable } from '@angular/core';
import {
  Router,
  UrlTree,
  ActivatedRoute,
  NavigationExtras,
  NavigationBehaviorOptions,
} from '@angular/router';

// Local.
import { trimEnd } from './format/trim-end.function';
import { trimStart } from './format/trim-start.function';
import { LocationStrategy } from '@angular/common';
import { SupabaseConfig } from './supabase-config';
import { isString } from './type-check/is-string';

@Injectable({ providedIn: 'root' })
export class RouteService {
  constructor(
    private readonly router: Router,
    private readonly config: SupabaseConfig,
    private readonly route: ActivatedRoute,
    private readonly locationStrategy: LocationStrategy
  ) {}

  getRootUrl(): string {
    const [root] = window.location.href.split(this.router.url);
    return root;
  }

  appendRoute(route: string): string {
    const root = trimEnd(this.getRootUrl(), '/');
    return this.join(root, route);
  }

  join(...parts: string[]): string {
    let result = '';
    let i = 0;

    for (const part of parts) {
      const isLast = i === parts.length - 1;

      if (isLast) {
        break;
      }

      const nextPart = parts[i + 1];
      const trimmed1 = trimEnd(part, '/');
      const trimmed2 = trimStart(nextPart, '/');
      result += trimmed2 ? `${trimmed1}/${trimmed2}` : trimmed1;
      i++;
    }

    return result;
  }

  getRedirectParamValue(): string | null {
    const { redirectParamName } = this.config;
    return redirectParamName
      ? this.route.snapshot.queryParams[redirectParamName]
      : null;
  }

  constructAbsoluteUrl(...appendRoutePaths: string[]): string {
    const baseHref = this.locationStrategy.getBaseHref();
    return this.join(location.origin, baseHref, ...appendRoutePaths);
  }

  goTo(route: string[], options?: NavigationExtras): Promise<boolean>;
  goTo(
    route: string | UrlTree,
    options?: NavigationBehaviorOptions
  ): Promise<boolean>;
  goTo(
    route: string | string[] | UrlTree,
    options?: NavigationExtras | NavigationBehaviorOptions
  ): Promise<boolean> {
    const asString = route as string;
    const isAbsoluteUrl = isString(route) && asString.startsWith('http');

    if (isAbsoluteUrl) {
      const root = this.getRootUrl();
      route = trimStart(asString, root);
    }

    return Array.isArray(route)
      ? this.router.navigate(route as string[], options as NavigationExtras)
      : this.router.navigateByUrl(route as string | UrlTree, options);
  }
}
