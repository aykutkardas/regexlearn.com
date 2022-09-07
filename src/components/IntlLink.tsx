import { useRouter } from 'next/router';
import Link from 'next/link';
import { defaultLocale } from 'src/localization';
import getIntlPath from 'src/utils/getIntlPath';
import { ParsedUrlQuery } from 'querystring';

interface Props {
  href: string;
  lang?: string;
  query?: ParsedUrlQuery;
  passHref?: boolean;
  children: any;
}

const IntlLink = ({ href, children, lang, query = {}, passHref }: Props) => {
  const { query: routerQuery, pathname } = useRouter();
  const currentLang = lang || routerQuery.lang || defaultLocale;

  const intlPathName = currentLang ? getIntlPath({ href, lang: currentLang, query }) : href;

  const newPathname =
    currentLang === defaultLocale
      ? `/[lang]${intlPathName}`
      : intlPathName.replace(`/${currentLang}`, `/[lang]`);

  const content =
    typeof children === 'function'
      ? children({
          isActive: pathname === newPathname,
        })
      : children;

  return (
    <Link href={intlPathName} passHref={passHref}>
      {content}
    </Link>
  );
};

export default IntlLink;
