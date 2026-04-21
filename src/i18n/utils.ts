import { ui, defaultLang, rtlLanguages } from './ui';

export type Lang = keyof typeof ui;
export type TranslationKey = keyof typeof ui[typeof defaultLang];

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: TranslationKey): string {
    const translation = ui[lang]?.[key] ?? ui[defaultLang][key];
    return translation.replace('{year}', new Date().getFullYear().toString());
  };
}

export function isRtl(lang: Lang): boolean {
  return (rtlLanguages as readonly string[]).includes(lang);
}

export function getLocalePath(lang: Lang, path: string): string {
  if (lang === defaultLang) return path;
  return `/${lang}${path}`;
}

export function getAlternateLinks(currentPath: string): { lang: string; href: string }[] {
  const langs = Object.keys(ui) as Lang[];
  const cleanPath = currentPath.replace(/^\/(en|es|fr|de|ar)/, '') || '/';

  return langs.map((lang) => ({
    lang,
    href: lang === defaultLang ? cleanPath : `/${lang}${cleanPath}`,
  }));
}
