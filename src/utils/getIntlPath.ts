import { ParsedUrlQuery } from 'querystring';
import { defaultLocale } from 'src/localization';

type GetIntlPathArgs = {
  href: string;
  lang?: string | string[];
  query?: ParsedUrlQuery;
};

const getIntlPath = ({ href, lang, query = {} }: GetIntlPathArgs): string => {
  let pathname = href;

  if (lang === defaultLocale) {
    pathname = pathname.replace('/[lang]', `/`).replace(/\/\//g, '/');
  }

  pathname = pathname.replace('/[lang]', `/${lang}`);

  Object.keys(query).forEach(key => {
    pathname = pathname.replace(`[${key}]`, `${query[key]}`);
  });

  return pathname;
};

export default getIntlPath;
