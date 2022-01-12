import Link from 'next/link';
import { useRouter } from 'next/router';
import getIntlPath from 'src/utils/getIntlPath';

const IntlLink = ({ href, children, lang, passHref = false }) => {
  const { query, pathname } = useRouter();
  const currentLang = lang || query.lang;

  const intlLink = currentLang ? getIntlPath(href, currentLang) : href;

  const content =
    typeof children === 'function'
      ? children({
          isActive: pathname === intlLink?.pathname,
        })
      : children;

  return (
    <Link href={intlLink} passHref={passHref}>
      {content}
    </Link>
  );
};

export default IntlLink;
