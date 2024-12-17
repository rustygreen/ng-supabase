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
  postSignOut: '/sign-in',
};

interface BaseSupabaseConfigProperties {
  apiKey: string;
  mainRoute?: string;
  signIn?: SignInConfigProperties;
  logging?: LogConfig;
  register?: RegisterProperties;
  setPassword?: SetPasswordProperties;
  routes?: Partial<ComponentRoutes>;
  profile?: ProfileProperties;
}

interface SupabaseConfigPropertiesByUrl extends BaseSupabaseConfigProperties {
  apiUrl: string;
}

interface SupabaseConfigPropertiesByProject
  extends BaseSupabaseConfigProperties {
  project: string;
}

export type SupabaseConfigProperties =
  | SupabaseConfigPropertiesByUrl
  | SupabaseConfigPropertiesByProject;

interface ComponentRoutes {
  main: string;
  signIn: string;
  register: string;
  registerOrSignIn: string;
  setPassword: string;
  resetPassword: string;
  userProfile?: string;
  postSignOut?: string;
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

interface ProfileProperties {
  table?: string;
  avatarField?: string;
  firstNameField?: string;
  lastNameField?: string;
}

type SocialSignInFn = (social: SocialSignIn) => boolean | void;

interface SignInConfigProperties {
  title?: string;
  magicLinks?: boolean;
  rememberMe?: boolean;
  socials?: SocialSignIn[];
  socialIconsRoot?: string;
  rememberMeStorageKey?: string;
  otpEnabled?: boolean;
  otpLength?: number;
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

class ProfileConfig implements ProfileProperties {
  table = '';
  userIdField = 'user_id';
  firstNameField = 'first_name';
  lastNameField = 'last_name';
  avatarField = 'avatar';

  constructor(init?: Partial<ProfileProperties>) {
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
  otpEnabled = true;
  otpLength = 6;
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
  profile: ProfileConfig;

  constructor(init: SupabaseConfigProperties) {
    Object.assign(this.routes, init.routes);
    const options = init as SupabaseConfigPropertiesByUrl &
      SupabaseConfigPropertiesByProject;

    const url = SupabaseConfig.toApiUrl(options.apiUrl || options.project);
    this.logging = init.logging;
    this.setPassword = new SetPasswordConfig(init.setPassword);
    this.signIn = new SignInConfig(init.signIn);
    this.register = new RegisterConfig(init.register);
    this.profile = new ProfileConfig(init.profile);
    this.api = new BehaviorSubject<ApiInfo>({
      url: url,
      key: init.apiKey,
    });
  }

  static toApiUrl(urlOrProjectId: string): string {
    return urlOrProjectId.startsWith('http')
      ? urlOrProjectId
      : `https://${urlOrProjectId}.supabase.co`;
  }
}
