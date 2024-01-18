export enum SocialLogIn {
  Apple = 'apple',
  Azure = 'microsoft',
  Bitbucket = 'bitbucket',
  Discord = 'discord',
  Facebook = 'facebook',
  Figma = 'figma',
  GitHub = 'github',
  GitLab = 'gitlab',
  Google = 'google',
  Kakao = 'kakao',
  Keycloak = 'keycloak',
  LinkedIn = 'linkedin',
  Notion = 'notion',
  Twitch = 'twitch',
  Twitter = 'twitter',
  Slack = 'slack',
  Spotify = 'spotify',
  WorkOS = 'workos',
  Zoom = 'zoom',
}

export interface SocialLoginItem {
  title: string;
  value: SocialLogIn;
  icon?: string;
}

export const ALL_SOCIAL_LOGINS = Object.values(SocialLogIn);
export const ALL_SOCIAL_LOGIN_ITEMS = Object.entries(SocialLogIn).map(
  ([title, value]) => {
    return { title, value };
  }
);

export function toSocialItem(social: string[]): SocialLoginItem[];
export function toSocialItem(social: string): SocialLoginItem;
export function toSocialItem(
  social: string | string[]
): SocialLoginItem | SocialLoginItem[] {
  const asArray = social as string[];
  const asSingle = social as string;
  return Array.isArray(social)
    ? asArray.map(toSingleSocialItem)
    : toSingleSocialItem(asSingle);
}

function toSingleSocialItem(socialValue: string): SocialLoginItem {
  const item = ALL_SOCIAL_LOGIN_ITEMS.find((s) => s.value === socialValue);
  if (!item) {
    throw new Error(`No social login item with value '${socialValue}' found`);
  }

  return item;
}
