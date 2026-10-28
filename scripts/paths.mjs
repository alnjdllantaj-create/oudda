/** القائمة الوحيدة للمسارات — يستعملها كلّ من generate-meta و verify-site. */
export const LOCALES = ["ar", "fr"];
export const TOOL_SLUGS = ["qr-generator", "word-counter", "password-generator", "youtube-thumbnail", "hashtag-generator"];
export const GUIDE_SLUGS = ["qr-print", "strong-password", "youtube-thumbnail-sizes", "hashtags-tiktok", "hashtags-instagram", "content-calendar", "video-script", "word-count-arabic", "reading-time", "privacy-browser-tools", "ramadan-content", "darija-content"];
export const TEMPLATE_SLUGS = ["content-calendar", "video-script", "shot-list", "hashtag-tracker", "idea-card", "pre-publish-checklist", "weekly-planner", "media-kit"];
export const LEGAL_SLUGS = ["about", "contact", "privacy", "terms", "disclaimer"];

export const PATHS = [
  "",
  "tools", "guides", "templates",
  ...TOOL_SLUGS.map((s) => `tools/${s}`),
  ...GUIDE_SLUGS.map((s) => `guides/${s}`),
  ...TEMPLATE_SLUGS.map((s) => `templates/${s}`),
  ...LEGAL_SLUGS,
];

export function pagePath(locale, path) { return `/${locale}/${path ? path + "/" : ""}`; }
export function htmlFile(locale, path) { return `out/${locale}/${path ? path + "/" : ""}index.html`; }
