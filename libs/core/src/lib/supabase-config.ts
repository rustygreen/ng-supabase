// Angular.
import { UrlTree } from '@angular/router';

// 3rd party.
import { BehaviorSubject } from 'rxjs';

// Local.
import { LogConfig } from './logging/log-config';
import { trimEnd } from './format/trim-end.function';
import {
  SocialSignIn,
  toSocialItem,
  SocialSignInItem,
} from './sign-in/social-sign-in';

export const DEFAULT_ROUTES: ComponentRoutes = {
  main: '/',
  signIn: '/sign-in',
  register: '/register',
  setPassword: '/set-password',
  resetPassword: '/reset-password',
};

export interface SupabaseConfigProperties {
  apiUrl: string;
  apiKey: string;
  mainRoute?: string;
  signIn?: SignInConfigProperties;
  logging?: LogConfig;
  setPassword?: SetPasswordProperties;
  routes?: Partial<ComponentRoutes>;
}

interface ComponentRoutes {
  main: string;
  signIn: string;
  register: string;
  setPassword: string;
  resetPassword: string;
  userProfile?: string;
}

type SocialSignInFn = (social: SocialSignIn) => boolean | void;

interface SignInConfigProperties {
  title?: string;
  magicLinks?: boolean;
  rememberMe?: boolean;
  socials?: SocialSignIn[];
  socialIconsRoot?: string;
  rememberMeStorageKey?: string;
  redirectTo?: string | string[] | UrlTree | null | undefined;
  onSocialSignIn?: SocialSignInFn;
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

export class SupabaseSignInConfig implements SignInConfigProperties {
  title = '';
  magicLinks = true;
  socials: SocialSignIn[] = [];
  rememberMe = true;
  socialIconsRoot = 'https://supabase.com/dashboard/img/icons/';
  socialSignInItems: SocialSignInItem[] = [];
  redirectTo?: string | string[] | UrlTree | null | undefined;
  rememberMeStorageKey = 'supabase.auth.info';
  onSocialSignIn?: SocialSignInFn;

  constructor(init?: Partial<SupabaseSignInConfig>) {
    Object.assign(this, init);
    this.setSocialSignInItems();
  }

  private setSocialSignInItems(): void {
    for (const social of this.socials) {
      const item = toSocialItem(social);
      if (this.socialIconsRoot) {
        const root = trimEnd(this.socialIconsRoot, '/');
        item.icon = `${root}/${item.value}-icon.svg`;
      }

      this.socialSignInItems.push(item);
    }
  }
}

export class SupabaseConfig {
  signIn: SupabaseSignInConfig;
  api: BehaviorSubject<{ url: string; key: string }>;
  logging?: LogConfig;
  mainRoute = '/';
  setPassword: SetPasswordConfig;
  routes: ComponentRoutes = DEFAULT_ROUTES;
  redirectParamName: string | null | undefined = 'redirect';

  constructor(init: SupabaseConfigProperties) {
    Object.assign(this.routes, init.routes);
    this.logging = init.logging;
    this.setPassword = new SetPasswordConfig(init.setPassword);
    this.signIn = new SupabaseSignInConfig(init.signIn);
    this.api = new BehaviorSubject<ApiInfo>({
      url: init.apiUrl,
      key: init.apiKey,
    });
  }
}
