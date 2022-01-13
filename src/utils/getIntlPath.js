import { defaultLocale } from 'src/localization';

const getIntlPath = ({ href, lang, query = {}, toStringHref = false }) => {
  let pathname = href;

  if (lang === defaultLocale) {
    pathname = pathname
      .replace('/[lang]', `/`)
      .replace(/\/\//g, '/');
  }

  if (toString) {
    pathname = pathname
      .replace('/[lang]', `/${lang}`);

    Object.keys(query).forEach(key => {
      pathname = pathname
        .replace(`[${key}]`, `${query[key]}`);
    });

    return pathname;
  }

  const newHref = { pathname, query: query };

  if (lang !== defaultLocale) {
    newHref.query.lang = lang;
  }

  return newHref;
};

export default getIntlPath;
