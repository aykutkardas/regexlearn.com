import { defaultLocale } from 'src/localization';

const isDevelopment = process.env.NODE_ENV === "development";

const getIntlPath = (href, lang) => {
  const isDefaultLocale = lang === defaultLocale;
  const isDefaultPath = !href.includes('[lang]');

  if (isDefaultPath && !isDefaultLocale) {
    return `/${lang}${href}`;
  }

  if ((isDefaultPath || href === '/[lang]') && isDefaultLocale) {
    return isDevelopment ? `/en${href}` : href;
  }

  if (isDefaultLocale) {
    return href.replace('/[lang]', isDevelopment ? '/en' : '/');
  }

  return href.replace('[lang]', lang);
};

export default getIntlPath;
