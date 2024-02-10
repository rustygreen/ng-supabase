// Angular.
import { UrlTree } from '@angular/router';

// 3rd party.
import { BehaviorSubject } from 'rxjs';

// Local.
import { LogConfig } from './logging/log-config';
import { trimEnd } from './format/trim-end.function';
import {
  SocialLogIn,
  toSocialItem,
  SocialLoginItem,
} from './login/social-login';

export const DEFAULT_ROUTES: ComponentRoutes = {
  main: '/',
  login: '/login',
  register: '/register',
  setPassword: '/set-password',
  resetPassword: '/reset-password',
};

export interface SupabaseConfigProperties {
  apiUrl: string;
  apiKey: string;
  mainRoute?: string;
  login?: LoginConfigProperties;
  logging?: LogConfig;
  setPassword?: SetPasswordProperties;
  routes?: Partial<ComponentRoutes>;
}

interface ComponentRoutes {
  main: string;
  login: string;
  register: string;
  setPassword: string;
  resetPassword: string;
  userProfile?: string;
}

type SocialLoginFn = (social: SocialLogIn) => boolean | void;

interface LoginConfigProperties {
  title?: string;
  magicLinks?: boolean;
  rememberMe?: boolean;
  socials?: SocialLogIn[];
  socialIconsRoot?: string;
  rememberMeStorageKey?: string;
  redirectTo?: string | string[] | UrlTree | null | undefined;
  onSocialLogin?: SocialLoginFn;
}

interface ApiInfo {
  url: string;
  key: string;
}

interface SetPasswordProperties {
  title?: string;
  requireConfirm?: boolean;
  showMessageOnSave?: boolean;
  redirectTo?: string | string[] | UrlTree | null | undefined;
}

class SetPasswordConfig implements SetPasswordProperties {
  title = '';
  requireConfirm = true;
  showMessageOnSave = true;

  constructor(init?: Partial<SetPasswordProperties>) {
    Object.assign(this, init);
  }
}

export class SupabaseLoginConfig implements LoginConfigProperties {
  title = '';
  magicLinks = true;
  socials: SocialLogIn[] = [];
  rememberMe = true;
  socialIconsRoot = 'https://supabase.com/dashboard/img/icons/';
  socialLoginItems: SocialLoginItem[] = [];
  redirectTo?: string | string[] | UrlTree | null | undefined;
  rememberMeStorageKey = 'supabase.login.info';
  onSocialLogin?: SocialLoginFn;

  constructor(init?: Partial<SupabaseLoginConfig>) {
    Object.assign(this, init);
    this.setSocialLoginItems();
  }

  private setSocialLoginItems(): void {
    for (const social of this.socials) {
      const item = toSocialItem(social);
      if (this.socialIconsRoot) {
        const root = trimEnd(this.socialIconsRoot, '/');
        item.icon = `${root}/${item.value}-icon.svg`;
      }

      this.socialLoginItems.push(item);
    }
  }
}

export class SupabaseConfig {
  login: SupabaseLoginConfig;
  api: BehaviorSubject<{ url: string; key: string }>;
  logging?: LogConfig;
  mainRoute = '/';
  setPassword: SetPasswordConfig;
  routes: ComponentRoutes = DEFAULT_ROUTES;

  constructor(init: SupabaseConfigProperties) {
    Object.assign(this.routes, init.routes);
    this.logging = init.logging;
    this.setPassword = new SetPasswordConfig(init.setPassword);
    this.login = new SupabaseLoginConfig(init.login);
    this.api = new BehaviorSubject<ApiInfo>({
      url: init.apiUrl,
      key: init.apiKey,
    });
  }
}
