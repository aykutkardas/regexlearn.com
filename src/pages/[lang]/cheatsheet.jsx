import { useIntl } from 'react-intl';
import Head from 'next/head';

import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import Collapse from 'src/components/Collapse';
import CheatsheetItemTitle from 'src/components/CheatsheetItemTitle';

import data from 'src/data/cheatsheet.json';

import { defaultLocale, locales } from 'src/localization';

export default function Home() {
  const { formatMessage } = useIntl();

  const columns = [data.slice(0, 3), data.slice(3, 4), data.slice(4, 6)];

  return (
    <>
      <Header />
      <Head>
        <title>{formatMessage({ id: 'page.cheatsheet.title' })}</title>
        <link rel="canonical" href="https://regexlearn.com/cheatsheet" />
        <meta name="description" content={formatMessage({ id: 'page.cheatsheet.description' })} />
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
