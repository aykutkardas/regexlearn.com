import { GetStaticPaths, GetStaticProps } from 'next';
import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import Head from 'next/head';
import cx from 'classnames';

import SeoTags from 'src/components/SeoTags';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import Playground from 'src/components/Playground';
import CheatsheetSidebar from 'src/components/CheatsheetSidebar';
import ProductButton from 'src/components/ProductButton';
import { defaultLocale, locales } from 'src/localization';

import styles from './Playground.module.css';

const PagePlayground = () => {
  const { formatMessage } = useIntl();
  const { asPath } = useRouter();

  const pageTitle = formatMessage({ id: 'page.playground.title' });
  const pageDescription = formatMessage({ id: 'page.playground.description' });

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/css/animate.css" />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="alternate" hrefLang="en" href="https://regexlearn.com/playground" />
        <link rel="alternate" hrefLang="ru" href="https://regexlearn.com/ru/playground" />
        <link rel="alternate" hrefLang="es" href="https://regexlearn.com/es/playground" />
        <link rel="alternate" hrefLang="tr" href="https://regexlearn.com/tr/playground" />
        <link rel="alternate" hrefLang="zh-cn" href="https://regexlearn.com/zh-cn/playground" />
        <SeoTags key={pageTitle} title={pageTitle} description={pageDescription} href={asPath} />
      </Head>
      <Header />
      <div className={cx('container', styles.PlaygroundContainer)}>
        <ProductButton />
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
};

export default PagePlayground;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const lang = params.lang || defaultLocale;
  const messages = require(`src/localization/${lang}/`)?.default;

  return {
    props: {
      lang,
      messages,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: false,
    paths: locales.map(lang => ({
      params: {
        lang,
      },
    })),
  };
};
