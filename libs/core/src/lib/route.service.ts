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

@Injectable({ providedIn: 'root' })
export class RouteService {
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  getRootUrl(): string {
    const [root] = window.location.href.split(this.router.url);
    return root;
  }

  appendRoute(route: string): string {
    const root = trimEnd(this.getRootUrl(), '/');
    return this.join(root, route);
  }

  join(part1: string, part2: string): string {
    const trimmed1 = trimEnd(part1, '/');
    const trimmed2 = trimStart(part2, '/');
    return `${trimmed1}/${trimmed2}`;
  }

  getRedirectParamValue(): string | null {
    return this.route.snapshot.params['redirect'] || null;
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
    return Array.isArray(route)
      ? this.router.navigate(route as string[], options as NavigationExtras)
      : this.router.navigateByUrl(route as string | UrlTree, options);
  }
}
