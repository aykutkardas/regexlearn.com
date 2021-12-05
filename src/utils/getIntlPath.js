import { defaultLocale } from 'src/localization';

const getIntlPath = (href, lang) => {
  const isDefaultLocale = lang === defaultLocale;
  const isDefaultPath = !href.includes('[lang]');

  if (isDefaultPath && !isDefaultLocale) {
    return `/${lang}${href}`;
  }
  if ((isDefaultPath || href === '/[lang]') && isDefaultLocale) {
    return `/`;
  }

  if (isDefaultLocale) {
    return href.replace('/[lang]', '');
  }
  return { pathname: href, query: { lang } };
};

export default getIntlPath;
