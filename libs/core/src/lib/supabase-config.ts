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
  registerOrSignIn: '/auth',
  setPassword: '/set-password',
  resetPassword: '/reset-password',
};

export interface SupabaseConfigProperties {
  apiUrl: string;
  apiKey: string;
  mainRoute?: string;
  signIn?: SignInConfigProperties;
  logging?: LogConfig;
  register?: RegisterProperties;
  setPassword?: SetPasswordProperties;
  routes?: Partial<ComponentRoutes>;
}

interface ComponentRoutes {
  main: string;
  signIn: string;
  register: string;
  registerOrSignIn: string;
  setPassword: string;
  resetPassword: string;
  userProfile?: string;
}

interface UserRegistrationMetadata {
  label: string;
  field: string;
  type?: 'text' | 'number';
  required?: boolean;
  defaultValue?: string | number;
}

interface RegisterProperties {
  title?: string;
  metadata?: UserRegistrationMetadata[];
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

class RegisterConfig implements RegisterConfig {
  title = '';
  metadata: UserRegistrationMetadata[] = [];

  constructor(init?: Partial<RegisterProperties>) {
    Object.assign(this, init);
    this.metadata = this.metadata || [];
  }
}

export class SignInConfig implements SignInConfigProperties {
  title = '';
  magicLinks = true;
  socials: SocialSignIn[] = [];
  rememberMe = true;
  socialIconsRoot = 'https://supabase.com/dashboard/img/icons/';
  socialSignInItems: SocialSignInItem[] = [];
  redirectTo?: string | string[] | UrlTree | null | undefined;
  rememberMeStorageKey = 'supabase.auth.info';
  onSocialSignIn?: SocialSignInFn;

  constructor(init?: Partial<SignInConfig>) {
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
  signIn: SignInConfig;
  api: BehaviorSubject<{ url: string; key: string }>;
  logging?: LogConfig;
  mainRoute = '/';
  setPassword: SetPasswordConfig;
  register: RegisterConfig;
  routes: ComponentRoutes = DEFAULT_ROUTES;
  redirectParamName: string | null | undefined = 'redirect';

  constructor(init: SupabaseConfigProperties) {
    Object.assign(this.routes, init.routes);
    this.logging = init.logging;
    this.setPassword = new SetPasswordConfig(init.setPassword);
    this.signIn = new SignInConfig(init.signIn);
    this.register = new RegisterConfig(init.register);
    this.api = new BehaviorSubject<ApiInfo>({
      url: init.apiUrl,
      key: init.apiKey,
    });
  }
}
