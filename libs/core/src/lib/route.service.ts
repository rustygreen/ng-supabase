// Angular.
import {
  ActivatedRoute,
  NavigationBehaviorOptions,
  NavigationExtras,
  Route,
  Router,
  UrlTree,
} from '@angular/router';
import { Injectable } from '@angular/core';

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
