export enum SocialSignIn {
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

export interface SocialSignInItem {
  title: string;
  value: SocialSignIn;
  icon?: string;
}

export const ALL_SOCIAL_SIGN_INS = Object.values(SocialSignIn);
export const ALL_SOCIAL_SIGN_IN_ITEMS = Object.entries(SocialSignIn).map(
  ([title, value]) => {
    return { title, value };
  }
);

export function toSocialItem(social: string[]): SocialSignInItem[];
export function toSocialItem(social: string): SocialSignInItem;
export function toSocialItem(
  social: string | string[]
): SocialSignInItem | SocialSignInItem[] {
  const asArray = social as string[];
  const asSingle = social as string;
  return Array.isArray(social)
    ? asArray.map(toSingleSocialItem)
    : toSingleSocialItem(asSingle);
}

function toSingleSocialItem(socialValue: string): SocialSignInItem {
  const item = ALL_SOCIAL_SIGN_IN_ITEMS.find((s) => s.value === socialValue);
  if (!item) {
    throw new Error(`No social sign in item with value '${socialValue}' found`);
  }

  return item;
}
