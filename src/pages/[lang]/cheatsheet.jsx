import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import Head from 'next/head';

import SeoTags from 'src/components/SeoTags';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import Collapse from 'src/components/Collapse';
import CheatsheetItemTitle from 'src/components/CheatsheetItemTitle';

import data from 'src/data/cheatsheet.json';

import { defaultLocale, locales } from 'src/localization';

export default function Cheatsheet() {
  const { formatMessage } = useIntl();
  const { asPath } = useRouter();

  const pageTitle = formatMessage({ id: 'page.cheatsheet.title' });
  const pageDescription = formatMessage({ id: 'page.cheatsheet.description' });

  const columns = [data.slice(0, 3), data.slice(3, 4), data.slice(4, 6)];

  return (
    <>
      <Header />
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <SeoTags key={pageTitle} title={pageTitle} description={pageDescription} href={asPath} />
      </Head>
      <div className="container flex-1">
        <div className="row">
          {columns.map((column, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              {column.map(row => (
                <div key={row.title}>
                  <h4>{formatMessage({ id: row.title })}</h4>
                  {row.data.map(item => (
                    <Collapse
                      key={item.title}
                      data={item}
                      title={<CheatsheetItemTitle data={item} />}
                    />
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export async function getStaticProps({ params }) {
  const lang = params.lang || defaultLocale;
  const messages = require(`src/localization/${lang}/`)?.default;

  return {
    props: {
      lang,
      messages,
    },
  };
}

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: locales.map(lang => ({
      params: {
        lang,
      },
    })),
  };
}
