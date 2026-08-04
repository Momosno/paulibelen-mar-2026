/**
 * Single source of truth for every outbound URL on the site.
 *
 * These get swapped for tracking/affiliate links, so they must not be
 * hardcoded in components — change a destination here and it changes
 * everywhere it is rendered.
 *
 * The key doubles as the `target` value sent with the `cta_click` event, so
 * keys are stable identifiers: rename one and you break the continuity of the
 * reports for that destination.
 */
export const LINKS = {
  onlyfans_vip: "https://onlyfans.com/paulibelen1/c23",
  onlyfans_gfe: "https://onlyfans.com/paulibelen.gfe/c30",
  onlyfans_free: "https://onlyfans.com/paulibelenfree/c23",

  telegram_free: "https://t.me/paulibelenfree",
  telegram_catalogo: "https://t.me/paulibelenfree3",
  telegram_free2: "https://t.me/soypaulibelen1",

  twitter_main: "https://x.com/paulibelenof",
  twitter_alt: "https://x.com/xpaulibelen1x?s=21",

  instagram_main: "https://www.instagram.com/paulibelen1",
  instagram_alt: "https://www.instagram.com/soypaulibelen",

  facebook_main: "https://www.facebook.com/Soypaulibelen1",
  facebook_alt: "https://www.facebook.com/soypaulibelen",
  facebook_share: "https://www.facebook.com/share/1AxvDmRk5M/?mibextid=wwXIfr",

  tiktok: "https://www.tiktok.com/@paulibelen1_?_r=1&_t=ZS-948km0YyNd7",
  youtube: "https://youtube.com/@paulibelen1?si=-hWmO44HFsXZ7PH6",
  snapchat: "https://snapchat.com/t/HWXJsHss",

  fansly: "https://fansly.com/paulibelen1",
  tecito: "https://tecito.app/paulibelen1/post",
  pornhub: "https://es.pornhub.com/model/pauli-belen",
  manyvids: "https://www.manyvids.com/Activity/paulibelen1/1006233631/club",
} as const;

export type LinkTarget = keyof typeof LINKS;
