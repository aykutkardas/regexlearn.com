import Link from 'next/link';
import { useRouter } from 'next/router';
import { defaultLocale } from 'src/localization';
import getIntlPath from 'src/utils/getIntlPath';

const IntlLink = ({ href, children, lang, query, passHref = false }) => {
  const { query: routerQuery, pathname } = useRouter();
  const currentLang = lang || routerQuery.lang;

  const intlLink = currentLang ? getIntlPath({ href, lang: currentLang, query }) : href;

  const newPathname =
    currentLang === defaultLocale ? `/[lang]${intlLink?.pathname}` : intlLink?.pathname;

  const content =
    typeof children === 'function'
      ? children({
          isActive: pathname === newPathname,
        })
      : children;

  return (
    <Link href={intlLink} passHref={passHref}>
      {content}
    </Link>
  );
};

export default IntlLink;
