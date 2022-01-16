import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import Head from 'next/head';
import cx from 'classnames';

import SeoTags from 'src/components/SeoTags';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import Playground from 'src/components/Playground';
import CheatsheetSidebar from 'src/components/CheatsheetSidebar';

import { defaultLocale, locales } from 'src/localization';

import * as styles from './Playground.module.css';

export default function PlaygroundPage() {
  const { formatMessage } = useIntl();
  const { asPath } = useRouter();

  const pageTitle = formatMessage({ id: 'page.playground.title' });
  const pageDescription = formatMessage({ id: 'page.playground.description' });

  return (
    <>
      <Header />
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <SeoTags key={pageTitle} title={pageTitle} description={pageDescription} href={asPath} />
      </Head>
      <div className={cx('container', styles.PlaygroundContainer)}>
        <div className="row">
          <div className="col-xs-12 col-md-12 col-lg-8">
            <Playground />
          </div>
          <div className="col-xs-12 col-md-12 col-lg-4">
            <CheatsheetSidebar />
          </div>
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
