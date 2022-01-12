import { defaultLocale } from 'src/localization';

const getIntlPath = (href, lang) => {
  const isDefaultLocale = lang === defaultLocale;
  const isDefaultPath = !href.includes('[lang]');

  let newHref = href;

  if (isDefaultPath && !isDefaultLocale) {
    newHref = `/${lang}${href}`;
  }

  newHref = newHref
    .replace('/[lang]', `/${lang}`)
    .replace(`/${defaultLocale}`, '/');

  return newHref;
};

export default getIntlPath;
