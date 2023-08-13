import { useRouter } from 'next/router';
import Link from 'next/link';
import { defaultLocale } from 'src/localization';
import getIntlPath from 'src/utils/getIntlPath';
import { ParsedUrlQuery } from 'querystring';
import clsx from 'clsx';

interface Props {
  href: string;
  lang?: string;
  className?: string;
  query?: ParsedUrlQuery;
  passHref?: boolean;
  navLink?: boolean;
  children: any;
  tabIndex?: number;
}

const IntlLink = ({
  href,
  children,
  lang,
  query = {},
  passHref,
  className = '',
  navLink,
  tabIndex,
}: Props) => {
  const { query: routerQuery, pathname } = useRouter();
  const currentLang = lang || routerQuery.lang || defaultLocale;

  const intlPathName = currentLang ? getIntlPath({ href, lang: currentLang, query }) : href;

  const newPathname =
    currentLang === defaultLocale
      ? `/[lang]${intlPathName}`
      : intlPathName.replace(`/${currentLang}`, `/[lang]`);

  return (
    <Link
      href={intlPathName}
      passHref={passHref}
      tabIndex={tabIndex}
      className={clsx(
        className,
        navLink
          ? pathname === newPathname
            ? 'text-regreen-400'
            : 'text-neutral-200 hover:text-regreen-400'
          : null,
      )}
    >
      {children}
    </Link>
  );
};

export default IntlLink;
