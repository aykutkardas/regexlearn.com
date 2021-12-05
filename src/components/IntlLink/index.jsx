import Link from 'next/link';
import { useRouter } from 'next/router';
import getIntlPath from 'src/utils/getIntlPath';

const IntlLink = ({ href, children }) => {
  const { asPath, query } = useRouter();

  const intlLink = query.lang ? getIntlPath(href, query.lang) : href;

  const content =
    typeof children === 'function'
      ? children({
          isActive: asPath === intlLink,
        })
      : children;

  return (
    <Link href={intlLink} passHref>
      {content}
    </Link>
  );
};

export default IntlLink;
