import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import Head from 'next/head';

import SeoTags from 'src/components/SeoTags';
import { locales } from 'src/localization';

interface CustomHeadProps {
  title: string;
  description: string;
  children?: JSX.Element;
  hrefLang?: string;
}

const CustomHead = ({ title, description, children, hrefLang }: CustomHeadProps) => {
  const { formatMessage } = useIntl();
  const { asPath } = useRouter();
  const hasHrefLang = typeof hrefLang === 'string';

  const pageTitle = formatMessage({ id: title });
  const pageDescription = formatMessage({ id: description });
  const pageHref = asPath.replace('/en', '/').replace('//', '/');

  return (
    <Head>
      {children}
      {pageTitle && <title>{pageTitle}</title>}
      {pageDescription && <meta name="description" content={pageDescription} />}
      {hasHrefLang &&
        locales.map(locale => (
          <link
            key={locale}
            rel="alternate"
            hrefLang={locale}
            href={`https://regexlearn.com/${locale === 'en' ? '' : locale + '/'}${hrefLang}`}
          />
        ))}
      <SeoTags key={pageTitle} title={pageTitle} description={pageDescription} href={pageHref} />
    </Head>
  );
};

export default CustomHead;
