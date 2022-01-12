import { defaultLocale } from 'src/localization';

const getIntlPath = (href, lang, toString = false) => {
  let pathname = href;

  if (lang === defaultLocale) {
    pathname = pathname
      .replace('/[lang]', `/`)
      .replace(/\/\//g, '/');
  }

  if (toString) {
    return pathname
      .replace('/[lang]', `/${lang}`);
  }

  const newHref = { pathname };

  if (lang !== defaultLocale) {
    newHref.query = { lang };
  }

  return newHref;
};

export default getIntlPath;
